from scholarly import scholarly
search_query = scholarly.search_pubs('Resampling Images to a Regular Grid from a Non-Regular Subset of Pixel Positions Using Frequency Selective Reconstruction')
print(next(search_query)['num_citations'])

# Run this on database to get the number of citations for each paper which would just optimize for the priority of the S2 request so not too helpful