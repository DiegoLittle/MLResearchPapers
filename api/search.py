import numpy as np
import torch
import os
import pandas as pd
import faiss
import time
from sentence_transformers import SentenceTransformer
import json
from pymongo import MongoClient
import torch
torch.set_num_threads(1)
f = open('spans.json')
data = json.load(f)
# Get array of all labels
labels = []
for i in data:
    label = i.get('label')
    labels.append(label)
print("Loading model")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Loading faiss index")

index = faiss.read_index('spans_index')

def search(query,k=10):
    t=time.time()
    print("query embedding")
    query_vector = model.encode([query],device='cpu',convert_to_numpy=True)
    # print(query_vector[1])
    print("Searching")
    top_k= index.search(query_vector, k)
    print("Done")
#    D, I = index.search(query_vector, k)
# Filter out results with emnpty labels
    # top_k = [x for x in top_k[0] if x[1] in labels]
    methods = [data[_id] for _id in top_k[1].tolist()[0]]
    for i,x in enumerate(methods):
        if x['label'] == '':
            methods.pop(i-1)
            top_k[0].tolist().pop(i-1)
    # top_k[0] = scores
    return {
    "methods": methods,
    "scores": top_k[0]
}


if __name__ == "__main__":
    # create_index('spans_index',labels)
    search("Test")