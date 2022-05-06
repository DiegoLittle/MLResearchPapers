import requests
import gzip
from dataclasses import dataclass
import dataclasses
import json
import os
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
def download_dataset(dataset):
    r = requests.get('https://production-media.paperswithcode.com/about/'+dataset)
    with open('downloads/'+dataset, 'wb') as f:
        f.write(r.content)
    with gzip.open('downloads/'+dataset, 'rb') as f:
        contents = f.read()
    with open('downloads/'+dataset.split('.')[0]+".json", 'wb') as f_out:
        f_out.write(contents)
    # Remove the gzip file
    os.remove('downloads/'+dataset)

if not (os.path.exists('downloads/')):
    os.mkdir('downloads/')
if not (os.path.exists('pdfs/')):
    os.mkdir('pdfs/')
if not os.path.exists('downloads/methods.json'):
    download_dataset('methods.json.gz')
if not os.path.exists('downloads/datasets.json'):
    download_dataset('datasets.json.gz')
if not os.path.exists('downloads/evaluation-tables.json'):
    download_dataset('evaluation-tables.json.gz')
if not os.path.exists('downloads/links-between-papers-and-code.json'):
    download_dataset('links-between-papers-and-code.json.gz')
if not os.path.exists('downloads/papers-with-abstracts.json'):
    download_dataset('papers-with-abstracts.json.gz')

@dataclass
class Span:
    label: str
    type: str

spans = []




def get_names_collections_areas():
    f = open('downloads/methods.json')
    data = json.load(f)
    names = []
    collections = []
    areas=[]
    area_ids=[]
# Get categories, methods,and collections
    for i in data:
        name = i.get('name')
        names.append(name)
        for collection in i.get('collections'):
            
            collection_name = collection.get('collection')
            collections.append(collection_name)
            area_name = collection.get('area')
            areas.append(collection.get('area'))
            area_ids.append(collection.get('area_id'))
    names = list(set(names))
    collections = list(set(collections))
    areas = list(set(areas))
    return (names,collections,areas)

def get_datasets_tasks_modalities():
    f = open('downloads/datasets.json')
    data = json.load(f)

    datasets = []
    tasks = []
    modalities = []
    for i in data:
        name = i.get('name')
        datasets.append(name)
        # print(i.get('tasks'))
        for task in i.get('tasks',[]):
            tasks.append(task.get('task'))
        for modality in i.get('modalities',[]):
            modalities.append(modality)
    datasets = list(set(datasets))
    tasks = list(set(tasks))
    modalities = list(set(modalities))
    return (datasets,tasks,modalities)

def get_spans_to_json():
    names,collections,areas = get_names_collections_areas()
    datasets,tasks,modalities = get_datasets_tasks_modalities()

    for dataset in datasets:
        spans.append(dataclasses.asdict(Span(label=dataset, type="dataset")))
    for task in tasks:
        spans.append(dataclasses.asdict(Span(label=task, type="task")))
    for modality in modalities:
        spans.append(dataclasses.asdict(Span(label=modality, type="modality")))


    for method in names:

        spans.append(dataclasses.asdict(Span(label=method, type="method")))
    for area in areas:
        spans.append(dataclasses.asdict(Span(label=area, type="category")))
    for collection in collections:
        spans.append(dataclasses.asdict(Span(label=collection, type="collection")))
    # Write to file



def get_spans_from_tables():
    tasks = [ span['label'] for span in spans if span['type'] == 'task']
    datasets = [ span['label'] for span in spans if span['type'] == 'dataset']
    # print(tasks)
    # print(len(datasets))
    new_tasks = []
    new_datasets = []
    tables = open('downloads/evaluation-tables.json')
    tables_data = json.load(tables)
    for table in tables_data:
        for dataset in table['datasets']:
            if dataset['dataset'] not in datasets:
                new_datasets.append(dataset['dataset'])
            if len(dataset['subdatasets']) > 0:
                print(dataset['subdatasets'])
            # print(dataset['dataset'])
            new_datasets.append(dataset['dataset'])
        if table['task'] not in tasks:
            new_tasks.append(table['task'])
        for subtask in table['subtasks']:
            if subtask['task'] not in tasks:
                new_tasks.append(subtask['task'])
                # print(subtask['task'])
    
    print(len(new_tasks))
    print(len(new_datasets))
    return new_tasks,new_datasets
        



print("Building spans")
get_spans_to_json()
new_tasks,new_datasets = get_spans_from_tables()
for task in new_tasks:
    spans.append(dataclasses.asdict(Span(label=task, type="task")))
for dataset in new_datasets:
    json_span = dataclasses.asdict(Span(label=dataset, type="dataset"))
    if(json_span not in spans):
        spans.append(dataclasses.asdict(Span(label=dataset, type="dataset")))
for i,span in enumerate(spans):
    if span['label'] == "" or span['label'] == '.':
        spans.pop(i)
with open('spans.json', 'w') as outfile:
    json.dump(spans, outfile)
print("Building spans search index for semantic search")
f = open('spans.json')
data = json.load(f)
# Get array of all labels
labels = []
for i in data:
    label = i.get('label')
    labels.append(label)

def create_index(name,data:list):

    model = SentenceTransformer('all-MiniLM-L6-v2')
    encoded_data = model.encode(data)
    print("Building faiss index")
    print(encoded_data.shape)

    index = faiss.IndexIDMap(faiss.IndexFlatIP(384))
    index.add_with_ids(encoded_data, np.array(range(0, len(data))))

    faiss.write_index(index, name)

create_index('spans_index',labels)