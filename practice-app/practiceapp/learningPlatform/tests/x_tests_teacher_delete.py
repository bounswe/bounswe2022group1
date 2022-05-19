from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
import json
import requests
from django.http import JsonResponse
import environ

from django.test import TestCase
from learningPlatform.views import teacher_delete_course
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

###
class test(TestCase):
    def setUp(self):
        self.app=teacher_delete_course
        self.c  = Client()
    def test_get_funny_url(self):
        self.assertTrue(self.app.get_funny_url())
    def test_get_text(self):
        self.assertEqual(self.app.get_text("Fail"),"Failed. This can be because the course's teacher is not you or just a typo.")
        self.assertEqual(self.app.get_text("Success"),"The course is deleted, you can undo by the button.")
        self.assertEqual(self.app.get_text("undofail1"),"You never deleted a course or the last attemp was not valid.")
        self.assertEqual(self.app.get_text("undofail2"),"The course is already in the db.")
        self.assertEqual(self.app.get_text("undosuccess"),"You saved the course you deleted before.")
        self.assertEqual(self.app.get_text(""),"Enter the course name that you want to delete")
        self.assertEqual(self.app.get_text(None),"Enter the course name that you want to delete")
    def test_getCourses(self):
        j,i=97,1
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/getCourses/")
        self.assertEqual(response.json()["courses"],['CMPE150', 'CMPE160'])
        self.c.logout()
        j+=1
        i=2
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/getCourses/")
        self.assertEqual(response.json()["courses"],['CMPE220', 'CMPE230'])
        self.c.logout()
        j+=1
        i=3
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/getCourses/")
        self.assertEqual(response.json()["courses"],['CMPE240'])
        self.c.logout()
        j+=1
        i=4
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/getCourses/")
        self.assertEqual(response.json()["courses"],[])
        self.c.logout()
        j+=1
        i=5
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/getCourses/")
        self.assertEqual(response.json()["courses"],[])
        self.c.logout()
        j+=1
        i=6
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/getCourses/")
        self.assertEqual(response.json()["courses"],[])
        self.c.logout()
        j+=1
        i=7
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/getCourses/")
        self.assertEqual(response.json()["courses"],[])
        self.c.logout()
        j+=1
        i=8
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/getCourses/")
        self.assertEqual(response.json()["courses"],[])
        self.c.logout()
        j+=2
        i=9
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/getCourses/")
        self.assertEqual(response.json()["courses"],[])
        self.c.logout()
    def test_delete_course(self):
        j,i=97,1
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/teacher_delete_course/")
        self.assertEqual(response.status_code,200)
        self.c.logout()
        j+=1
        i=2
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/teacher_delete_course/")
        self.assertEqual(response.status_code,200)
        self.c.logout()
        j+=1
        i=3
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/teacher_delete_course/")
        self.assertEqual(response.status_code,200)
        self.c.logout()
        j+=1
        i=4
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/teacher_delete_course/")
        self.assertEqual(response.status_code,302)
        self.c.logout()
        j+=1
        i=5
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/teacher_delete_course/")
        self.assertEqual(response.status_code,302)
        self.c.logout()
        j+=1
        i=6
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/teacher_delete_course/")
        self.assertEqual(response.status_code,302)
        self.c.logout()
        j+=1
        i=7
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/teacher_delete_course/")
        self.assertEqual(response.status_code,302)
        self.c.logout()
        j+=1
        i=8
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/teacher_delete_course/")
        self.assertEqual(response.status_code,302)
        self.c.logout()
        j+=1
        i=9
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.get("http://127.0.0.1:8000/teacher/teacher_delete_course/")
        self.assertEqual(response.status_code,302)
        self.c.logout()
    def test_delete_course_entered(self):
        j,i=97,1
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE220"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE250"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE240"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE150"})
        self.assertEqual(response.url[39:],"Success")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE160"})
        self.assertEqual(response.url[39:],"Success")
        self.c.logout()
        j+=1
        i=2
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE220"})
        self.assertEqual(response.url[39:],"Success")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE250"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE230"})
        self.assertEqual(response.url[39:],"Success")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE150"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE160"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":""})
        self.assertEqual(response.url[39:],"Fail")
        self.c.logout()
        j+=1
        i=3
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE240"})
        self.assertEqual(response.url[39:],"Success")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE250"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE230"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE150"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE160"})
        self.assertEqual(response.url[39:],"Fail")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":""})
        self.assertEqual(response.url[39:],"Fail")
        self.c.logout()
        j+=1
        i=1
        self.c.login(username="quanex"+str(i), password='1231f23'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123f123"+chr(j)})
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE150"})
        self.assertEqual(response.url[39:],'')
    def test_delete_course_entered_undo(self):
        j,i=97,1
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_undo/",data={"lastdeleted":"CMPE220"})
        self.assertEqual(response.json()["Response"],'Failed.The course is already in the db.')
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_undo/",data={"lastdeleted":"f"})
        self.assertEqual(response.json()["Response"],'Success.You saved the course you deleted before.')
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_undo/",data={"lastdeleted":"CMPE290"})
        self.assertEqual(response.json()["Response"],'Success.You saved the course you deleted before.')
        self.c.logout()

        j+=1
        i=2
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE220"})
        self.assertEqual(response.url[39:],"Success")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_undo/",data={"lastdeleted":"CMPE220"})
        self.assertEqual(response.json()["Response"],'Success.You saved the course you deleted before.')
        self.c.logout()
        j+=1
        i=3
        self.c.login(username="quanex"+str(i), password='123123'+chr(j))
        self.c.post("http://127.0.0.1:8000/login/query/",data={"username":"quanex"+str(i),"password":"123123"+chr(j)})
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_entered/",data={"coursename":"CMPE240"})
        self.assertEqual(response.url[39:],"Success")
        response=self.c.post("http://127.0.0.1:8000/teacher/teacher_delete_course_undo/",data={"lastdeleted":"CMPE240"})
        self.assertEqual(response.json()["Response"],'Success.You saved the course you deleted before.')
        self.c.logout()
