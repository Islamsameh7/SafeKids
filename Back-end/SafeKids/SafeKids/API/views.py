import datetime
from django.forms import ValidationError
from django.shortcuts import render, redirect
from django.urls import path
from django.http import HttpResponse
from torch import cosine_similarity
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
from django.contrib import messages
from django.shortcuts import redirect
from datetime import date
from django.core.mail import send_mail
from django.contrib import messages
from django.shortcuts import render, redirect
import uuid
from django.utils import timezone
from django.template.loader import render_to_string
from django.conf import settings
from django.core import serializers
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
                'name': user.name,
                'gender': user.gender,
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

def send_forget_password_mail(user):
    reset_link = f'https://{settings.NGROK_HOST}/reset?userId={user.id}&token={user.password_reset_token}'
    email_subject = 'Password Reset Request'
    email_body = f'Please click on the link below to change your password:\n{reset_link}'
    send_mail(email_subject, email_body, settings.EMAIL_HOST_USER, [user.email])
    return HttpResponse('Email has been sent. Check your email.', status=200)

@csrf_exempt
@api_view(['POST'])
def forgot_password(request):
    print(request.body)
    print(request.data.get("email"))
    email = request.data.get("email")
    User = get_user_model()
    users = User.objects.filter(email=email)
    print(users)
    if users.exists():
        user = User.objects.get(email=email)
        token = str(uuid.uuid4())
        user.password_reset_token = token
        user.password_reset_token_expiration = timezone.now() + timezone.timedelta(hours=1)
        user.save()
        send_forget_password_mail(user)
        return HttpResponse('Email has been sent. Check your email.', status=200)
    else:
        print(email)
        return HttpResponse('User with this email does not exist.', status=400)



@api_view(['POST'])
def password_reset(request, user_id, token):
    try:
        user = CustomUser.objects.get(pk=user_id)
        if user.password_reset_token == token and user.password_reset_token_expiration > timezone.now():
            new_password = request.POST['new_password']
            confirm_password = request.POST['confirm_password']
            if new_password == confirm_password:
                user.set_password(new_password)
                user.password_reset_token = ''
                user.password_reset_token_expiration = None
                user.save()
                return HttpResponse('Your password has been reset successfully.', status=200)
            
            else:
                return HttpResponse('Password does not match.', status=400)
        else:
            return HttpResponse('Invalid or expired password reset link.', status=404)

    except CustomUser.DoesNotExist:
        return HttpResponse('User does not exist.', status=404)

@api_view(['POST'])
def edit_user(request):

    user = CustomUser.objects.get(id=request.POST.get('user_id')).first

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
        'photo': user.photo.url,
    }
    return Response(user_data, status=200)


@api_view(['POST'])
def edit_kid(request):

    kid = MissingKid.objects.get(id=request.POST.get('kid_id'))

    if request.POST.get('name'):
        kid.name = request.POST.get('name')
    if request.POST.get('birthdate'):
        kid.birthdate = request.POST.get('birthdate')
    if request.POST.get('lostDate'):
        kid.lost_date = request.POST.get('lostDate')
    if request.POST.get('lastKnownLocation'):
        kid.last_known_location = request.POST.get('lastKnownLocation')

    kid.save()

    return Response(status=200)


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


@api_view(['POST'])
def get_my_kids(request):
    missing_kids = MissingKid.objects.filter(
        user_id=request.POST.get('user_id'))
    user = CustomUser.objects.get(
        id=request.POST.get('user_id'))
    
    kids = []
    
    for kid in missing_kids:
        kidPhotos = []
        for photo in photos:
            kidPhotos.append(photo.photo.url)
        photos = Photo.objects.filter(missing_kid=kid)
        photo = photos.first() if photos.exists() else None
        birthdate = date.fromisoformat(kid.birthdate.strftime("%Y-%m-%d"))
        age = 2023 - birthdate.year
        kid_data = {
            'name': kid.name,
            'id': kid.id,
            'birthdate': kid.birthdate,
            'age':age,
            'gender': kid.gender,
            'lost_date': kid.lost_date,
            'last_known_location': kid.last_known_location,
            'still_missing': kid.still_missing,
            'notes': kid.notes,
            'parentPhone': user.phoneNumber,
            'parentEmail': user.email,
            'user': user.id,
        }
        profile={
            'kid':kid_data,
            'photo':photo.photo.url,
            'photos':kidPhotos,

        }
    
        kids.append(profile)
      
    return Response(kids)


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


