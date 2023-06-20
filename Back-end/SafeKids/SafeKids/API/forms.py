from django import forms
from .models import FoundKid
from .models import MissingKid

class FoundKidForm(forms.ModelForm):
    class Meta:
        model = FoundKid
        fields = ['user', 'name', 'gender', 'age', 'location']
        
class MissingKidForm(forms.ModelForm):
    class Meta:
        model = MissingKid
        fields = ['user', 'name', 'gender', 'age', 'lost_date','last_known_location','still_missing','notes']        