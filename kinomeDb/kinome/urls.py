from django.urls import path
from . views import FerquencyAPI,CorsstalkAPI,CptacAPI

urlpatterns = [
    path('get_freuency/',FerquencyAPI.as_view()),
    path('get_crosstalk/',CorsstalkAPI.as_view()),
    path('get_cptac/',CptacAPI.as_view()),

    
]











