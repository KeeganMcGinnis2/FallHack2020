from rest_framework import serializers
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('primaryind', 'smell', 'cleanliness', 'overall', 'lat', 'lon', 'washroom_type')
    
    lat = serializers.SerializerMethodField('get_lat')
    lon = serializers.SerializerMethodField('get_lon')
    smell = serializers.SerializerMethodField('get_smell')
    cleanliness = serializers.SerializerMethodField('get_cleanliness')
    overall = serializers.SerializerMethodField('get_overall')
    
    def get_lat(self, obj):
        return obj.location.latitude
    
    def get_lon(self, obj):
        return obj.location.longitude

    def get_smell(self, obj):
        if obj.num_of_ratings == 0:
            return 0
        else:
            return obj.smell / obj.num_of_ratings

    def get_cleanliness(self, obj):
        if obj.num_of_ratings == 0:
            return 0
        else:
            return obj.cleanliness / obj.num_of_ratings

    def get_overall(self, obj):
        if obj.num_of_ratings == 0:
            return 0
        else:
            return obj.overall / obj.num_of_ratings

class AddRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('primaryind', 'smell', 'cleanliness', 'overall')