def set_match_kid_profile(photo, similarity):
    if photo.missing_kid is not None:
        # kid = photo.missing_kid
        kid = {
            'id': photo.missing_kid.id,
            'name': photo.missing_kid.name,
            'birthdate': photo.missing_kid.birthdate,
            'lost_date': photo.missing_kid.lost_date,
            'last_known_location': photo.missing_kid.last_known_location,
            'notes': photo.missing_kid.notes,
            'gender': photo.missing_kid.gender,
            'similarity': similarity,
            'user': photo.missing_kid.user.id,
            'contact_phone': photo.missing_kid.user.phoneNumber,
            'contact_email': photo.missing_kid.user.email,
        }
    else:
        # kid = photo.found_kid
        kid = {
            'id': photo.found_kid.id,
            'name': photo.found_kid.name,
            'age': photo.found_kid.age,
            'gender': photo.found_kid.gender,
            'location': photo.found_kid.location,
            'similarity': similarity
        }
    return kid

@api_view(['POST'])
def get_matching_profiles(request):
    print(request)
    with open('D:\FCAI\GRAD Project\SafeKids\Face Recognition Model\FaceNet.pkl', 'rb') as f:
        model_data = pickle.load(f)

    preprocessing = model_data['preprocessing']
    similarity = model_data['similarity']

    if request.POST.get('type') == 'upload':
        Photos = Photo.objects.filter(missing_kid__isnull=False)
        kid_type = 'found'
    else:
        Photos = Photo.objects.filter(found_kid__isnull=False)
        kid_type = 'missing'

    bestSimilarity = 0

    photos = request.POST.getlist('photos')
    profiles = []
    for photo in photos:

        image_embedding = preprocessing(photo)

        for i, db_photo in enumerate(Photos):
            db_image_embedding = preprocessing(db_photo.photo)
            similarity = similarity(image_embedding, db_image_embedding)

            if i == 0:
                previous_missing_kid_id = db_photo.missing_kid.id

            if similarity > bestSimilarity and db_photo.missing_kid.id == previous_missing_kid_id and similarity > 0.5:
                bestSimilarity = similarity

                kid = set_match_kid_profile(db_photo, similarity)

            elif similarity > 0.5:
                kid = set_match_kid_profile(db_photo, similarity)

                previous_missing_kid_id = db_photo.missing_kid.id

            profile = {
                'kid': kid,
                'photo': db_photo.photo.url,
            }
            if profile not in profiles:
                profiles.append(profile)

    new_kid_id = request.POST.get('kid_id')
    for i in profiles:
        kid = profile['kid']
        send_notification(user = kid['user'], name = kid['name'], kidId = new_kid_id, kidType = kid_type)

    return Response(profiles)

def send_notification(user,name,kidId,kidType):
    user = CustomUser.objects.get(id=user)

    if kidType == 'found':
        message = 'Your missing kid ' + name + ' appeared in a match.\n click here to see the match.'
    else:
        message = 'The kid you found appeared in a match.\n click here to see the match.'

    notification = Notification(user=user, message=message, kid_id=kidId, kid_type=kidType)
    notification.save()
    return Response({'message': 'Notification sent', 'notification' : notification.message}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_user_notifications(request):
    user = CustomUser.objects.get(id=request.data.get('user'))
    notifications_list = Notification.objects.filter(user=user)

    notifications = []
    for x in notifications_list:
        time_difference = timezone.now() - x.timestamp
        if time_difference.total_seconds() < 60:
            time = int(time_difference.total_seconds())
            time = f"{time} seconds ago"
        elif time_difference.total_seconds() < 3600:
            time = int(time_difference.total_seconds() / 60)
            time = f"{time} minutes ago"
        elif time_difference.total_seconds() < 86400:
            time = int(time_difference.total_seconds() / 3600)
            time = f"{time} hours ago"
        else:
            time = int(time_difference.total_seconds() / 86400)
            time = f"{time} days ago"
            
        notification = {
            'user' : x.user.id,
            'message' : x.message,
            'kid_id' : x.kid_id,
            'kid_type' : x.kid_type,
            'timestamp' : time,
            'is_read' : x.is_read
        }
        notifications.append(notification) 

    return Response(notifications, content_type='application/json')

@api_view(['PUT'])
def read_notification(request):
    notification = Notification.objects.get(id=request.data.get('id'))
    notification.is_read = True
    notification.save()

    if notification.kid_type == 'found':
        kid_obj = FoundKid.objects.get(id=notification.kid_id)
        
        kid = {
                'id': kid_obj.id,
                'name': kid_obj.name,
                'age': kid_obj.age,
                'gender': kid_obj.gender,
                'location': kid_obj.location,
                'contact_phone': kid_obj.user.phoneNumber,
                'contact_email': kid_obj.user.email,
        }
    else:
        kid_obj = MissingKid.objects.get(id=notification.kid_id)

        kid = {
                'id': kid_obj.id,
                'name': kid_obj.name,
                'birthdate': kid_obj.birthdate,
                'lost_date': kid_obj.lost_date,
                'last_known_location': kid_obj.last_known_location,
                'notes': kid_obj.notes,
                'gender': kid_obj.gender,
                'user': kid_obj.user.id,
                'contact_phone': kid_obj.user.phoneNumber,
                'contact_email': kid_obj.user.email,
            }
                
    return Response({'kid': kid}, status=status.HTTP_200_OK)