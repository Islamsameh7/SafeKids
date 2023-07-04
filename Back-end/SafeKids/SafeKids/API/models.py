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
    password_reset_token = models.CharField(max_length=255, blank=True, null=True)
    password_reset_token_expiration = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phoneNumber', 'gender', 'birthdate', 'city']


class AbstractKid(models.Model):
    GENDER_CHOICES = (
        ('male', 'male'),
        ('female', 'female'),
    )
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    birthdate = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)


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
    still_missing = models.BooleanField(default=True)
    birthdate = models.DateField(null=False, blank=False)
    notes = models.CharField(max_length=1000,blank=True, null = True)
    contactNumber = models.CharField(max_length=20)
    
def upload_to(instance, filename):
    # Construct the file path within the 'media' folder
    return 'user_photos/{0}'.format(filename)  

class Photo(models.Model):
    found_kid = models.ForeignKey(FoundKid, on_delete=models.CASCADE, blank=True, null=True)
    missing_kid = models.ForeignKey(MissingKid, on_delete=models.CASCADE, blank=True, null=True)
    photo = models.ImageField(upload_to=upload_to, blank=True, null=True)
  
class Notification(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    kid_id = models.IntegerField()
    kid_type = models.CharField(max_length=255, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)