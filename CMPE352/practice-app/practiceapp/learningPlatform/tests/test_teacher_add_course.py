import json
from django.test import TestCase
from learningPlatform.views import teacher_add_course
from django.http import HttpRequest
from django.test import TestCase
from django.db import connection

from ..db_utils import run_statement
import environ
env = environ.Env()
environ.Env.read_env()
dbname=env("MYSQL_DATABASE")


class test_teacher_add_course(TestCase):

    def test_valid_course_add(self):
        run_statement(f"USE {dbname};")
        my_req = HttpRequest()
        my_req.method = "POST"
        
        my_req.POST={
        'course_name':'CMPE271',
        }
        
        self.assertTrue(teacher_add_course.can_add_course(my_req))

    def test_non_valid_course_add(self):
        run_statement(f"USE {dbname};")
        my_req = HttpRequest()
        my_req.method = "POST"
        
        my_req.POST={
        'course_name':'CMPE150',
        }
        
        self.assertFalse(teacher_add_course.can_add_course(my_req))
        
