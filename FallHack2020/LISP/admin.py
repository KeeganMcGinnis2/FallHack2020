from django.contrib import admin

from .models import Rating, Coordinate

# Register your models here.
class RatingAdmin(admin.ModelAdmin):
    fields = ['num_of_ratings', 'smell', 'location', 'cleanliness', 'washroom_type', 'overall']

admin.site.register(Rating)
admin.site.register(Coordinate)