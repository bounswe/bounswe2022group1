from .views import Register
from .views import Login
from django.urls import path
from knox import views as knox_views
from django.urls import path
from .views import ChangePassword,LearningSpaceApiView


urlpatterns = [
    path('app/register/', Register.as_view(), name='register'),
    path('app/login/', Login.as_view(), name='login'),
    path('app/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('app/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('app/change-password/', ChangePassword.as_view(), name='change-password'),
    path('app/learning-space/', LearningSpaceApiView.as_view(), name='learning-space'),

]