from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
load_dotenv() 

# SQLALCHEMY_DATABASE_URL = ""
SQLALCHEMY_DATABASE_URL = os.environ['API_DATABASE_URL']
# SQLALCHEMY_DATABASE_URL = "sqlite:///../dev.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={}
)

# engine.execute('alter table papers add column S2_paper Text')
# engine.execute('alter table papers add column S2_citations text')
# engine.execute('alter table papers add column num_citations int')
# engine.execute('alter table papers add column num_references int')
# engine.execute('alter table papers add column num_influential_citations int')


# engine.execute('alter table papers add column full_Text String')
# engine.execute('alter table papers add column keyworkds String')
# papers_fts = """CREATE VIRTUAL TABLE papers_fts USING fts5(
#     title, 
#     abstract,
#     content='papers', 
#     content_rowid='id' 
# )"""
