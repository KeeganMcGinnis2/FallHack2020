from django.db import models

CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('U', 'Unisex'),
    ('H', 'Handicap')
)

class Rating(models.Model):
    address = models.TextField(default='')
    distance = models.DecimalField(default=0, max_digits=9, decimal_places=6)
    primaryind = models.IntegerField(default=-1)
    num_of_ratings = models.IntegerField(default=0)
    smell = models.IntegerField(default=0)
    cleanliness = models.IntegerField(default=0)
    overall = models.IntegerField(default=0)
    location = models.ForeignKey('Coordinate', related_name='coordinates', on_delete=models.CASCADE)
    washroom_type = models.CharField(max_length=8, choices=CHOICES, default='U')

    def __str__(self):
        ret = 'PRIMARYIND: ' + str(self.primaryind) + ', #ofRatings: ' + str(self.num_of_ratings) + ', SMELL: ' \
            + str(self.smell) + ', CLEANLINESS: ' + str(self.cleanliness) + ', OVERALL: ' + str(self.overall)
        return ret + ', ' + self.location.__str__()


class Coordinate(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        ret = 'LATITUDE: ' + str(self.latitude) + ', LONGITUDE: ' +  str(self.longitude)
        return ret

    def __eq__(self, other):
        return self.latitude == other.latitude and self.longitude == other.longitude

    