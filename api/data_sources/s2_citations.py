import requests
import json
import sys
sys.path.append('../')
from database import SessionLocal, engine
import models


def fetch_papers():
    """
    Lookup an arxiv paper by arxiv_id
    """
    connection = engine.connect()
    result = connection.execute("SELECT arxiv_id,title,abstract,date,s2_paper,s2_citations FROM papers WHERE arxiv_id IS NOT NULL AND s2_paper IS NOT NULL ORDER BY date DESC LIMIT 100;")
    return result.fetchall()

for paper in fetch_papers():
    if len(json.loads(paper['s2_citations']).get('data'))>0:
        citations = json.loads(paper['s2_citations']).get('data')
        for citation in citations:
            print(citation)
            break