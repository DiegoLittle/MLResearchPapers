import sys
sys.path.append('../')
from database import SessionLocal, engine
import faiss
import json
import numpy as np
from annoy import AnnoyIndex


def fetch_papers():
    """
    Lookup an arxiv paper by arxiv_id
    """
    connection = engine.connect()
    result = connection.execute("SELECT arxiv_id,title,abstract,date,s2_paper FROM papers WHERE arxiv_id IS NOT NULL AND s2_paper IS NOT NULL ORDER BY date DESC LIMIT 1;")
    return result.fetchall()

def fetch_papers_for_index():
    """
    Lookup an arxiv paper by arxiv_id
    """
    connection = engine.connect()
    result = connection.execute("SELECT arxiv_id,title,abstract,date,s2_paper FROM papers WHERE arxiv_id IS NOT NULL AND s2_paper IS NOT NULL ORDER BY date DESC;")
    return result.fetchall()

# index = faiss.read_index('papers_vectors_index')
# papers = fetch_papers_for_index()
# print([x['title'] for x in papers[:10]])
with open('similarity/papers.json', 'r') as f:
    papers = json.load(f)
def search_similar_papers(arxiv_id):
    """
    Lookup an arxiv paper by arxiv_id
    """
    connection = engine.connect()
    result = connection.execute("SELECT arxiv_id,title,abstract,date,s2_paper FROM papers WHERE arxiv_id::numeric = {} AND s2_paper IS NOT NULL;".format(arxiv_id))
    paper = result.fetchall()[0]
    query_vec = json.loads(paper['s2_paper'])['embedding']['vector']
    f=768
    u = AnnoyIndex(f, 'angular')
    u.load('similarity/papers.ann') # super fast, will just mmap the file
    search = u.get_nns_by_vector(query_vec, 5)   
    # for x in search:
    #     print(papers[x]) 
    results = [papers[x]for x in search]
    if(results[0]['arxiv_id'] == arxiv_id):
        results.pop(0)
    return results


    # D, I = index.search(query_vec, 1)
    # print(D,I)
# print(search_similar_papers(str(2205.00984)))
# index = faiss.read_index('papers_vectors_index')

# top_k= index.search(query_vector, k)
