from django.urls import path
from . import views

urlpatterns = [
    path('', views.main.index, name="index"),
    path('student',views.views.student,name="student"),
]
