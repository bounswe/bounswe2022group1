# serializers.py
from rest_framework import serializers

from .models import Teacher

class TeacherSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Teacher
        fields = ('name', 'surname')