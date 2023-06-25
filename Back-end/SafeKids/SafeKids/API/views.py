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
from django.contrib.auth.hashers import make_password, check_password
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

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    User = get_user_model()
    try:
        user = User.objects.get(email=email)
        if check_password(password, user.password):
            auth_login(request, user)
            user_data = {
                'id': user.id,
                'email': user.email,
                'name':user.name,
                'gender':user.gender,
                'name': user.name,
                'gender': user.gender,
                'username': user.username,
                'phonenumber': user.phoneNumber,
                'birthdate': user.birthdate,
                'city': user.city,
            
        }
            if user.photo:
                user_data['photo'] = user.photo.url
            
            return Response(user_data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def edit_user(request):

    user = CustomUser.objects.get(id=request.POST.get('user_id'))

    if request.POST.get('name'):
        user.name = request.POST.get('name')
    if request.POST.get('phonenumber'):
        user.phoneNumber = request.POST.get('phonenumber')
    if request.POST.get('birthdate'):
        user.birthdate = request.POST.get('birthdate')
    if request.POST.get('city'):
        user.city = request.POST.get('city')
    if request.FILES.get('photo'):
        user.photo = request.FILES.get('photo')
    user.save()
    user_data = {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'gender': user.gender,
                'username': user.username,
                'phonenumber': user.phoneNumber,
                'birthdate': user.birthdate,
                'city': user.city,
                'photo':user.photo.url,
            }
    return Response(user_data, status=200)


@api_view(['POST'])
def logout(request):
    if request.user.is_authenticated:
        logout(request)
        return Response({"detail": "Logged out successfully."})
    return Response({"detail": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

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
        user = found_kid.user
        gender = found_kid.gender
        age = found_kid.age
        location = found_kid.location

        context = {
            'user': user,
            'gender': gender,
            'age': age,
            'location': location,
        }
        return render(request, 'found_kid_details.html', context)
    except FoundKid.DoesNotExist:
        return render(request, 'kid_not_found.html')

@api_view(['POST'])
def get_matching_profiles(request):
    print(request)
    with open('D:\FCAI fourth year (final year)\SafeKids\SafeKids\FaceNet.pkl', 'rb') as f:
        model_data = pickle.load(f)

    mtcnn = model_data['mtcnn']
    resnet = model_data['resnet']

    image = Image.open(request.FILES['photo'])
    image_cropped = mtcnn(image)
    image_embedding = resnet(image_cropped.unsqueeze(0)).flatten().detach().numpy()

    Photos = Photo.objects.all()
    profiles = []
    for photo in Photos:
        db_image = Image.open(photo.photo)
        db_image_cropped = mtcnn(db_image)
        db_image_embedding = resnet(db_image_cropped.unsqueeze(0)).flatten().detach().numpy()
        similarity = 1 - spatial.distance.cosine(image_embedding, db_image_embedding)

        if similarity > 0.5:
            if photo.missing_kid is not None:
                # kid = photo.missing_kid
                kid = {
                    'name': photo.missing_kid.name,
                    'lost_date': photo.missing_kid.lost_date,
                    'last_known_location': photo.missing_kid.last_known_location,
                    'notes': photo.missing_kid.notes,
                    'gender':photo.missing_kid.gender,
                    'similarity' : similarity,
                    'user' : photo.missing_kid.user.id
                }
            else:
                # kid = photo.found_kid
                kid = {
                    'name': photo.found_kid.name,
                    'age': photo.found_kid.age,
                    'gender': photo.found_kid.gender,
                    'location': photo.found_kid.location,
                    'similarity' : similarity
                }

            profile = {
                'kid' : kid,
                'photo' : photo.photo.url
            }
            profiles.append(profile)

    return Response(profiles)

def notifications(request):
    user = request.user
    notifications = Notification.objects.filter(recipient=user).order_by('-timestamp')
    return render(request, 'notifications.html', {'notifications': notifications})