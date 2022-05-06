from .models import Base
from .database import SessionLocal, engine
import uuid
import json
# Base.metadata.create_all(bind=engine)

class Paper():
    # "arxiv_id": "1805.10616",
    # "title": "Dynamic Network Model from Partial Observations",
    # "abstract": "Can evolving networks be inferred and modeled without directly observing\ntheir nodes and edges? In many applications, the edges of a dynamic network\nmight not be observed, but one can observe the dynamics of stochastic cascading\nprocesses (e.g., information diffusion, virus propagation) occurring over the\nunobserved network. While there have been efforts to infer networks based on\nsuch data, providing a generative probabilistic model that is able to identify\nthe underlying time-varying network remains an open question. Here we consider\nthe problem of inferring generative dynamic network models based on network\ncascade diffusion data. We propose a novel framework for providing a\nnon-parametric dynamic network model--based on a mixture of coupled\nhierarchical Dirichlet processes-- based on data capturing cascade node\ninfection times. Our approach allows us to infer the evolving community\nstructure in networks and to obtain an explicit predictive distribution over\nthe edges of the underlying network--including those that were not involved in\ntransmission of any cascade, or are likely to appear in the future. We show the\neffectiveness of our approach using extensive experiments on synthetic as well\nas real-world networks.",
    # "url_abs": "http://arxiv.org/abs/1805.10616v4",
    # "url_pdf": "http://arxiv.org/pdf/1805.10616v4.pdf",
    # "proceeding": "NeurIPS 2018 12",
    # "authors": [
    #   "Elahe Ghalebi",
    #   "Baharan Mirzasoleiman",
    #   "Radu Grosu",
    #   "Jure Leskovec"
    # ],
    # "tasks": [],
    # "date": "2018-05-27",
    # "methods": []
    def __init__(self,
    arxiv_id=None,
    title=None,
    abstract=None,
    url_abs=None,
    url_pdf=None,
    proceeding=None,
    authors=None,
    tasks=None,
    date=None,
    methods=None,
    doi=None,
    grobid=None,
    references=None,
    categories=None,
    full_text=None,
    images = None,
    urls = None,
    ):
        self.arxiv_id = arxiv_id
        self.title = title
        self.abstract = abstract
        self.url_abs = url_abs
        self.url_pdf = url_pdf
        self.categories = categories
        self.proceeding = proceeding
        self.authors = authors
        self.tasks = tasks
        self.date = date
        self.methods = methods
        self.doi = doi
        self.grobid = grobid
        self.references = references
        self.full_text = full_text
        self.images = images
        self.urls = urls
    
def addToDB(self):
    db = SessionLocal()
    # fix dictionary values with json.dumps in self
    # doc.tasks = json.dumps(doc.tasks)
    # doc.methods = json.dumps(doc.methods)
    # doc.grobid = json.dumps(doc.grobid)
    # doc.references = json.dumps(doc.references)
    paper = models.Paper(**self.__dict__)
    


        #         arxiv_id=self.arxiv_id,
        # title=self.title,
        # abstract=self.abstract,
        # url_abs=self.url_abs,
        # url_pdf=self.url_pdf,
        # proceeding=self.proceeding,
        # authors=self.authors,
        # tasks=self.tasks,
        # date=self.date,
        # methods=self.methods,
        # doi=self.doi,
        # grobid=self.grobid,
        # references=json.loads()
    db.add(paper)
    db.commit()
    db.close()
    return paper