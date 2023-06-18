from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
# from django.contrib.postgres.fields import ArrayField, VectorField

# Create your models here.

class CustomUser(AbstractUser):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    first_name = None
    last_name = None
    USERNAME_FIELD = 'id'
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phoneNumber = models.CharField(max_length=20)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    birthdate = models.DateField(null=False, blank=True)
    city = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='user_photos', blank=True, null=True)


class Kid(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    age = models.IntegerField()


class FoundKid(Kid):
    location = models.CharField(max_length=255)


class MissingKid(Kid):
    lost_date = models.DateField(null=False, blank=True)
    last_known_location = models.CharField(max_length=255)
    still_missing = models.BooleanField()
    notes = models.CharField(max_length=1000, null = True)


class Photo(models.Model):
    kid = models.ForeignKey(Kid, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='user_photos', blank=True, null=True)
    # vector = ArrayField(VectorField(), null=True)


class Notification(models.Model):
    message = models.CharField(max_length=1000)
    time = models.TimeField(auto_now_add=True)