import sys
sys.path.append('../')
from database import SessionLocal, engine
import json
import numpy as np
import faiss


def fetch_papers():
    """
    Lookup an arxiv paper by arxiv_id
    """
    connection = engine.connect()
    result = connection.execute("SELECT arxiv_id,title,abstract,date,s2_paper FROM papers WHERE arxiv_id IS NOT NULL AND s2_paper IS NOT NULL ORDER BY date DESC;")
    return result.fetchall()

i=0
def map_to_vec(s2_paper):
    try:
        return np.array(json.loads(s2_paper['s2_paper'])['embedding']['vector'])
    except:
        print(json.loads(s2_paper['s2_paper']))
        print(s2_paper['arxiv_id'])
        # papers.remove(s2_paper)
        return np.zeros(768)
papers = fetch_papers()
print(len(papers))
for paper in papers:
    try:
        # print(json.loads(paper['s2_paper']))
        # json.loads(paper['s2_paper'])['embedding']['vector']
        np.array(json.loads(paper['s2_paper'])['embedding']['vector'])
    except:
        # print(json.loads(paper['s2_paper']))
        # print(paper['arxiv_id'])
        #remove paper from papers
        papers.remove(paper)
print(len(papers))
vectors = np.array(list(map(map_to_vec, papers))).astype('float32')
# index = faiss.IndexIDMap(faiss.IndexFlatIP(768))
# index.add_with_ids(vectors, np.array(range(0, len(vectors))))
# faiss.write_index(index, "papers_vectors_index")


from annoy import AnnoyIndex
import random

f = 768  # Length of item vector that will be indexed
i=0
t = AnnoyIndex(f, 'angular')
for i in range(len(vectors)):
    v = vectors[i]
    t.add_item(i, v.tolist())

t.build(10) # 10 trees
t.save('papers.ann')

with open('papers.json', 'w') as f:
    json.dump([dict(x) for x in papers], f)


# u = AnnoyIndex(f, 'angular')
# u.load('test.ann') # super fast, will just mmap the file
# print(u.get_nns_by_item(0, 5)) # will find the 1000 nearest neighbors