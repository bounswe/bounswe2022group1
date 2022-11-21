from urllib import request
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import LearningSpace, Content

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
    class Meta:
        model = LearningSpace
        fields = ["id", "name", "members"]
    
    members = UserSerializer(many=True, read_only=True)


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = ["id", "name", "type", "text", "url", "owner", "learningSpace", "upVoteCount"]

    text = serializers.CharField(max_length=30, default="")
    url = serializers.CharField(max_length=30, default="")
    upVoteCount = serializers.IntegerField(default=0)

    def validate(self, data):
        # TODO: fill each condition with the correct validations. (whether it is really a video, image, etc.)
        if data['type'] == "text":
            if data['text'] == "" or data['url'] != "":
                raise serializers.ValidationError("Type doesn't match the content")
        elif data['type'] == "video":
            if data['url'] == "" or data['text'] != "":
                raise serializers.ValidationError("Type doesn't match the content")
        elif data['type'] == "image":
            if data['url'] == "" or data['text'] != "":
                raise serializers.ValidationError("Type doesn't match the content")
        elif data['type'] == "discussion":
            if data['url'] != "" or data['text'] != "":
                raise serializers.ValidationError("Type doesn't match the content")
        elif data['type'] == "meeting":
            if data['url'] != "" or data['text'] == "":
                raise serializers.ValidationError("Type doesn't match the content")
        else:
            raise serializers.ValidationError("Invalid type value")
        return data

    
    
