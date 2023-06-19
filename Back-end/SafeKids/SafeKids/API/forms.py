from django import forms
from .models import FoundKid

class FoundKidForm(forms.ModelForm):
    class Meta:
        model = FoundKid
        fields = ['user', 'name', 'gender', 'age', 'location']