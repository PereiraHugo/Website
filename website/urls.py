from django.urls import path, re_path

from portfolio import views as portfolio_views

urlpatterns = [
    re_path(r'^$', portfolio_views.home, name='home'),
    re_path(r'^projects/$', portfolio_views.projects, name='projects'),
    re_path(r'^projects/cys$', portfolio_views.cys, name='cys'),
    re_path(r'^photography/$', portfolio_views.photography, name='photography'),
    re_path(r'^about/$', portfolio_views.about, name='about'),
    #re_path(r'^contact/$', portfolio_views.contact, name='contact'),
]
