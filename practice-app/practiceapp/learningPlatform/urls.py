from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.authentication.login, name="index"),
    path('student/',views.student.student,name="student")
]
