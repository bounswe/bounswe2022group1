from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
import json

from django.http import JsonResponse
import environ

from django.test import TestCase
from learningPlatform.views import student_specify_preferences
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
env = environ.Env()
environ.Env.read_env()
dbname=env("MYSQL_DATABASE")

class test_specify_prefrences(TestCase):
    def setUp(self):
        self.c = Client()
        self.student_username = "quanex7"

    #testing the get API
    def test_student_preferences_get(self):
        run_statement(f"USE {dbname}")
        cust_req = HttpRequest()
        cust_req.method = "GET"
        cust_req.GET = {'student_username': self.student_username}

        response_object = student_specify_preferences.student_preferences_get(cust_req)

        self.assertEqual(response_object.status_code, 200)
        returned_output = json.loads(response_object.content)

        expected_out =  {
        "preference_1": {
        "topic": "Mathematics",
        "level": "Intermediate"
        },
        "preference_2": {
        "topic": "Physics",
        "level": "Advanced"
        },
        "preference_3": {
        "topic": "Topology",
        "level": "Beginner"
        }
        }
        self.assertEqual(returned_output, expected_out)

        # now, try to check the data of the non-existent username. We expect empty username.
        cust_req = HttpRequest()
        cust_req.method = "GET"
        cust_req.GET = {'student_username': 'asdhefhmef'}

        response_object = student_specify_preferences.student_preferences_get(cust_req)

        self.assertEqual(response_object.status_code, 200)

        returned_output = json.loads(response_object.content)
        expected_out = dict()
        self.assertEqual(returned_output, expected_out)

    #testing the POST API
    def test_student_preferences_post(self):
        run_statement(f"USE {dbname}")
        student_username = 'quanex7'
        password = '123123g'
        topic = 'Data Science'
        level = 'Advanced'

        cust_req = HttpRequest()
        cust_req.method = "POST"
        cust_req.POST = {'student_username': student_username, 'password': password, 'topic': topic, 'level':level}

        response_object = student_specify_preferences.student_preferences_post(cust_req)

        self.assertEqual(response_object.status_code, 200)

        returned_output = json.loads(response_object.content)
        expected_output = {'status':'true',  'student_username':student_username, 'topic':topic, 'level':level }

        self.assertEqual(returned_output, expected_output)


        # NOW, TRY TO SEND THE SAME REQUEST. WE expect to get an error from the API, since duplicate (username, topic) 
        # pairs are not allowed.
        cust_req = HttpRequest()
        cust_req.method = "POST"
        cust_req.POST = {'student_username': student_username, 'password': password, 'topic': topic, 'level':level}

        response_object = student_specify_preferences.student_preferences_post(cust_req)

        self.assertEqual(response_object.status_code, 200)

        returned_output = json.loads(response_object.content)
        expected_output = {'status': 'false', "error":"Error! Non-unique student_username-topic pair."}

        self.assertEqual(returned_output, expected_output)

     #testing the POST API with wrong password and with wrong username
    def test_student_preferences_post_password(self):
        #with wrong password
        run_statement(f"USE {dbname}")
        student_username = 'quanex7'
        password = '1sdsdjhghsffge'
        topic = 'Data Science'
        level = 'Advanced'
        cust_req = HttpRequest()
        cust_req.method = "POST"
        cust_req.POST = {'student_username': student_username, 'password': password, 'topic': topic, 'level':level}

        response_object = student_specify_preferences.student_preferences_post(cust_req)

        self.assertEqual(response_object.status_code, 200)

        returned_output = json.loads(response_object.content)
        expected_output = {'status': 'false', "error":"There is no student with given username and password."}
        self.assertEqual(returned_output, expected_output)

        #with wrong username
        student_username = 'quaefefgcnex7'
        cust_req = HttpRequest()
        cust_req.method = "POST"
        cust_req.POST = {'student_username': student_username, 'password': password, 'topic': topic, 'level':level}

        response_object = student_specify_preferences.student_preferences_post(cust_req)

        self.assertEqual(response_object.status_code, 200)

        returned_output = json.loads(response_object.content)
        expected_output = {'status': 'false', "error":"There is no student with given username and password."}
        self.assertEqual(returned_output, expected_output)



# Written by Ege Onur Taga
# We test API's and not view functions because view functions are already tested in 






