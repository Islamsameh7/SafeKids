from django.urls import path
from . import views
from .views import *
urlpatterns = [
    path('add_found_kid/', add_found_kid, name='add_found_kid'),
    path('get_found_kid_details/', get_found_kid_details, name='get_found_kid_details'),
    path('register/', register, name='register'),

]