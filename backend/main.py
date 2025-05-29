from fastapi import FastAPI
from . import  models
from .database import engine
from  .routers import blog, user, authentication
from pydantic import BaseModel
import time
import random
from fastapi.middleware.cors import CORSMiddleware

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

# data = []

# @app.get("/")
# def root():
#     return {"message": "Welcome to the FastAPI application!"}

# @app.get("/data")
# def get_data():
#     return data

# class Item(BaseModel):
#     name: str

# Add data to the list with uquie id
# @app.post("/add-data")
# def post_data(item: Item):
#     # if item in data:
#     #     return {"message": "Item already exists", "item": item}
#     id = random.randint(1, 1000)
#     data.append({"id": id, "name": item.name})
#     return data

# @app.delete("/delete-data/{item}")
# def delete_data(item: str):
#     if item not in data:
#         return {"message": "Item not found", "item": item}
#     data.remove(item)
#     return {"message": "Item deleted successfully", "item": item}

# @app.put("/update-data/{old_item}")
# def update_data(old_item: str, new_item: str):
#     if old_item not in data:
#         return {"message": "Item not found", "old_item": old_item}
#     if new_item in data:
#         return {"message": "New item already exists", "new_item": new_item}
#     index = data.index(old_item)
#     data[index] = new_item
#     return {"message": "Item updated successfully", "old_item": old_item, "new_item": new_item}

