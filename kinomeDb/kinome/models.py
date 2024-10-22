from django.db import models

class Kinase(models.Model):
    kinase = models.CharField(primary_key=True, unique=True, max_length=25)
    accession = models.CharField(max_length=255) 
    fasta = models.TextField()

    def __str__(self):
        return (self.kinase)

class Frequency(models.Model):
    kinase = models.ForeignKey(Kinase, on_delete=models.CASCADE, related_name='frequncy_kinase')
    site = models.CharField(max_length=255)
    frequency = models.IntegerField()


class Domain(models.Model):
    kinase = models.ForeignKey(Kinase, on_delete=models.CASCADE, related_name='domains_kinase')
    name = models.CharField(max_length=100)
    start = models.IntegerField()
    end = models.IntegerField()

    # def __str__(self):
    #     return f'{self.kinase} ({self.start}-{self.end})'

class DistanceMatrix(models.Model):
    kinase = models.ForeignKey(Kinase, on_delete=models.CASCADE, related_name='distance_matrix_kinase')
    site1 = models.CharField(max_length=25)
    site2 = models.CharField(max_length=25)
    distance = models.DecimalField(max_digits=50, decimal_places=25)

    def __str__(self):
        return f'{self.kinase} ({self.site1}-{self.site2}) - {self.distance}'
    
class Corsstalk(models.Model):
    site1 = models.CharField(max_length=25)
    site2 = models.CharField(max_length=25)
    n_00 = models.IntegerField()
    n_01 = models.IntegerField()
    n_10 = models.IntegerField()
    n_11 = models.IntegerField()
    p_value = models.FloatField()
    kinase = models.ForeignKey(Kinase, on_delete=models.CASCADE, related_name='crosstalk_kinase')
    function_site1 = models.CharField(max_length=255, null=True, blank=True)
    function_site2 = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f'{self.kinase} ({self.site1}-{self.site2}) - {self.p_value}'