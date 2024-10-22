from django.urls import path
from . views import FerquencyAPI,CorsstalkAPI
urlpatterns = [
    path('get_freuency/',FerquencyAPI.as_view()),
    path('get_crosstalk/',CorsstalkAPI.as_view()),
]











