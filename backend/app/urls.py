from .views import Register
from .views import Login
from django.urls import path
from knox import views as knox_views
from django.urls import path
from .views import ChangePassword,LearningSpaceApiView, LearningSpaceListApiView, LearningSpaceSearchApiView,profileApiView, LearningSpaceTagSearchApiView,forgetpasswordApiView,leaveApiView
from .views import *


urlpatterns = [
    path('app/register/', Register.as_view(), name='register'),
    path('app/login/', Login.as_view(), name='login'),
    path('app/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('app/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('app/change-password/', ChangePassword.as_view(), name='change-password'),
    path('app/learning-space/', LearningSpaceApiView.as_view(), name='learning-space'),
    path('app/content/', contentApiView.as_view(), name='content'),
    path('app/content-list/', contentListApiView.as_view(), name='content-list'),
    path('app/enroll/', enrollApiView.as_view(), name='enroll'),
    path('app/discussion/', discussionApiView.as_view(), name='discussion'),
    path('app/discussion-list/', discussionApiListView.as_view(), name='discussion-list'),
    path('app/profile/', profileApiView.as_view(), name='profile'),
    path('app/learning-space-list/', LearningSpaceListApiView.as_view(), name='learning-space-list'),
    path('app/learning-space-search/', LearningSpaceSearchApiView.as_view(), name='learning-space-search'),
    path('app/learning-space-tag-search/', LearningSpaceTagSearchApiView.as_view(), name='learning-space-tag-search'),
    path('app/forget-password/' , forgetpasswordApiView.as_view() , name="forget_password"),
    path('app/leave-learning-space/', leaveApiView.as_view(), name='leave-learning-space'),
    path('app/enrolled-learning-spaces/', EnrolledLearningSpaceApiView.as_view(), name='enrolled-learning-spaces'),
    path('app/note/', noteApiView.as_view(), name='note'),
    path('app/user-from-id/', userNamefromIDAPIView.as_view(), name='user-from-id'),
    path('app/favorite/', favoriteLearningSpaceAPIView.as_view(), name='favorite'),
    path('app/unfavorite/', disFavoriteAPIView.as_view(), name='unfavorite'),


    
    


]