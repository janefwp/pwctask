from django.urls import path
from . import views

urlpatterns = [
    path('companies/', views.getRestrictedCompanies,
         name="getRestrictedCompanies"),
    path('companies/<str:pk>/', views.getCompany, name="getCompanybyNumber")
]
