from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import *
urlpatterns = [
    path('add_found_kid/', add_found_kid, name='add_found_kid'),
    path('add_missing_kid/', add_missing_kid, name='add_missing_kid'),
    path('get_missing_kids/', get_missing_kids, name='get_missing_kids'),
    path('get_found_kid_details/', get_found_kid_details, name='get_found_kid_details'),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('edit_user/', edit_user, name='edit_user'),
    path('logout/', logout, name='logout'),
    path('similarity/', similarity, name='similarity'),
    
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)