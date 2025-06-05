from typing import List
from fastapi import APIRouter,Depends,status,HTTPException
from .. import schemas, database, models, oauth2
from sqlalchemy.orm import Session
from ..repository import blog
router = APIRouter(
    prefix="/api",
    tags=['Blogs']
)

get_db = database.get_db

@router.get('/blog', response_model=List[schemas.ShowBlog])
# def all(db: Session = Depends(get_db),current_user: schemas.User = Depends(oauth2.get_current_user)):
def all(db: Session = Depends(get_db)):
    return blog.get_all(db)


@router.post('/add-blog', status_code=status.HTTP_201_CREATED,)
# def create(request: schemas.Blog, db: Session = Depends(get_db),current_user: schemas.User = Depends(oauth2.get_current_user)):
def create(request: schemas.Blog, db: Session = Depends(get_db)):
    return blog.create(request, db)

@router.delete('/delete-blog/{id}', status_code=status.HTTP_204_NO_CONTENT)
# def destroy(id:int, db: Session = Depends(get_db),current_user: schemas.User = Depends(oauth2.get_current_user)):
def destroy(id:int, db: Session = Depends(get_db)):
    return blog.destroy(id,db)


@router.put('/update-blog/{id}', status_code=status.HTTP_202_ACCEPTED)
# def update(id:int, request: schemas.Blog, db: Session = Depends(get_db),current_user: schemas.User = Depends(oauth2.get_current_user)):
def update(id:int, request: schemas.Blog, db: Session = Depends(get_db)):
    return blog.update(id,request, db)


@router.get('/{id}', status_code=200, response_model=schemas.ShowBlog)
def show(id:int, db: Session = Depends(get_db),current_user: schemas.User = Depends(oauth2.get_current_user)):
    return blog.show(id,db)