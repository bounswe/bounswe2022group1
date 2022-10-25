import json
from django.test import TestCase
from learningPlatform.views import teacher_course_statistics
from django.http import HttpRequest
from django.test import TestCase
from django.db import connection
from ..db_utils import run_statement
import environ
env = environ.Env()
environ.Env.read_env()
dbname=env("MYSQL_DATABASE")


class test_teacher_course_statistics(TestCase):
    def test_save_course_statistics(self):
        run_statement(f"USE {dbname};")
        my_req = HttpRequest()
        my_req.method = "POST"
        
        my_req.POST={
        'course_name':'CMPE150',
        }
        self.assertTrue(teacher_course_statistics.can_save_course_statistics(my_req))

    def test_save_non_valid_course_statistics(self):
        run_statement(f"USE {dbname};")
        my_req = HttpRequest()
        my_req.method = "POST"
        
        my_req.POST={
        'course_name':'ABCDEF',
        }
        
        self.assertFalse(teacher_course_statistics.can_save_course_statistics(my_req))

    def test_get_course_statistics(self):
        run_statement(f"USE {dbname};")
        my_req = HttpRequest()
        my_req.method = "GET"
        
        my_req.get={
            'coursename':"CMPE160",
        }
        self.assertEqual(teacher_course_statistics.teacher_get_course_statistics(my_req).status_code,200)

    def test_get_non_valid_course_statistics(self):
        run_statement(f"USE {dbname};")
        my_req = HttpRequest()
        my_req.method = "GET"
        
        my_req.get={
        'coursename':'ABCDEvvF',
        }
        self.assertFalse(teacher_course_statistics.teacher_get_course_statistics(my_req))

    def test_call_external_api(self):
        self.assertTrue(teacher_course_statistics.callExternalAPI())
