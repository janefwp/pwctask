from django.db import models

# Create your models here.


class Company(models.Model):
    id = models.IntegerField(primary_key=True)
    company_name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    tagline = models.CharField(max_length=100)
    company_email = models.EmailField(max_length=100)
    business_number = models.CharField(max_length=100)
    restricted = models.CharField(max_length=10)

    def __str__(self):
        return self.company_name
