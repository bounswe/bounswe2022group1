
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
import json

from django.http import JsonResponse
import environ

from django.test import TestCase
from learningPlatform.views import teacher_my_courses
from django.contrib.sessions.middleware import SessionMiddleware
from django.http import HttpRequest
from django.test import TestCase
from django.contrib.auth.models import User
from django.test.client import Client


import mysql.connector
from django.db import connection

def run_statement(statement):
    cursor= connection.cursor()
    cursor.execute(statement)
    return cursor.fetchall()


env = environ.Env()


class test_teacher_my_courses(TestCase):
    def setUp(self):
        self.app=teacher_my_courses
        self.c = Client()
        
    #testing the get API
    def test_teacher_my_courses_get(self):
    
        ###scenario 1, return quanex1's courses
        cust_req = HttpRequest()
        cust_req.method = "GET"
        cust_req.GET = {'username': "quanex1"}

        response_object = teacher_my_courses.teacher_get_courses(cust_req)

        self.assertEqual(response_object.status_code, 200)
        returned_output = json.loads(response_object.content)

        expected_out =  {
        "quanex1": [
        [
        "CMPE150"
        ],
        [
        "CMPE160"
        ]
        ]
        }
        
        self.assertEqual(returned_output, expected_out)
        
        
        ###scenario 2, return quanex2's courses
        cust_req = HttpRequest()
        cust_req.method = "GET"
        cust_req.GET = {'username': "quanex2"}

        response_object = teacher_my_courses.teacher_get_courses(cust_req)

        self.assertEqual(response_object.status_code, 200)
        returned_output = json.loads(response_object.content)

        expected_out =  {
        "quanex2": [
        [
        "CMPE220"
        ],
        [
        "CMPE230"
        ]
        ]
        }
        
        self.assertEqual(returned_output, expected_out)


        ###scenario 3, error
        cust_req = HttpRequest()
        cust_req.method = "GET"
        cust_req.GET = {'username': "quanex5"}

        response_object = teacher_my_courses.teacher_get_courses(cust_req)

        self.assertEqual(response_object.status_code, 404)
        returned_output = json.loads(response_object.content)

        expected_out =  {
        "quanex5": "User is not registered or not a teacher"
        }
        
        self.assertEqual(returned_output, expected_out)



    def test_teacher_my_courses_post(self):
        
        ###scenario 4, quanex2 can change the name of his course
        self.c.login(username="quanex2", password='123123b')
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex2","password":"123123b"})

        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_update_course/",data={"course_name":"CMPE220", "new_name":"CMPE280"})
        self.assertEqual(response.status_code,200)
        
        self.c.logout()


        ###scenario 5, quanex1 cannot change name of the CMPE240 because he is not the owner of this course
        self.c.login(username="quanex1", password='123123a')
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex2","password":"123123b"})

        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_update_course/",data={"course_name":"CMPE240", "new_name":"CMPE290"})
        self.assertEqual(response.status_code,404)
        
        self.c.logout()
