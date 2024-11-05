from django.urls import path
from . views import FerquencyAPI,CorsstalkAPI,CptacAPI,FamilyAPI

urlpatterns = [
    path('get_freuency/',FerquencyAPI.as_view()),
    path('get_crosstalk/',CorsstalkAPI.as_view()),
    path('get_cptac/',CptacAPI.as_view()),
    path('get_family/',FamilyAPI.as_view()),
   
    
]











