from django.urls import path
from . import views

urlpatterns = [
    path('', views.authentication.login, name="index"),
]