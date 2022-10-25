

from django.db import models


class Teacher(models.Model):
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    def __str__(self):
        return self.name

