from .views import RegisterAPI
from django.urls import path

urlpatterns = [
    path('app/register/', RegisterAPI.as_view(), name='register'),
]