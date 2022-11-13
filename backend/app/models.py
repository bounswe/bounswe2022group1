from statistics import mode
from django.db import models
from django.contrib.auth.models import User


class LearningSpace(models.Model):
    name = models.CharField(max_length=30)
    contributors = models.ManyToManyField(User, related_name='contributors')

    # implicitly existing fields:
    # contents

    # TODO: add chat
    # chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='chat')


class Content(models.Model):
    name = models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    text = models.TextField()
    url = models.TextField()

    # TODO: how does image uploading works? (it is not saved in the database)
    # image = models.ImageField(upload_to='images/')
    

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    learningSpace = models.ForeignKey(LearningSpace, on_delete=models.CASCADE)

    votes = models.IntegerField(default=0)
    
    # TODO: add chat
    # chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='chat')
