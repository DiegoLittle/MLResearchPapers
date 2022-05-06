import os
# os.system('pip install detectron2 -f https://dl.fbaipublicfiles.com/detectron2/wheels/cu102/torch1.9/index.html')
# os.system("git clone https://github.com/microsoft/unilm.git")

import sys

#import cv2
import json
import io
import torch

import requests



from fastapi import FastAPI, Request, Response,File, UploadFile
import io
from base64 import encodebytes
import json
from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3001",
    "http://localhost:5000",
    "http://localhost:3000",
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# from search import search
# @app.get("/search")
# def get_search(q:str):
#     print(q)
#     res = search(q)
#     res['scores'] = res['scores'].tolist()
#     print(res)
#     return res
#     # return 
from similarity.find import search_similar_papers
@app.get("/api/similar_papers")
def get_similar_papers(id:str):
    try:
        res = search_similar_papers(id)
    except:
        return []
    # res = [{'title':x} for x in res]
    # print(res)
    return res
