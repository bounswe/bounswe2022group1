from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard, teacherGuard
import http.client
import json
import random
from django.http import JsonResponse
from django.http import HttpRequest
import environ
env = environ.Env()
environ.Env.read_env()

# EXTERNAL API
conn = http.client.HTTPSConnection("free-news.p.rapidapi.com")

headers = {
    'X-RapidAPI-Host': "free-news.p.rapidapi.com",
    'X-RapidAPI-Key': env("teacher_course_statistics_api")
    }

def callExternalAPI():

   conn.request("GET", "/v1/search?q=Elon%20Musk&lang=en&page_size=1", headers=headers)
   res = conn.getresponse()
   data = res.read()

   return json.loads(data.decode("utf-8"))["articles"]

#GET METHOD
@teacherGuard
@require_http_methods(["POST","GET"])
def teacher_course_statistics(req):
   news_elon_musk = callExternalAPI()
   success = req.GET.get('success', False)
   fail = req.GET.get('fail', False)
   result=run_statement(f"SELECT * FROM Course_Statistics_History;") #Run the query in DB
   return render(req,'teacher_course_statistics.html',{"results":result,'success': success, 'fail': fail, 'news_elon_musk': news_elon_musk})


@require_http_methods(["POST","GET"])
def can_save_course_statistics(req):
   course_name=req.POST.get("course_name",False)
   if course_name:
      if run_statement(f"SELECT course_name FROM Courses WHERE '{course_name}'=course_name;"):
         return True
      else: # course_name does not exist in database
         return False
   else: # cannot getting coursename.
      return False

#POST
@require_http_methods(["POST","GET"])
def do_save_course_statistics(req):
   courseName=req.POST.get("course_name",False)#get course_name
   is_teacher = req.session.get('user').get('role') #Get is_teacher of the current session
   if can_save_course_statistics(req) and is_teacher:
      try:
         run_statement(f"CALL saveStatistics('{courseName}');") #insert into database.
         return True
      except: #due to html protocols, insertion could not be done.
         return False
   else:  # course is not available
      return False

#POST METHOD
@teacherGuard
@require_http_methods(["POST","GET"])
def teacher_save_course_statistics(req):
   # Using POST
   try:
      if do_save_course_statistics(req):       
         return HttpResponseRedirect("/teacher/teacher_course_statistics/?success=true")
      else:
         return HttpResponseRedirect("/teacher/teacher_course_statistics/?fail=true")
   except:
      return HttpResponseRedirect("/teacher/teacher_course_statistics/?fail=true")


## Get instant course statistics JSON
## teacher/teacher_get_course_statistics/?coursename=<prm>
def teacher_get_course_statistics(req):
   # getting parameter
   courseName = req.get.get("coursename", "")
   # SQL query
   query = f"CALL getStatistics('{courseName}')"
   result = run_statement(query)
   # Converting it to array
   finalResult = [] 
   for i in result:
         finalResult.append(i)
   if finalResult:
      # Passing result JSON to html
      return JsonResponse({'data': finalResult})
   else:
      return False