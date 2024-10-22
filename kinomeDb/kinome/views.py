from django.db.models import Prefetch
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.views import APIView

from .models import Kinase , Frequency, Domain , DistanceMatrix , Corsstalk
from .serializers import FrequencySerializer , DomainSerializer

class KinaseAPI(APIView):
    permission_classes = (AllowAny,)

    def get(self,request):
        pass

class FerquencyAPI(APIView):
    permission_classes = (AllowAny,)

    def get(self,request):
        print(request.GET) 
        kinase = request.GET.get('kinase')
        if kinase:
            fasta = Kinase.objects.get(kinase=kinase).fasta
            domain = Domain.objects.filter(kinase__kinase=kinase)
            domain_serializer =  DomainSerializer(domain, many = True)

            frequency = Frequency.objects.filter(kinase__kinase = kinase)
            frequency_serializer = FrequencySerializer(frequency, many = True)
            response_data = {
                "fasta":fasta,
                "domain":domain_serializer.data,
                "frequency": frequency_serializer.data
            }
            return Response(response_data)
        else:
            return Response({'error': 'Please provide Valid kinase name'}, status=status.HTTP_404_NOT_FOUND)
    