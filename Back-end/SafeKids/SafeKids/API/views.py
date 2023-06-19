from django.shortcuts import render,redirect
from django.urls import path
from django.http import HttpResponse
from .models import *
from .forms import FoundKidForm
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CustomUserSerializer

# Create your views here.

def Login():
    return True

@api_view(['POST'])
def register(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def add_found_kid(request):
    if request.method == 'POST':
        form = FoundKidForm(request.POST)
        if form.is_valid():
            form.save()
          
      
    else:
        form = FoundKidForm()
    
def get_found_kid_details(request, kid_name):
    try:
        found_kid = FoundKid.objects.get(name=kid_name)
        # Access the attributes of the found kid
        user = found_kid.user
        gender = found_kid.gender
        age = found_kid.age
        location = found_kid.location
        
        # Pass the attributes to the template or do something with them
        context = {
            'user': user,
            'gender': gender,
            'age': age,
            'location': location,
        }
        return render(request, 'found_kid_details.html', context)
    except FoundKid.DoesNotExist:
        # Handle the case when the found kid is not found
        return render(request, 'kid_not_found.html')

