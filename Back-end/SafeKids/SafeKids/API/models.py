from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
# from django.contrib.postgres.fields import ArrayField, VectorField

# Create your models here.

class CustomUser(AbstractUser):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    first_name = None
    last_name = None
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phoneNumber = models.CharField(max_length=20)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    birthdate = models.DateField(null=False, blank=True)
    city = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='user_photos', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phoneNumber', 'gender', 'birthdate', 'city']


class AbstractKid(models.Model):
    GENDER_CHOICES = (
        ('male', 'male'),
        ('female', 'female'),
    )
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    age = models.IntegerField()

    class Meta:
        abstract = True


class Kid(AbstractKid):
    pass


class FoundKid(AbstractKid):
    location = models.CharField(max_length=255)
    name = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=6, choices=AbstractKid.GENDER_CHOICES, blank=True,null=True)
    age = models.IntegerField(blank=True, null=True)
        
class MissingKid(AbstractKid):

    lost_date = models.DateField(null=False, blank=True)
    last_known_location = models.CharField(max_length=255)
    still_missing = models.BooleanField()
    notes = models.CharField(max_length=1000,blank=True, null = True)


class Photo(models.Model):
    found_kid = models.ForeignKey(FoundKid, on_delete=models.CASCADE, blank=True, null=True)
    missing_kid = models.ForeignKey(MissingKid, on_delete=models.CASCADE, blank=True, null=True)
    photo = models.ImageField(upload_to='user_photos', blank=True, null=True)

    # vector = ArrayField(VectorField(), null=True)


class Notification(models.Model):
    message = models.CharField(max_length=1000)
    time = models.TimeField(auto_now_add=True)