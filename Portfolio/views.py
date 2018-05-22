from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.conf import settings
from .apps import ContactForm
import re


# Create your views here.
def home(request):
    context = {}
    template = 'home.html'
    return render(request, template, context)

def projects(request):
    context = {}
    template = 'projects.html'
    return render(request, template, context)

def photography(request):
    context = {}
    template = 'photography.html'
    return render(request, template, context)

def about(request):
    context = {}
    template = 'about.html'
    return render(request, template, context)

def contact(request):
    title = "Contact"
    form = ContactForm(request.POST or None)
    context = {"title": title, "form": form}

    if form.is_valid():
        subject = form.cleaned_data['name'] + " - " + form.cleaned_data['subject']
        emailFrom = form.cleaned_data['from_email']
        message = form.cleaned_data['message']
        emailTo = [settings.EMAIL_HOST_USER]
        if subject and message and emailFrom:
            try:
                send_mail(subject = subject, from_email = emailFrom, recipient_list = emailTo, message = message, fail_silently=False)
                confifrmed_message = "Thanks for the message"
                context = {"title": title, "form": form, "confifrmed_message": confifrmed_message}
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
                return HttpResponseRedirect('/contact/Thanks/')
        else:
            return HttpResponse('Make sure all fields are entered and valid.')

    template = 'contact.html'
    return render(request, "contact.html", context)
