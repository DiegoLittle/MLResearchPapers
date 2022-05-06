import requests
import pdfx
import yake
import os
def full_text(arxiv_id):

    r = requests.get("https://arxiv.org/pdf/{}.pdf".format(arxiv_id))

    with open('pdfs/'+arxiv_id+".pdf", 'wb') as fd:
            fd.write(r.content)
    pdf = pdfx.PDFx('pdfs/'+arxiv_id+".pdf")
    # references = pdf.get_references()
    pdf_full_text = pdf.get_text()
    os.remove('pdfs/'+arxiv_id+".pdf")
    return pdf_full_text
def get_keywords(text):
    kw_extractor = yake.KeywordExtractor()
    keywords = kw_extractor.extract_keywords(text)
    return keywords

import sys

if __name__ == "__main__":
    text = full_text(sys.argv[1])

