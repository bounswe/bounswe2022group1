from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard, teacherGuard
import http.client
import json
import requests
import random

#Ahmet Cemil YAZICI - Teacher adds courses to system.

# EXTERNAL API
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

#GET METHOD
@teacherGuard
@require_http_methods(["POST","GET"])
def teacher_add_course(req):

   random_sentence_generated = callExternalAPI()
   success = req.GET.get('success', False)
   fail = req.GET.get('fail', False)
   return render(req,'teacher_add_course.html',{'success': success, 'fail': fail, 'random_sentence_generated': random_sentence_generated})

#POST METHOD
@teacherGuard
@require_http_methods(["POST","GET"])
def teacher_add_course_entered(req):

   # Using GET   
   username = req.session.get('user').get('username') #Get the username of the current session
   is_teacher = req.session.get('user').get('role') #Get is_teacher of the current session

   # Using POST
   try:
      if is_teacher == "teacher":        
         course_name = req.POST["course_name"] #Post the course_name chosen
         run_statement(f"INSERT INTO Courses VALUES ( '{course_name}','{username}',0,0)" ) # insert data into DB 
         return HttpResponseRedirect("/teacher/teacher_add_course/?success=true")
      else:
         return HttpResponseRedirect("/teacher/teacher_add_course/?fail=true")
   except:
      return HttpResponseRedirect("/teacher/teacher_add_course/?fail=true")







   
