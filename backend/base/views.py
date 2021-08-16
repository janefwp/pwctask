
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import CompanySerializer
import re


def is_businessNumber_valid(string):
    charRe = re.compile(r'[^-0-9]')
    str = charRe.search(string)
    return not bool(str)


@api_view(['GET'])
def getCompany(request, pk):
    print("id=", pk)
    if(is_businessNumber_valid(pk)):
        company = Company.objects.filter(business_number=pk)
        serialzer = CompanySerializer(company, many=True)
        return Response(serialzer.data)
    else:
        message = {'detail: Business number only contain - and numbers'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getRestrictedCompanies(request):
    print("get restrictedcompany")
    companies = Company.objects.filter(restricted="Yes")
    serialzer = CompanySerializer(companies, many=True)
    return Response(serialzer.data)
