from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.authentication.login, name="index"),
    path('student/',views.student.student, name="student"),
    path('login/query/', views.authentication.loginQuery, name="loginQuery"),
    path('logout/query/', views.authentication.logoutQuery, name="logoutQuery")
]
