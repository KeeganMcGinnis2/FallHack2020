from django.shortcuts import render
from django.db import connection
from .models import Rating, Coordinate
from operator import attrgetter
from .serializers import RatingSerializer, AddRatingSerializer
from rest_framework import generics, status
from rest_framework.response import Response
import pandas as pd
import numpy as np
import json
import os

class RatingListCreate(generics.ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RatingSerializer
        else:
            return AddRatingSerializer


    def get_queryset(self):
        return self.get_five_closest_bathrooms()


    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        rating = Rating.objects.get(primaryind=serializer.data['primaryind'])
        rating.num_of_ratings += 1
        rating.smell += serializer.data['smell']
        rating.cleanliness += serializer.data['cleanliness']
        rating.overall += serializer.data['overall']
        rating.save() 

        return Response(status=status.HTTP_201_CREATED)


    def get_five_closest_bathrooms(self):
        query = str(Rating.objects.all().query)
        bathrooms = pd.read_sql_query(query, connection)
        query = str(Coordinate.objects.all().query)
        coordinates = pd.read_sql_query(query, connection)
        bathrooms = bathrooms.merge(coordinates, left_on='location_id', right_on='id')
        
        latitude = self.request.query_params.get('latitude')
        longitude = self.request.query_params.get('longitude')
        location = {'latitude': np.float64(latitude), 'longitude': np.float64(longitude)}
        distances = self.distance(location, bathrooms)
        min_distances = distances.nsmallest(5, 'distance')

        # Get rating objects that match coordinates
        nearest_locations = Rating.objects.filter(primaryind__in=min_distances['primaryind'])
       
        for i in range(len(nearest_locations)):
            nearest_locations[i].distance = min_distances[min_distances['primaryind'] == nearest_locations[i].primaryind]['distance'].values[0]
        
        nearest_locations = sorted(nearest_locations, key=attrgetter('distance'))
        return nearest_locations
    

    def distance(self, location, bathrooms):
        """
        Haversine algorithm derived from Chuck on Stack Overflow:
        https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/21623206
        """
        r = 6371
        dLat = np.deg2rad(location['latitude']-bathrooms['latitude'])
        dLon = np.deg2rad(location['longitude']-bathrooms['longitude'])
        a = np.sin(dLat/2) * np.sin(dLat/2)
        a = a + np.cos(np.deg2rad(location['latitude'])) * np.cos(np.deg2rad(bathrooms['latitude'])) * np.sin(dLon/2) * np.sin(dLon/2)
        c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1-a))
        d = r * c
        distances = pd.DataFrame({'primaryind': bathrooms['primaryind'], 'distance': d})
        return distances