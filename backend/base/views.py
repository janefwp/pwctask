
from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import CompanySerializer


@api_view(['GET'])
def getCompany(request, pk):
    print("id=", pk)
    company = Company.objects.filter(business_number=pk)
    serialzer = CompanySerializer(company, many=True)
    return Response(serialzer.data)


@api_view(['GET'])
def getRestrictedCompanies(request):
    print("get restrictedcompany")
    companies = Company.objects.filter(restricted="Yes")
    serialzer = CompanySerializer(companies, many=True)
    return Response(serialzer.data)
