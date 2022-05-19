from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
import json
#import requests
from django.http import JsonResponse
import environ

from django.test import TestCase
from learningPlatform.views import authentication
from learningPlatform.forms import signUpForm
from django.contrib.sessions.middleware import SessionMiddleware
from django.http import HttpRequest
from django.test import TestCase
from django.contrib.auth.models import User
from django.test.client import Client
###3
import mysql.connector
from django.db import connection

def run_statement(statement):
    cursor= connection.cursor()
    cursor.execute(statement)
    return cursor.fetchall()



env = environ.Env()
#run_statement('use mydatabase')

class test2(TestCase):
    def setUp(self):
        #self.app=authentication
        self.c  = Client()
    def test_get_funny_url(self):
        pass
        #self.assertTrue(self.app.get_funny_url())

    def test_canLogin(self):
        my_req = HttpRequest()
        my_req.method = "GET"
        my_req.GET = {'username': 'quanex1', 'password': '123123a'}
        canLogin_response_object = authentication.canLogin(my_req)
        response_content = json.loads(canLogin_response_object.content)
        self.assertEqual(response_content, {'canLogin': True})
        self.assertEqual(canLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "GET"
        my_req.GET = {'username': 'quanex6', 'password': '123123f'}
        canLogin_response_object = authentication.canLogin(my_req)
        response_content = json.loads(canLogin_response_object.content)
        self.assertEqual(response_content, {'canLogin': True})
        self.assertEqual(canLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "GET"
        my_req.GET = {'username': 'asdfg', 'password': '123123f'}
        canLogin_response_object = authentication.canLogin(my_req)
        response_content = json.loads(canLogin_response_object.content)
        self.assertEqual(response_content, {'canLogin': False, 'error': 'Wrong username or password.'})
        self.assertEqual(canLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "GET"
        my_req.GET = {'password': '123123f'}
        canLogin_response_object = authentication.canLogin(my_req)
        response_content = json.loads(canLogin_response_object.content)
        self.assertEqual(response_content, {'canLogin': False, 'error': 'Both username and password variables must be given.'})
        self.assertEqual(canLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "GET"
        my_req.GET = {'username': 'asdfg'}
        canLogin_response_object = authentication.canLogin(my_req)
        response_content = json.loads(canLogin_response_object.content)
        self.assertEqual(response_content, {'canLogin': False, 'error': 'Both username and password variables must be given.'})
        self.assertEqual(canLogin_response_object.status_code, 200)


    def test_doLogin(self):
        my_req = HttpRequest()
        my_req.method = "POST"
        my_req.GET = {'username': 'quanex1', 'password': '123123a'}
        canLogin_response_object = authentication.canLogin(my_req)
        response_content = json.loads(canLogin_response_object.content)
        self.assertEqual(response_content, {'loggedIn': True})
        self.assertEqual(canLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "POST"
        my_req.GET = {'username': 'quanex1', 'password': '123123a'}
        canLogin_response_object = authentication.canLogin(my_req)
        response_content = json.loads(canLogin_response_object.content)
        self.assertEqual(response_content, {'loggedIn': True})
        self.assertEqual(canLogin_response_object.status_code, 200)