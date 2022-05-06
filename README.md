# Machine Learning Research Assistant

Inspired by projects like Arxiv-Vanity, Papers With Code, ArXiv-Sanity, Connected Papers, and Semantic Scholar, we are building a platform to aid and enrich the research experience for machine learning. Browse new papers on the home page, search for papers, find papers that are similar, and save papers to your personal library. We use SPECTER embeddings of each paper and perform an approximate nearest neighbor search on the embedding of the paper to find similar papers.


Sources publicly available data from papers with code to get tasks, methods, datasets, and papers.
Creates a semantic search index on previously mentioned terms using sentence transformers and faiss.


To download the seeds to the database and create the initial search index
`cd api`
`python init.py`
Import DB
`python export.py`
To source papers from ArXiv run
`python source_papers.py 10`
To source papers from the papers with code database run
`python pwc_seed.py`
Start the API server
`python -m uvicorn main:app --port 5555`

To start the web UI in development mode run
`cd web`
`npm run dev`
or to build a production version run
`npm run build`
`npm run start`


