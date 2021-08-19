import urllib
import ssl
import pandas as pd
from base.models import Company
import time
import datetime


def run():
    # fix the common issue on macOS.
    # The point is Python 3 no longer counts on MacOS’ openSSL.
    # It depends on its own openSSL bundled which doesn’t have access to MacOS’ root certificates.
    ssl._create_default_https_context = ssl._create_unverified_context
    req = urllib.request.Request(
        "https://storage.googleapis.com/snappy-recruitment-test/faux_id_fake_companies.csv", method='HEAD')
    f = urllib.request.urlopen(req)
    print(f)
    last_modified = f.headers['Last-Modified']
    print(last_modified[:-4])
    modificationTime = time.mktime(datetime.datetime.strptime(
        last_modified[:-4], "%a, %d %b %Y %H:%M:%S").timetuple())

    print(modificationTime)

    # last_modified = response.headers.get('Last-Modified')
    # if last_modified:
    #     last_modified = dateutil.parser.parse(last_modified)

    # url = "https://storage.googleapis.com/snappy-recruitment-test/faux_id_fake_companies.csv"
    # df = pd.read_csv(url)

    # for i in range(len(df)):
    #     Company.objects.update_or_create(id=df.iloc[i][0],
    #                                      company_name=df.iloc[i][1],
    #                                      description=df.iloc[i][2],
    #                                      tagline=df.iloc[i][3],
    #                                      company_email=df.iloc[i][4],
    #                                      business_number=df.iloc[i][5],
    #                                      restricted=df.iloc[i][6])
