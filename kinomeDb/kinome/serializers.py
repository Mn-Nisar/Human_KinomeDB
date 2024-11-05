from rest_framework import serializers

from . models import Kinase, Frequency, Domain, DistanceMatrix, Corsstalk , Cptac, Family



class FrequencySerializer(serializers.Serializer):
    site = serializers.CharField()
    frequency = serializers.FloatField()

    class Meta:
        model = Frequency
        fields = ("site","frequency")

class DomainSerializer(serializers.Serializer):
    name = serializers.CharField()
    start = serializers.IntegerField()
    end = serializers.IntegerField()

    class Meta:
        model = Domain
        fields = ("name","start","end")


class CorsstalkSerializer(serializers.Serializer):
    site1 = serializers.CharField()
    site2 = serializers.CharField()
    n_11 = serializers.IntegerField()

    class Meta:
        model = Corsstalk
        fields = ("site1","site2","n_11")


class CptacSerializer(serializers.ModelSerializer): 
    
    class Meta:
        model = Cptac
        fields = ("site","patient","log2fc","cancer")

class FamilySerializer(serializers.ModelSerializer): 
    
    class Meta:
        model = Family
        fields = ("site","score","family","kinase")


    # site = serializers.CharField()
    # patient = serializers.CharField()
    # log2fc = serializers.FloatField()
    # cancer = serializers.CharField(source = 'cancer.cancer')