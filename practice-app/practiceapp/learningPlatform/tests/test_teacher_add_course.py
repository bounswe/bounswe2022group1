import json
from django.test import TestCase
from learningPlatform.views import teacher_add_course
from django.http import HttpRequest
from django.test import TestCase
from django.db import connection


class test_teacher_add_course(TestCase):

    def test_valid_course_add(self):
        my_req = HttpRequest()
        my_req.method = "POST"
        
        my_req.POST={
        'course_name':'CMPE271',
        }
        
        self.assertTrue(teacher_add_course.can_add_course(my_req))

    def test_non_valid_course_add(self):
        my_req = HttpRequest()
        my_req.method = "POST"
        
        my_req.POST={
        'course_name':'CMPE150',
        }
        
        self.assertFalse(teacher_add_course.can_add_course(my_req))
        
