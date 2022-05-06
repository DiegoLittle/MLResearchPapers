import sys
sys.path.append('../')
from database import engine


# connection = engine.connect()
# result = connection.execute("SELECT * FROM papers")
# print(result.fetchall())


def arxiv_lookup(arxiv_id):
    """
    Lookup an arxiv paper by arxiv_id
    """
    connection = engine.connect()
    result = connection.execute("SELECT * FROM papers WHERE arxiv_id = '{}'".format(arxiv_id))
    return result.fetchall()

def title_lookup(title):
    """
    Lookup an arxiv paper by title
    """
    connection = engine.connect()
    result = connection.execute("SELECT id FROM papers WHERE title = '{}'".format(title))
    return result.fetchall()
import json
if __name__ == '__main__':

    connection = engine.connect()
    result = connection.execute("SELECT arxiv_id,title,abstract,date,s2_paper FROM papers WHERE arxiv_id IS NOT NULL AND s2_paper IS NOT NULL ORDER BY date ASC;")
    for x in result.fetchall():
        s2_paper = json.loads(x['s2_paper'])
        if s2_paper['citationCount'] > 5:
            print(x['title'])
            print(s2_paper['citationCount'])
            break