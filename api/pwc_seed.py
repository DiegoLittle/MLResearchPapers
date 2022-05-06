import models
import json
import uuid
from utils.full_text_extract import full_text,get_keywords
from utils.paper_lookup import arxiv_lookup,title_lookup
from database import SessionLocal, engine
import pandas as pd

def json_seed():
    with open("./downloads/papers-with-abstracts.json") as f:
        papers = json.load(f)
        # remove papers with empty dates
        papers = [p for p in papers if p['date'] is not '']
        # Sort by date
        papers = sorted(papers, key=lambda k: k['date'],reverse=True)
        print(papers[:10])
        for paper in papers:
            if paper['arxiv_id']:
                lookup = arxiv_lookup(paper['arxiv_id'])
                if len(lookup) > 0:
                    print('Paper already in database')
                    continue
            try:
                lookup = title_lookup(paper['title'])
            except Exception as e:
                print(e)
                print(paper['title'])
                continue
            if len(lookup) > 0:
                print('Paper already in database')
                continue
            try:
                if paper['arxiv_id']:
                    # print("Extract full text")
                    # text = full_text(paper['arxiv_id'])
                    keywords = get_keywords(paper['abstract'])
                else:
                    text = ''
                    keywords = []
            except Exception as e:
                print(e)
                continue
            paper_doc = models.Paper(
                        id= str(uuid.uuid4()),
                        arxiv_id= paper['arxiv_id'],
                        title= paper['title'],
                        abstract= paper['abstract'],
                        authors= json.dumps(paper['authors']),
                        date= paper['date'],
                        methods= json.dumps(paper['methods']),
                        tasks = json.dumps(paper['tasks']),
                        url_abs= paper['url_abs'],
                        url_pdf= paper['url_pdf'],
                        proceeding= paper['proceeding'],
                        full_text= text,
                        keywords= json.dumps(keywords)
                    )
            print("Adding paper to DB "+paper['title'])
            db = SessionLocal()
            db.add(paper_doc)
            db.commit()
            db.close()

            with open('downloads/paper_data.json', 'w') as outfile:
                json.dump(papers, outfile)
import numpy as np
from database import engine
def papers_csv():
    df = pd.read_csv('downloads/papers.csv')
    df['keywords'] = np.nan
    df['full_text'] = np.nan
    print(list(df))
    # df.to_sql('papers', con=engine, index=True, index_label='id', if_exists='replace')
    json_string = df.to_json(orient='records')
    parsed = json.loads(json_string)
    with open('papers_formatted.json', 'w') as json_file:
        json_file.write(json.dumps(parsed, indent=4 ))

def doc_map(paper):
    paper_doc = models.Paper(
        id= str(uuid.uuid4()),
        arxiv_id= paper['arxiv_id'],
        title= paper['title'],
        abstract= paper['abstract'],
        authors= json.dumps(paper['authors']),
        date= paper['date'],
        methods= json.dumps(paper['methods']),
        tasks = json.dumps(paper['tasks']),
        url_abs= paper['url_abs'],
        url_pdf= paper['url_pdf'],
        proceeding= paper['proceeding'],
    )
    return paper_doc

with open("./downloads/papers-with-abstracts.json") as f:
    papers = json.load(f)
    # remove papers with empty dates
    papers = [p for p in papers if p['date'] is not '']
    # Sort by date
    papers = sorted(papers, key=lambda k: k['date'],reverse=True)
    docs = list(map(doc_map,papers))
    db = SessionLocal()
    db.bulk_save_objects(docs)
    db.commit()

# 
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
    )
    return paper_doc
# import models
# papers_csv()
# with open('papers_formatted.json',"r")as file:
#     data = json.loads(file.read())
#     print(data[0])
    # data = list(map(map_to_mode,data))
    # print(data[:10])
    # models.Base.metadata.create_all(bind=engine)
    # db = SessionLocal()
    # db.bulk_save_objects(data)
    # db.commit()
    