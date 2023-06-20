from django.shortcuts import render, redirect
from django.urls import path
from django.http import HttpResponse
from .models import *
from django.views.decorators.csrf import csrf_exempt
from .forms import FoundKidForm
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from django.core.exceptions import ValidationError
from django.contrib.contenttypes.models import ContentType
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


@csrf_exempt
def add_found_kid(request):
    if request.method == 'POST':
        form = FoundKidForm(request.POST, request.FILES)
        if form.is_valid():
            kid = form.save(commit=False)

            # Handle photo upload
            photo_file = request.FILES.get('photo')
            if photo_file:
                try:
                    kid.save()
                    photo = Photo(photo=photo_file)
                    photo.found_kid = kid

                    photo.save()
                except ValidationError as e:
                    return HttpResponse(str(e), status=400)
            else:
                kid.save()

            return HttpResponse('Found kid added successfully', status=200)
        else:
            return HttpResponse(form.errors, status=400)
    else:
        form = FoundKidForm()

    return HttpResponse('Method not allowed', status=405)


@csrf_exempt
def add_missing_kid(request):
    if request.method == 'POST':
        form = MissingKid(request.POST, request.FILES)
        if form.is_valid():
            kid = form.save(commit=False)

            # Handle photo upload
            photo_files = request.FILES.getlist('photos')
            if photo_files:
                try:
                    kid.save()
                    for photo_file in photo_files:
                        photo = Photo(photo=photo_file)

                        photo.missing_kid = kid

                        photo.save()
                except ValidationError as e:
                    return HttpResponse(str(e), status=400)
            else:
                kid.save()

            return HttpResponse('Missing kid added successfully', status=200)
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
