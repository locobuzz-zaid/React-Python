from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "mssql+pyodbc://sa:Zaid1234!@Zaid-PC\\SQLEXPRESS/zaid?driver=ODBC%20Driver%2017%20for%20SQL%20Server"
SQLALCHEMY_DATABASE_URL = "mssql+pyodbc://Zaid-PC\\SQLEXPRESS/zaid?driver=ODBC%20Driver%2017%20for%20SQL%20Server&trusted_connection=yes"

engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
