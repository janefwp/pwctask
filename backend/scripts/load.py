
import ssl
import pandas as pd
from base.models import Company


def run():
    # fix the common issue on macOS.
    # The point is Python 3 no longer counts on MacOS’ openSSL.
    # It depends on its own openSSL bundled which doesn’t have access to MacOS’ root certificates.
    ssl._create_default_https_context = ssl._create_unverified_context
    url = "https://storage.googleapis.com/snappy-recruitment-test/faux_id_fake_companies.csv"
    df = pd.read_csv(url)

    for i in range(len(df)):
        Company.objects.update_or_create(id=df.iloc[i][0],
                                         company_name=df.iloc[i][1],
                                         description=df.iloc[i][2],
                                         tagline=df.iloc[i][3],
                                         company_email=df.iloc[i][4],
                                         business_number=df.iloc[i][5],
                                         restricted=df.iloc[i][6])
