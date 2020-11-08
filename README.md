# Latrine Inspection Sanitation Protection (LISP)
![image](https://user-images.githubusercontent.com/31518615/98459006-55829700-2164-11eb-9e64-950a55509fea.png)

## Contributors
Keegan McGinnis, Ryan Zacharias, Yo Shium Wong

## Description
Have you ever wandered around Vancouver and wanted to go to the washroom? I sure have and boy did it not end well. With the help of LISP, all those worries of quickly finding a washroom will go away. LISP is a web-based tool that helps users find washrooms and also review washrooms in the Vancouver area.  The front-end is built using React and the back-end uses Django Rest Framework. 


## Technical Details
### Frontend
React & Bootstrap
### Backend
Django Rest Framework (sqlite)
#### APIs
1) City of Vancouver (https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-washrooms&q=&facet=type&facet=summer_hours&facet=winter_hours&facet=wheel_access&facet=maintainer&facet=geo_local_area)
2) Google Streetview API
### Math
Haversine Distance Formula
![image](https://user-images.githubusercontent.com/31518615/98458961-ed33b580-2163-11eb-9877-b39d652dcaed.png)
![image](https://user-images.githubusercontent.com/31518615/98458966-f6248700-2163-11eb-96ad-5910d4423771.png)
Pandas, NumPy


## Build Instructions
### Backend:
```
    pip install -r requirements.txt
    
    python manage.py runserver
```    
### Frontend:
``` 
    npm install
    
    npm run devstart
```
### (Additional requirements: Google Streetview API Key with billing, and SQLite Database with City of Vancouver Public Washroom data)
### TO GET THE SQLITE TABLE RUN THIS SCRIPT, MUST BE IN DJANGO SHELL (python manage.py shell)
```
from LISP.models import Rating, Coordinate
import os
import pandas as pd

data = pd.read_json(os.path.join(os.getcwd(),'LISP\\public-washrooms.json'))
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
```

### To test Django Rest Framework:
Use the following URL parameters in URL or Postman:
```
ex: http://127.0.0.1:8000/api/LISP?latitude=-123.103599022256&longitude=49.2778209665246

latitude - -90 to 90
longitude - -180 to 180
```

## Video
[![image](https://user-images.githubusercontent.com/31518615/98458699-6b428d00-2161-11eb-9ec7-50962629f755.png)](https://www.youtube.com/watch?v=BxmaIsAKQD4)

## To-do
1. Finish integrating the front-end and back-end together to work simultaneously.
2. POST for rating system.
3. Expand out of Vancouver.
