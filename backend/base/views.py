
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import re
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import *
from .serializers import CompanySerializer


def is_businessNumber_valid(string):
    charRe = re.compile(r'[^-0-9]')
    str = charRe.search(string)
    return not bool(str)


@api_view(['GET'])
def getCompany(request, pk):
    if(is_businessNumber_valid(pk)):
        company = Company.objects.filter(business_number=pk)
        serializer = CompanySerializer(company, many=True)
        return Response(serializer.data)
    else:
        message = {'detail: Business number only contain - and numbers'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getRestrictedCompanies(request):
    companies = Company.objects.filter(restricted="Yes")
    page = request.query_params.get('page')
    paginator = Paginator(companies, 100)
    try:
        companies = paginator.page(page)
    except PageNotAnInteger:
        companies = paginator.page(1)
    except EmptyPage:
        companies = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)

    serializer = CompanySerializer(companies, many=True)
    return Response({'companies': serializer.data, 'page': page, 'pages': paginator.num_pages})
