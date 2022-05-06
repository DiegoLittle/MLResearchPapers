import gzip

with gzip.open('downloads/dblp.xml.gz', 'rb') as f:
    contents = f.read()
with open('downloads/dblp.xml', 'wb') as f_out:
    f_out.write(contents)

# r = "https://dblp.org/xml/dblp.xml.gz"