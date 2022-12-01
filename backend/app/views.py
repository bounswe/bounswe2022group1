from django.http import QueryDict
from rest_framework import generics, permissions, status, generics, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated   
from rest_framework.views import APIView
from django.contrib.auth import login
from django.contrib.auth.models import User
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .serializers import ContentSerializer, UserSerializer, RegisterSerializer
from .serializers import ChangePasswordSerializer, LearningSpaceSerializer
from .models import Content, LearningSpace







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

class LearningSpaceApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LearningSpaceSerializer
    
    
    def get(self, request, *args, **kwargs):
        try:
            learning_space_id = int(request.GET.get('id'))
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            ls = LearningSpace.objects.get(id=learning_space_id)
            serializer = self.serializer_class(ls)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
            
        

    # TODO: add the owner to members of the created learning space
    def post(self, request, *args, **kwargs):
        '''
        Create the Todo with given todo data
        '''
        data = {
            'name': request.data.get('name')
        }
    

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class contentApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ContentSerializer
    
    # TODO: check wheter user is a member of the learning space
    def get(self, request, *args, **kwargs):
        try:
            content_id = int(request.GET.get('id'))
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            c = Content.objects.get(id=content_id)
            serializer = self.serializer_class(c)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Content.DoesNotExist:
            return Response({"message": "given id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
            
        

   
    def post(self, request, *args, **kwargs):

        data = request.data.copy()
        data['owner'] = request.user.id

        # TODO: check wheter the given learning space id exists and user is a member of it

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, *args, **kwargs):
        data = request.data.copy()

        try:
            content_id = int(data['id'])
        except ValueError:
            return Response({"error": "given id is not an integer"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            content = Content.objects.get(id=content_id)
        except Content.DoesNotExist:
            return Response({"error": "given id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

        if content.owner != request.user: 
            return Response({"error": "you are not the owner of this content"}, status=status.HTTP_400_BAD_REQUEST)       

        # Those fields are needed to validate data because Content exceptionally has a custom validate() function.
        if 'type' not in data:
            data['type'] = content.type
        if 'text' not in data:
            data['text'] = content.text
        if 'url' not in data:
            data['url'] = content.url

        serializer = self.serializer_class(content, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class contentListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ContentSerializer

    # TODO: add pagination
    def get(self, request, *args, **kwargs):
        try:
            learning_space_id = int(request.GET.get('learning_space_id'))
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            ls = LearningSpace.objects.get(id=learning_space_id)
            contents = ls.content_set.all()
            serializer = self.serializer_class(contents, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given learning space id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)



class enrollApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LearningSpaceSerializer

    def post(self, request, *args, **kwargs):
        try:
            learning_space_id = int(request.data.get('learning_space_id'))
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            ls = LearningSpace.objects.get(id=learning_space_id)
            ls.members.add(request.user)
            serializer = self.serializer_class(ls)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given learning space id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)