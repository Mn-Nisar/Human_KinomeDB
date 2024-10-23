from django.db.models import Prefetch
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.views import APIView

from .models import Kinase , Frequency, Domain , DistanceMatrix , Corsstalk
from .serializers import FrequencySerializer , DomainSerializer , CorsstalkSerializer

class KinaseAPI(APIView):
    permission_classes = (AllowAny,)

    def get(self,request):
        pass

class FerquencyAPI(APIView):

    permission_classes = (AllowAny,)

    def get(self,request):

        kinase = request.GET.get('kinase')
        if kinase:
            try:
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
            except Exception as e:
                return Response({'error': e}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide Valid kinase name'}, status=status.HTTP_404_NOT_FOUND)



class CorsstalkAPI(APIView):
    permission_classes = (AllowAny,)

    def get(self,request):
        kinase = request.GET.get('kinase')
        if kinase:
            try:
                crosstalk = Corsstalk.objects.filter(kinase__kinase=kinase)
                serilaizer = CorsstalkSerializer(crosstalk, many = True)
                print(serilaizer.data)
                return Response(serilaizer.data)
            except Exception as e:
                return Response({'error': e}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide Valid kinase name'}, status=status.HTTP_404_NOT_FOUND)

# class DistanceMatrixAPI(APIView):
#     permission_classes = (AllowAny,)

#     def get(request):

#         kinase = request.GET.get("kinase")
#         print(kinase)

#         if kinase:
#             try:


# reverse bar plot for each cnacer
class CptacAPI(APIView):
    pass

# Some Sheera plot
class ConservationAPI(APIView):
    pass