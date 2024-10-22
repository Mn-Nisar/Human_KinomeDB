from rest_framework import serializers

from . models import Kinase, Frequency, Domain, DistanceMatrix, Corsstalk



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
