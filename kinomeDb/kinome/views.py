from django.db.models import Prefetch
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes
from django.db import connection
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.views import APIView

from .models import Kinase , Frequency, Domain , DistanceMatrix , Corsstalk , Cptac, Family , FamName
from .serializers import FrequencySerializer , DomainSerializer , CorsstalkSerializer , CptacSerializer ,FamilySerializer

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
                serializer = CorsstalkSerializer(crosstalk, many = True)
                return Response(serializer.data)
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
    def get(self, request):
        kinase = request.GET.get('kinase')
        if kinase:
            try:
                print("cp")
                cptac = Cptac.objects.filter(kinase__kinase=kinase)
                # print(cptac)
                serializer = CptacSerializer(cptac, many = True)
                # print(serializer.data)
                return Response(serializer.data)
            except Exception as e:
                return Response({'error': e}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide Valid kinase name'}, status=status.HTTP_404_NOT_FOUND)

# Some Sheera plot
class FamilyAPI(APIView):
    def get(self, request):
        kinase = request.GET.get('kinase')
        if kinase:
            try:
                # Define the raw SQL query
                raw_query = """
                SELECT * FROM kinome_family WHERE family_id IN (
                    SELECT DISTINCT family_id FROM kinome_family WHERE kinase_id=%s
                )
                """
                # Execute the raw query with parameter substitution
                family = Family.objects.raw(raw_query, [kinase])
                
                # Since `.raw()` returns an iterable, you may need to convert it to a list for serialization
                serializer = FamilySerializer(list(family), many=True)
                
                return Response(serializer.data)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Please provide a valid kinase name'}, status=status.HTTP_404_NOT_FOUND)
# class ConservationAPI(APIView):
