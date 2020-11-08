from LISP.models import Rating, Coordinate
import os
import pandas as pd

data = pd.read_json(os.path.join(os.path.cwd(),'LISP\\public-washrooms.json'))
bathrooms= pd.DataFrame(columns=['latitude', 'longitude', 'primaryind'])

for i in range(len(data)):
    latitude = data['fields'].iloc[i]['geom']['coordinates'][0]
    longitude = data['fields'].iloc[i]['geom']['coordinates'][1]
    primaryind = data['fields'].iloc[i]['primaryind']
    bathrooms.at[i, 'latitude'] = latitude
    bathrooms.at[i, 'longitude'] = longitude
    bathrooms.at[i, 'primaryind'] = primaryind
    
bathrooms['latitude'] = bathrooms['latitude'].astype('float64')
bathrooms['longitude'] = bathrooms['longitude'].astype('float64')

for i in range(len(bathrooms)):
    bathroom = bathrooms.iloc[i]
    coord = Coordinate(latitude=bathroom['latitude'], longitude=bathroom['longitude'])
    coord.save()
    rating = Rating(primaryind=bathroom['primaryind'], location=coord)
    rating.save()