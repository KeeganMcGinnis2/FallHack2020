from django.urls import path
from . import views

urlpatterns = [
    path('api/LISP', views.RatingListCreate.as_view()),
]