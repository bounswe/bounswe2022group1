import json
import requests
from django.http import HttpRequest
from django.http import JsonResponse
import environ
from django.test import TestCase
from django.contrib.auth.models import User
from django.test.client import Client
import mysql.connector
from django.db import connection
from learningPlatform.views import student_give_rate

def run_statement(statement):
    cursor= connection.cursor()
    cursor.execute(statement)
    return cursor.fetchall()


env = environ.Env()
dbname=env("MYSQL_DATABASE")

class TestStudentGiveRate(TestCase):
    def test_student_give_rate_post(self):
        run_statement(f"USE {dbname};")
        req = HttpRequest()
        req.method = "POST"
        
        req.POST={
        'course_name':'CMPE150',
        'rate': '3'
        }

        self.assertTrue(student_give_rate.student_post_rate(req).status_code, 200)

        req.POST={
        'course_name':'CMPE150',
        'rate': '8'
        }

        self.assertTrue(student_give_rate.student_post_rate(req).status_code, 400)

    def test_student_give_rate_get(self):
        run_statement(f"USE {dbname};")
        req = HttpRequest()
        req.method = "GET"
        
        req.GET={
        'course_name':'CMPE150',
        }

        self.assertTrue(student_give_rate.student_get_rate(req).status_code, 200)

        req.GET={
        'course_name':'ASDFDGD',
        }

        self.assertTrue(student_give_rate.student_get_rate(req).status_code, 400)