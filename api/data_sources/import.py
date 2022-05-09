# import sys
# sys.path.append('../')
# from api.database import SessionLocal, engine
# import api.models

# def fetch_papers():
#     """
#     Lookup an arxiv paper by arxiv_id
#     """
#     connection = engine.connect()
#     result = connection.execute("SELECT count(*) FROM papers WHERE s2_paper IS NOT NULL;")
#     return result.fetchall()

# print(fetch_papers())
import json
import pandas as pd
# with open('../downloads/s2_export.json', 'r') as f:
#     papers = json.loads(f.read())
#     print(papers[0])
import sys
import requests
from sqlalchemy import text
sys.path.append('../')
from database import engine
import pandas as pd
from database import SessionLocal, engine
import models

def export_db():
    df = pd.read_sql("SELECT * FROM papers", engine)
    json_str = df.to_json(orient='records')
    with open('../downloads/all_export.json', 'w') as f:
        f.write(json_str)

def map_to_mode(record):
    paper_doc = models.Paper(
        id= record['id'],
        arxiv_id= record['arxiv_id'],
        title= record['title'],
        abstract= record['abstract'],
        authors= record['authors'],
        date= record['date'],
        methods= record['methods'],
        tasks = record['tasks'],
        url_abs= record['url_abs'],
        url_pdf= record['url_pdf'],
        proceeding= record['proceeding'],
        s2_paper= record['s2_paper'],
        s2_citations = record['s2_citations'],
        categories = record['categories'],
    )
    return paper_doc

def import_db():
    r = requests.get('https://synesthesia-research.s3.us-east-2.amazonaws.com/all_export.json')
    with open('../downloads/all_export.json', 'wb') as f:
        f.write(r.content)
    with open('../downloads/all_export.json', 'r') as f:
        papers = json.loads(f.read())
        # remove papers with empty dates
        papers = [p for p in papers if p['date'] is not '']
        # Sort by date
        papers = sorted(papers, key=lambda k: k['date'],reverse=True)
        docs = list(map(map_to_mode,papers))
        db = SessionLocal()
        db.bulk_save_objects(docs)
        db.commit()

# import_db()
export_db()
# engine.execute("""
# CREATE INDEX papers_index 
#    ON papers USING GIN (to_tsvector('english', title));
# """)

# connection = engine.connect()
# result = connection.execute("SELECT arxiv_id,title,abstract,date,s2_paper FROM papers WHERE arxiv_id IS NOT NULL AND s2_paper IS NULL ORDER BY date ASC LIMIT 5;")
# print(result.fetchall())



# df = pd.read_csv('../downloads/s2_export.csv')
# print(df['date'])
