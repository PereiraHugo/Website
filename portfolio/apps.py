from django.apps import AppConfig
from django import forms

class portfolioConfig(AppConfig):
    name = 'portfolio'

class ContactForm(forms.Form):
	name = forms.CharField(required=True, max_length=100, label="Name:",)
	from_email = forms.EmailField(required=True, label="Email address:",max_length=254)
	subject = forms.CharField(required=False, max_length=100, label="Subject:",)
	message = forms.CharField(widget=forms.Textarea, required=True, label ="Message:")