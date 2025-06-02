from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Body
from . import  models
from .database import engine
from  .routers import blog, user, authentication
from pydantic import BaseModel
import time
import random
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import StreamingResponse
import pandas as pd
import io
from typing import Dict, List, Any
import json

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(blog.router)
app.include_router(user.router)

@app.post("/api/upload-excel")
async def upload_excel(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        buffer = io.BytesIO(contents)
        
        # Try to determine file type from the file name
        if file.filename.endswith('.csv'):
            df = pd.read_csv(buffer)
        else:
            df = pd.read_excel(buffer)
        
        # Convert DataFrame to dict for JSON response
        data_dict = df.to_dict(orient='records')
        headers = df.columns.tolist()
        
        return {"data": data_dict, "headers": headers}
    except Exception as e:
        print(f"Error processing file: {str(e)}")  # Add logging
        raise HTTPException(status_code=400, detail=f"Could not process file: {str(e)}")

@app.post("/api/export-excel")
async def export_excel(data: Dict[str, Any] = Body(...)):
    try:
        df = pd.DataFrame(data.get("data", []))
        file_name = data.get("fileName", "exported-data")
        
        # Create an Excel file in memory
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, sheet_name='Sheet1', index=False)
        
        output.seek(0)
        
        # Return the Excel file as a streaming response
        return StreamingResponse(
            output,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename={file_name}.xlsx"}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not export data: {str(e)}")

