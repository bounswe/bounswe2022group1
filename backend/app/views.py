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
from .serializers import ContentSerializer, UserSerializer, RegisterSerializer, DiscussionPostSerializer
from .serializers import ChangePasswordSerializer, LearningSpaceSerializer, DiscussionSerializer, ProfileSerializer,ProfilePostSerializer,ResetSerializer,LearningSpacePostSerializer
from .models import Content, LearningSpace, Discussion, Profile
from .serializers import *
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

from .helpers import send_forget_password_mail,get_random_string





# Register API
class Register(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        

        data=request.data

        given_email= data["email"]

        try:
            validate_email(given_email)
        except ValidationError as e:
            print("Bad email, details:", e)
        

        if User.objects.filter(email=given_email).exists():
            return Response({"message": "Given email has already been used. Please try another email"}, status=status.HTTP_400_BAD_REQUEST)

        serialization = self.get_serializer(data=data)
        
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
    serializer_class2=LearningSpacePostSerializer
    
    
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
      
        data = request.data.copy()
        data['ls_owner'] = request.user.id


        

        

        
    

        serializer = self.serializer_class2(data=data)
        if serializer.is_valid():
            serializer.save()
            ls = LearningSpace.objects.get(id=serializer.data['id'])
            ls.members.add(request.user)
         
            serializer = self.serializer_class2(ls)
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
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
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

            if (Profile.objects.filter(user=request.user).exists()):
                profile_obj=Profile.objects.get(user=request.user)
                new_learningspaces = LearningSpace.objects.filter(members__id=request.user.id)
                profile_obj.learningspaces.set(new_learningspaces)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given learning space id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

class leaveApiView(APIView):
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
            ls.members.remove(request.user)
            serializer = self.serializer_class(ls)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given learning space id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


class discussionApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DiscussionPostSerializer

    def post(self, request, *args, **kwargs):
        
        data = request.data.copy()
        

        data['owner'] = request.user.id
       

        # TODO: check wheter the given learning space id exists and user is a member of it

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class discussionApiListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DiscussionSerializer

    def get(self, request, *args, **kwargs):
        try:
            content_id = int(request.GET.get('content_id'))
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            content = Content.objects.get(id=content_id)
            discussions = content.discussions.all()
            serializer = self.serializer_class(discussions, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given content id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)







class noteApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NoteSerializer
    serializer_class_post = NotePostSerializer

    def post(self, request, *args, **kwargs):
        
        data = request.data.copy()
        

        data['owner'] = request.user.id
       

        # TODO: check wheter the given learning space id exists and user is a member of it

        serializer = self.serializer_class_post(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        try:
            content_id = int(request.GET.get('content_id'))
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            content = Content.objects.get(id=content_id)
            note = content.note.all()
            serializer = self.serializer_class(note, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given content id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    



class profileApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfilePostSerializer
    serializer_class1 = ProfileSerializer

    def post(self, request, *args, **kwargs):
        
        data = request.data.copy()
        

        data['user'] = request.user.id
        learningspaces=LearningSpace.objects.filter(members__id=request.user.id)
        list=[]
        for i in learningspaces:
            list.append(i.id)

        data["learningspaces"] = list
        print(list)
       

        # TODO: check wheter the given learning space id exists and user is a member of it

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        try:
            user_id = int(request.GET.get('user_id', request.user.id))
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            profile = Profile.objects.get(user=user_id)
            
            serializer = self.serializer_class1(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given content id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


class LearningSpaceListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LearningSpaceSerializer
    
    
    def get(self, request, *args, **kwargs):
        try:
            ls = LearningSpace.objects.all()
            serializer = self.serializer_class(ls, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

class EnrolledLearningSpaceApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LearningSpaceSerializer
    
    
    def get(self, request, *args, **kwargs):
        
        try:
            ls=LearningSpace.objects.filter(members__id=request.user.id)
            serializer = self.serializer_class(ls, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given user doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)



class LearningSpaceSearchApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LearningSpaceSerializer
    
    
    def get(self, request, *args, **kwargs):
        try:
            search_parameter = request.GET.get('search_parameter')
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            ls = LearningSpace.objects.filter(name__icontains=search_parameter)
            serializer = self.serializer_class(ls, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)



class LearningSpaceTagSearchApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LearningSpaceSerializer
    
    
    def get(self, request, *args, **kwargs):
        try:
            tag = request.GET.get('tag')
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            ls = LearningSpace.objects.filter(tag__icontains=tag)
            serializer = self.serializer_class(ls, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except LearningSpace.DoesNotExist:
            return Response({"message": "given id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

class forgetpasswordApiView(APIView):
    # add permission to check if user is authenticated
    serializer_class = ResetSerializer

    def post(self, request, *args, **kwargs):
        try:
            
            get_email= request.data.copy()
            get_email=get_email["email"]
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        
        
        if not User.objects.filter(email=get_email).exists():
            return Response({"message": "given email doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
        else: 
            u= User.objects.get(email=get_email)
            new_pass=get_random_string(10)
            u.set_password(new_pass)
            u.save()
            #print(new_pass)
            #print(get_email)
            send_forget_password_mail(get_email, new_pass )
            return Response({"message": "your password is sent to your email"}, status=status.HTTP_200_OK)




       