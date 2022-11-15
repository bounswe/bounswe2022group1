from rest_framework import generics, permissions, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated   
from django.contrib.auth import login
from django.contrib.auth.models import User
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .serializers import UserSerializer, RegisterSerializer
from .serializers import ChangePasswordSerializer





# Register API
class Register(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serialization = self.get_serializer(data=request.data)
        
        serialization.is_valid(raise_exception=True)
        
        user = serialization.save()

        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


#Login api giving the login functionality
class Login(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, req):
        
        serialization = AuthTokenSerializer(data=req.data)
        serialization.is_valid(raise_exception=True)
        
        user = serialization.validated_data['user']
        
        login(req, user)
        
        return super(Login, self).post(req, format=None)


class ChangePassword(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        obj = self.request.user
        return obj

    def update(self, req):
        self.object = self.get_object()
        serialization = self.get_serializer(data=req.data)

        if serialization.is_valid():
            
            #controll the old password
            if not self.object.check_password(serialization.data.get("old_pass")):

                return Response({"old_pass": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            
            #assign the password
            self.object.set_password(serialization.data.get("new_pass"))

            self.object.save()
            resp = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully'
            }
            

            return Response(resp)
        else:
            return Response(serialization.errors, status=status.HTTP_400_BAD_REQUEST)

