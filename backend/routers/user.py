from fastapi import APIRouter
from .. import database, schemas, models
from sqlalchemy.orm import Session
from fastapi import APIRouter,Depends,status
from ..repository import user

router = APIRouter(
    # prefix="/api/user",
    tags=['Users']
)

get_db = database.get_db

@router.get('/api/user/{id}',response_model=schemas.ShowUser)
def get_user(id:int,db: Session = Depends(get_db)):
    return user.show(id,db)

@router.post('/api/generate-otp', status_code=status.HTTP_201_CREATED)
def generate_otp(request: schemas.User):
    return {
        "data": "OTP generation is not implemented yet",
        "status": "success",
        "message": "OTP generation is not implemented yet",
        "otp": "123456",  
        "user": request,
    }

@router.post('/api/create-user', response_model=schemas.ShowUser, status_code=status.HTTP_201_CREATED)
def create_user(request: schemas.User,db: Session = Depends(get_db)):
    if request.otp == "123456":
        print(f"Creating user with OTP: {request.otp}")
        return user.create(request,db)
    else:
        return {
            "name": "OTP generation",
            "email": "error",
            "blog": "OTP is incorrect",
        }