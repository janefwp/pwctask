
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import re
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import *
from .serializers import CompanySerializer
from django.conf import settings

import ssl
import pandas as pd
import urllib
import time
import datetime


cvs_url = settings.CSV_FILE_URL


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
    return Response({'companies': serializer.data, 'page': page, 'pages': paginator.num_pages, 'total': paginator.count})


lastModifiedTime = 0


def isCsvUpdated():
    global lastModifiedTime
    req = urllib.request.Request(cvs_url, method='HEAD')
    f = urllib.request.urlopen(req)
    last_modified = f.headers['Last-Modified']
    if last_modified:
        modificationTime = time.mktime(datetime.datetime.strptime(
            last_modified[:-4], "%a, %d %b %Y %H:%M:%S").timetuple())
        if (modificationTime != lastModifiedTime):
            lastModifiedTime = modificationTime
            return True
        else:
            return False


@api_view(['GET'])
def fetchCsvData(request):
    # fix the common issue on macOS.
    # The point is Python 3 no longer counts on MacOS’ openSSL.
    # It depends on its own openSSL bundled which doesn’t have access to MacOS’ root certificates.
    ssl._create_default_https_context = ssl._create_unverified_context
    if (isCsvUpdated() == True):
        df = pd.read_csv(cvs_url)
        for i in range(len(df)):
            Company.objects.update_or_create(id=df.iloc[i][0],
                                             company_name=df.iloc[i][1],
                                             description=df.iloc[i][2],
                                             tagline=df.iloc[i][3],
                                             company_email=df.iloc[i][4],
                                             business_number=df.iloc[i][5],
                                             restricted=df.iloc[i][6])
        return Response('Data loaded')
    else:
        return Response('No change')
