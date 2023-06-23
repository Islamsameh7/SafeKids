from django.forms import ValidationError
from django.shortcuts import render, redirect
from django.urls import path
from django.http import HttpResponse
from .models import *
from django.views.decorators.csrf import csrf_exempt
from .forms import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from rest_framework import status
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.hashers import make_password,check_password
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.http import JsonResponse
from PIL import Image
import numpy as np
from scipy import spatial
import pickle

# Create your views here.


@api_view(['GET'])
@ensure_csrf_cookie
def get_csrf_token(request):
    return Response({"csrfToken": get_token(request)})


@api_view(['POST'])
def register(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        password = serializer.validated_data['password']
        hashed_password = make_password(password)
        serializer.validated_data['password'] = hashed_password
        serializer.save()
        return HttpResponse('user registered successfully', status=200)
   
    return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """
    @api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    print(email)
    print(password)
    user = authenticate(request, email=email, password=password)
    print(user)
    if user is not None:
        auth_login(request, user)
        user_data = {
            'id': user.id,
            'email': user.email,
            'name':user.name,
            'gender':user.gender,
            'username': user.username,
            'phonenumber': user.phoneNumber,
            'birthdate': user.birthdate,
            'city': user.city
            # Include any other user attributes you want to return
        }
        return Response(user_data, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    """


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    User = get_user_model()
    try:
        user = User.objects.get(email=email)
        if check_password(password, user.password):
            # Password matches, proceed with authentication
            auth_login(request, user)
            user_data = {
                'id': user.id,
                'email': user.email,
                'name':user.name,
                'gender':user.gender,
                'username': user.username,
                'phonenumber': user.phoneNumber,
                'birthdate': user.birthdate,
                'city': user.city
            # Include any other user attributes you want to return
        }
            return Response(user_data,status=status.HTTP_200_OK)
        else:
            # Password does not match
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        # User does not exist
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout(request):
    if request.user.is_authenticated:
        logout(request)
        return Response({"detail": "Logged out successfully."})
    return Response({"detail": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

# lazm a8yr el post hena tb2a zy el function ely fo2


@api_view(['POST'])
def add_found_kid(request):
  
        form = FoundKidForm(request.POST, request.FILES)
        if form.is_valid():
            kid = form.save(commit=False)
            kid.save()
            
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
   

  

@api_view(['POST'])
def add_missing_kid(request):
    
        form = MissingKidForm(request.POST, request.FILES)
       
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
                    return HttpResponse('Missing kid added successfully', status=200)    
                except ValidationError as e:
                    return HttpResponse(str(e), status=400)
            else:
                kid.save()

            
        else:
            print(form.errors)
            return HttpResponse(form.errors, status=400)


@api_view(['GET'])
def get_missing_kids(request):
    missing_kids = MissingKid.objects.all()
    data = []

    for kid in missing_kids:
      
        kid_data = {
            'name': kid.name,
            'birthdate': kid.birthdate,
            'gender': kid.gender,
            'lost_date': kid.lost_date,
            'last_known_location': kid.last_known_location,
            'still_missing': kid.still_missing,
            'notes': kid.notes,
            'contactNumber': kid.contactNumber,
         
        }
        
        # Get the associated photo for the missing kid, if it exists
        photo = Photo.objects.filter(missing_kid=kid).first()
        if photo:
            print(photo.photo.url)
            kid_data['photo_url'] = photo.photo.url
        else:
            
            kid_data['photo_url'] = None

        data.append(kid_data)

    return JsonResponse(data, safe=False)

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


@api_view(['POST'])
def similarity(request):
    with open('model.pkl', 'rb') as f:
        model_data = pickle.load(f)

    mtcnn = model_data['mtcnn']
    resnet = model_data['resnet']

    image1 = Image.open(request.FILES['image1'])
    image2 = Image.open(request.FILES['image2'])

    image1_cropped = mtcnn(image1)
    image2_cropped = mtcnn(image2)

    image1_embedding = resnet(image1_cropped.unsqueeze(0)).flatten().detach().numpy()
    image2_embedding = resnet(image2_cropped.unsqueeze(0)).flatten().detach().numpy()
    
    similarity = 1 - spatial.distance.cosine(image1_embedding, image2_embedding)

    return JsonResponse({'similarity': similarity})