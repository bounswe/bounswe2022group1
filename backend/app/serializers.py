from rest_framework import serializers
from django.contrib.auth.models import User
from .models import LearningSpace, Content, Discussion, Profile,Note, Favorite

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user



class ChangePasswordSerializer(serializers.Serializer):
    model = User

    old_pass = serializers.CharField(required=True)

    new_pass = serializers.CharField(required=True)


class LearningSpaceSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    ls_owner=UserSerializer(read_only=True)
    
    
    class Meta:
        model = LearningSpace
        fields = ["id", "name", "members", "tag", "image", "ls_owner", "description","created_on"]

class LearningSpacePostSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    
    
    
    class Meta:
        model = LearningSpace
        fields = ["id", "name", "members", "tag", "image", "ls_owner", "description","created_on"]
    
 


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = ["id", "name", "type", "text", "url", "owner", "learningSpace", "upVoteCount"]

    text = serializers.CharField(default="")
    url = serializers.CharField(max_length=30, default="")
    upVoteCount = serializers.IntegerField(default=0)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.type = validated_data.get('type', instance.type)
        instance.text = validated_data.get('text', instance.text)
        instance.url = validated_data.get('url', instance.url)
        instance.upVoteCount = validated_data.get('upVoteCount', instance.url)

        instance.save()
        return instance


    def validate(self, data):
        # TODO: fill each condition with the correct validations (whether it is really a video, image, etc.)
        if data['type'] == "text":
            if data.get("text", "") == "":
                raise serializers.ValidationError("Type doesn't match the content")
        elif data['type'] == "video":
            if data.get("url", "") == "":
                raise serializers.ValidationError("Type doesn't match the content")
        elif data['type'] == "image":
            if data.get("url", "") == "":
                raise serializers.ValidationError("Type doesn't match the content")
   
        return data


class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        #fields = '__all__'
        fields = ["id", "content", "owner", "body", "created_on"]
    owner =  UserSerializer()


class DiscussionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        #fields = '__all__'
        fields = ["id", "content", "owner", "body", "created_on"]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        #fields = '__all__'
        fields = ["id", "content", "owner", "body", "created_on"]
    owner =  UserSerializer()


class NotePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        #fields = '__all__'
        fields = ["id", "content", "owner", "body", "created_on"]



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        #fields = '_all_'
        fields = ["id", "about_me", "user", "image"]  
    #image = serializers.FileField()
    #learningspaces = LearningSpaceSerializer(many=True, read_only=True)
class ResetSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)




class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "user", "learningSpace"]
    learningSpace = LearningSpaceSerializer()


class FavoritePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "user", "learningSpace"]

    

    