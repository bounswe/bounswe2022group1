from rest_framework import serializers
from .models import Annotation

# Annotation Serializer
class AnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = ('id', 'content_id', 'annotation_string')

