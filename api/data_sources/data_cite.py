import requests
import json

r = requests.get("https://api.datacite.org/dois/10.48550/arXiv.1706.03762")

data = r.json()
print(data)
with open("data_cite.json", "w") as f:
    f.write(json.dumps(data))