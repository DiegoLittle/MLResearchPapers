from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ARRAY,JSON
from sqlalchemy.orm import relationship
import hashlib
import uuid
from sqlalchemy.ext.declarative import declarative_base
import sys
sys.path.append('../')
from database import Base
class Paper(Base):
    __tablename__ = "papers"
    id = Column(String, primary_key=True)
    arxiv_id = Column(String)
    title = Column(String)
    categories = Column(String)
    abstract = Column(String)
    url_abs = Column(String)
    url_pdf = Column(String)
    proceeding = Column(String)
    authors = Column(String)
    num_citations = Column(Integer)
    num_references = Column(Integer)
    num_influential_citations = Column(Integer)
    tasks = Column(String)
    date = Column(String)
    methods = Column(String)
    doi = Column(String)
    grobid = Column(String)
    refs = Column(String)
    keywords = Column(String)
    full_text = Column(String)
    s2_paper = Column(String)
    s2_citations = Column(String)

# engine.execute('alter table papers add column num_citations int')
# engine.execute('alter table papers add column num_references int')
# engine.execute('alter table papers add column num_influential_citations int')
# Eventually it might make sense to add a relationship to the paper
# So tasks and methods are in seperate tables

# class Note(Base):
#     __tablename__ = "notes"

#     id = Column(String, primary_key=True, index=True)
#     title = Column(String, index=True)
#     description = Column(String, index=True)
#     owner_id = Column(Integer, ForeignKey("users.id"))
#     owner = relationship("User", back_populates="notes")

