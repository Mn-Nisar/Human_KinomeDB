from django.urls import path
from . views import FerquencyAPI
urlpatterns = [
    path('get_freuency/',FerquencyAPI.as_view()),

]











