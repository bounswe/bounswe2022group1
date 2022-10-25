from django.shortcuts import render

from django.http import HttpResponse


# views.py
from rest_framework import viewsets

from .serializers import TeacherSerializer
from .models import Teacher


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all().order_by('name')
    serializer_class = TeacherSerializer

