import requests
import json
import sys

from sqlalchemy import text
sys.path.append('../')
from database import SessionLocal, engine
import models

def fetch_papers():
    """
    Lookup an arxiv paper by arxiv_id
    """
    connection = engine.connect()
    result = connection.execute("SELECT arxiv_id,title,abstract,date,s2_paper FROM papers WHERE arxiv_id IS NOT NULL AND s2_paper IS NULL ORDER BY date DESC LIMIT 100;")
    return result.fetchall()

def get_paper_citations(paper_id):
    citations_res = requests.get("https://api.semanticscholar.org/graph/v1/paper/ARXIV:{}/citations?fields=contexts,intents,isInfluential,externalIds,url,title,abstract,venue,year,referenceCount,citationCount,influentialCitationCount,isOpenAccess,fieldsOfStudy,s2FieldsOfStudy,authors".format(paper_id))
    # write to json file
    citations = citations_res.json()
    res = requests.get('https://api.semanticscholar.org/graph/v1/paper/ARXIV:{}?limit=9999&fields=venue,year,referenceCount,citationCount,influentialCitationCount,isOpenAccess,authors,citations,references,embedding,tldr'.format(paper_id))
    paper = res.json()
    return paper, citations



# TODO Handle the case where the paper cant be found '{"error": "Paper with id ARXIV:2204.12023 not found"}


dates = [x['date'] for x in fetch_papers()]
print(dates)
raise

num_loops=0
num_requests = 0
import time
while True:
    num_loops+=1
    print("Loop {}".format(num_loops))
    papers = fetch_papers()
    start = time.time()
    for paper in papers:
        if num_requests >= 100:
            end = time.time()
            print("{} requests in {} seconds".format(num_requests, end-start))
            print("Too many requests")
            sleep_time = 300 - (end-start)
            if sleep_time < 0:
                sleep_time = 0
            print("Sleeping for {} seconds".format(sleep_time))
            time.sleep(sleep_time)
            num_requests = 0
            
        paper_data,citations = get_paper_citations(paper['arxiv_id'])
        num_requests +=2
        db = SessionLocal()
        paper_query = db.query(models.Paper).filter(models.Paper.arxiv_id == paper['arxiv_id']).first()
        setattr(paper_query, 's2_paper', json.dumps(paper_data))
        setattr(paper_query, 's2_citations', json.dumps(citations))
        db.commit()
        print("{} {}".format(paper['arxiv_id'], paper['title']))
    print("{} requests in {} seconds".format(num_requests, time.time()-start))




# get_paper_citations("1909.07755")