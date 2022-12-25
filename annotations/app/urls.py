from .views import *
from django.urls import path


urlpatterns = [
    path('app/annotation/', AnnotationApiView.as_view(), name='annotation'),
    path('app/delete-annotation/', deleteAnnotationAPIView.as_view(), name='delete-annotation'),
]
