import requests
import json


def get_paper_citations(paper_id):
    res = requests.get("https://api.semanticscholar.org/graph/v1/paper/ARXIV:{}/citations?fields=contexts,intents,isInfluential,externalIds,url,title,abstract,venue,year,referenceCount,citationCount,influentialCitationCount,isOpenAccess,fieldsOfStudy,s2FieldsOfStudy,authors".format(paper_id))
    # write to json file
    # with open('citations.json', 'w') as outfile:
    #     json.dump(res.json(), outfile)
    return res.json()
    # res = requests.get('https://api.semanticscholar.org/graph/v1/paper/ARXIV:{}?fields=externalIds,url,title,abstract,venue,year,referenceCount,citationCount,influentialCitationCount,isOpenAccess,fieldsOfStudy,s2FieldsOfStudy,authors,citations,references,embedding,tldr'.format(paper_id))
    # with open('data.json', 'w') as outfile:
    #     json.dump(res.json(), outfile)

