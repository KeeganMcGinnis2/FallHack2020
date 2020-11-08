from django.shortcuts import render
from .models import Rating, Coordinate
from .serializers import RatingSerializer
from rest_framework import generics
import pandas as pd
import numpy as np
import json
import os

class RatingListCreate(generics.ListCreateAPIView):
    serializer_class = RatingSerializer
    # queryset = Rating.objects.all()

    def get_queryset(self):
        print("IN GET QUERYSET")
        return self.get_five_closest_bathrooms()

    def get_five_closest_bathrooms(self):
        data = pd.read_json(os.path.join(os.path.dirname(os.path.dirname(__file__)),'LISP\public-washrooms.json'))
        bathrooms = pd.DataFrame(columns=['latitude', 'longitude', 'primaryind'])
        for i in range(len(data)):
            latitude = data['fields'].iloc[i]['geom']['coordinates'][0]
            longitude = data['fields'].iloc[i]['geom']['coordinates'][1]
            primaryind = data['fields'].iloc[i]['primaryind']
            bathrooms.at[i, 'latitude'] = latitude
            bathrooms.at[i, 'longitude'] = longitude
            bathrooms.at[i, 'primaryind'] = primaryind
    
        bathrooms['latitude'] = bathrooms['latitude'].astype('float64')
        bathrooms['longitude'] = bathrooms['longitude'].astype('float64')
        print(bathrooms)
        latitude = self.request.query_params.get('latitude')
        longitude = self.request.query_params.get('longitude')
        location = {'latitude': np.float64(latitude), 'longitude': np.float64(longitude)}
        distances = self.distance(location, bathrooms)
        min_distances = distances.nsmallest(5)
        indexes = min_distances.reset_index()['index'].values
        coordinates = []
        latitudes = []
        longitudes = []
        primary = []
        for i in indexes:
            bathroom = bathrooms.iloc[i]
            print('BATHROOM', bathroom)
            latitudes.append(bathroom['latitude'])
            longitudes.append(bathroom['longitude'])
            primary.append(bathroom['primaryind'])
            print()

        
        # Get rating objects that match coordinates
        nearest_locations = Rating.objects.filter(primaryind__in=primary)
        print(nearest_locations)
        return nearest_locations
    
    def distance(self, location, bathrooms):
        """
        Haversine algorithm derived from Chuck on Stack Overflow:
        https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/21623206
        """
        r = 6371
        # print(bathrooms)
        dLat = np.deg2rad(location['latitude']-bathrooms['latitude'])
        dLon = np.deg2rad(location['longitude']-bathrooms['longitude'])
        a = np.sin(dLat/2) * np.sin(dLat/2)
        a = a + np.cos(np.deg2rad(location['latitude'])) * np.cos(np.deg2rad(bathrooms['latitude'])) * np.sin(dLon/2) * np.sin(dLon/2)
        c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1-a))
        d = r * c
        return d