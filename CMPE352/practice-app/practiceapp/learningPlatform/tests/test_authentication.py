import json
from django.test import TestCase
from learningPlatform.views import authentication
from django.http import HttpRequest
from django.test import TestCase
from django.db import connection

from ..db_utils import run_statement
import environ
env = environ.Env()
environ.Env.read_env()
dbname=env("MYSQL_DATABASE")

class AuthenticationTest(TestCase):
    def test_canLogin(self):
        run_statement(f"USE {dbname};")
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

        my_req = HttpRequest()
        my_req.method = "POST"
        my_req.POST = {'username': 'quanex1', 'password': '123123a'}
        canLogin_response_object = authentication.canLogin(my_req)
        self.assertEqual(canLogin_response_object.status_code, 405)


    def test_doLogin(self):
        run_statement(f"USE {dbname};")
        my_req = HttpRequest()
        my_req.method = "POST"
        my_req.POST = {'username': 'quanex1', 'password': '123123a'}
        doLogin_response_object = authentication.doLogin(my_req)
        response_content = json.loads(doLogin_response_object.content)
        self.assertEqual(response_content, {'loggedIn': True})
        self.assertEqual(doLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "POST"
        my_req.POST = {'username': 'quanex7', 'password': '123123g'}
        doLogin_response_object = authentication.doLogin(my_req)
        response_content = json.loads(doLogin_response_object.content)
        self.assertEqual(response_content, {'loggedIn': True})
        self.assertEqual(doLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "POST"
        my_req.POST = {'username': 'aasdfsg', 'password': '123123a'}
        doLogin_response_object = authentication.doLogin(my_req)
        response_content = json.loads(doLogin_response_object.content)
        self.assertEqual(response_content, {'loggedIn': False, 'error': 'Wrong username or password.'})
        self.assertEqual(doLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "POST"
        my_req.POST = {'password': '123123a'}
        doLogin_response_object = authentication.doLogin(my_req)
        response_content = json.loads(doLogin_response_object.content)
        self.assertEqual(response_content, {'loggedIn': False, 'error': 'Both username and password variables must be given.'})
        self.assertEqual(doLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "POST"
        my_req.POST = {'username': 'aasdfsg'}
        doLogin_response_object = authentication.doLogin(my_req)
        response_content = json.loads(doLogin_response_object.content)
        self.assertEqual(response_content, {'loggedIn': False, 'error': 'Both username and password variables must be given.'})
        self.assertEqual(doLogin_response_object.status_code, 200)

        my_req = HttpRequest()
        my_req.method = "GET"
        my_req.GET = {'username': 'quanex1', 'password': '123123a'}
        doLogin_response_object = authentication.doLogin(my_req)
        self.assertEqual(doLogin_response_object.status_code, 405)
        
    