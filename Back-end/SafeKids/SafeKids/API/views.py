from django.shortcuts import render, redirect
from django.urls import path
from django.http import HttpResponse
from .models import *
from django.views.decorators.csrf import csrf_exempt
from .forms import FoundKidForm

@csrf_exempt
def add_found_kid(request):
    if request.method == 'POST':
        form = FoundKidForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse('Found kid added successfully', status=200)
        else:
            return HttpResponse(form.errors, status=400)
    else:
        form = FoundKidForm()
    
    return HttpResponse('Method not allowed', status=405)

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
# Create your views here.

def Login():
    return True
