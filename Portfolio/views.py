from django.shortcuts import render

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
    context = {}
    template = 'contact.html'
    return render(request, template, context)
