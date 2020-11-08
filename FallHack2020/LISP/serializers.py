from rest_framework import serializers
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('overall', 'lat', 'lon', 'washroom_type')
    
    lat = serializers.SerializerMethodField('get_lat')
    lon = serializers.SerializerMethodField('get_lon')
    
    def get_lat(self, obj):
        return(obj.location.latitude)
    
    def get_lon(self, obj):
        return(obj.location.longitude)