from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard, teacherGuard
import http.client
import json
from urllib import response
from urllib import request
from django.http import JsonResponse
import time
from django.views.decorators.csrf import csrf_exempt
import random
import requests

import environ
env = environ.Env()
environ.Env.read_env()

dbname=env("MYSQL_DATABASE")

#Ahmet Cemil YAZICI - Teacher adds courses to system.

# --------------------- EXTERNAL API RELATED ---------------------

conn = http.client.HTTPSConnection("quotes15.p.rapidapi.com")

headers = {
    'X-RapidAPI-Host': "quotes15.p.rapidapi.com",
    'X-RapidAPI-Key': "14656f2ef3msh7f73a5ceb897daap14ce31jsna93569cb63f0"
    }

def callExternalAPI():
   conn.request("GET", "/quotes/random/", headers=headers)
   res = conn.getresponse()
   data = res.read()

   if "content" in json.loads(data.decode("utf-8")):
      return json.loads(data.decode("utf-8"))["content"]
   else:
      return "You are trying to generate too often, please retry in a few seconds."

# --------------------- EXTERNAL API RELATED ---------------------

#Checker Method for unit case purposes.
@require_http_methods(["POST","GET"])
def can_add_course(req):
   course_name=req.POST.get("course_name",False) #get course_name
   if course_name:
      if run_statement(f"SELECT course_name FROM {dbname}.Courses WHERE '{course_name}'=course_name "): # course_name already exists
         return False
      else: # course_name does not exist in database
         return True
   else: # another error occured.
      return False

#Doing the actual course adding here.
#POST METHOD
@require_http_methods(["POST","GET"])
def do_add_course(req):
   course_name=req.POST.get("course_name",False)#get course_name
   username = req.session.get('user').get('username') #Get the username of the current session
   is_teacher = req.session.get('user').get('role') #Get is_teacher of the current session
   if can_add_course(req) and is_teacher == "teacher":
      try:
         run_statement(f"INSERT INTO {dbname}.Courses (course_name, teacher_username, rating, rate_count) VALUES('{course_name}', '{username}', 0, 0 ) ;") #insert into database.
         return True
      except: #due to html protocols, insertion could not be done.
         return False
   else:  # can_sign_up failed due to html protocols
      return False


#GET METHOD
@teacherGuard
@require_http_methods(["POST","GET"])
def teacher_add_course(req):

   random_sentence_generated = callExternalAPI()
   success = req.GET.get('success', False)
   fail = req.GET.get('fail', False)
   return render(req,'teacher_add_course.html',{'success': success, 'fail': fail, 'random_sentence_generated': random_sentence_generated})

#Rendering to page, give error or success message.
@teacherGuard
@require_http_methods(["POST","GET"])
def teacher_add_course_entered(req):

   try:
      if do_add_course(req): # added course succeeds
         return HttpResponseRedirect("/teacher/teacher_add_course/?success=true")
      else: # add course fails
         return HttpResponseRedirect("/teacher/teacher_add_course/?fail=true")
   except:
      return HttpResponseRedirect("/teacher/teacher_add_course/?fail=true")




   
