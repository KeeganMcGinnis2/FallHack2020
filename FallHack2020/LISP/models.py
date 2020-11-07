from django.db import models

CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('U', 'Unisex'),
    ('H', 'Handicap')
)

class Rating(models.Model):
    rating = models.IntegerField()
    location = models.ForeignKey('Coordinate', on_delete=models.CASCADE)
    washroom_type = models.CharField(max_length=8, choices=CHOICES, default='U')

class Coordinate(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    