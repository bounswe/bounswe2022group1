from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard, teacherGuard
import http.client
import json
import random
from django.http import JsonResponse
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

   if "articles" in json.loads(data.decode("utf-8")):
      return json.loads(data.decode("utf-8"))["articles"]
   else:
      return "You are trying to generate too often, please retry in a few seconds."

#GET METHOD
@teacherGuard
@require_http_methods(["POST","GET"])
def teacher_course_statistics(req):

   news_elon_musk = callExternalAPI()
   success = req.GET.get('success', False)
   fail = req.GET.get('fail', False)
   
   result=run_statement(f"SELECT * FROM Course_Statistics_History;") #Run the query in DB
   return render(req,'teacher_course_statistics.html',{"results":result,'success': success, 'fail': fail, 'news_elon_musk': news_elon_musk})

#POST METHOD
@teacherGuard
@require_http_methods(["POST","GET"])
def teacher_save_course_statistics(req):

   # Using GET   
   username = req.session.get('user').get('username') #Get the username of the current session
   is_teacher = req.session.get('user').get('role') #Get is_teacher of the current session

   # Using POST
   try:
      if is_teacher == "teacher":        
         course_name = req.POST["course_name"] #Save the course statistics
         if course_name == run_statement(f"SELECT course_name FROM Courses WHERE course_name = '{course_name}';")[0][0]:
            news_elon_musk = callExternalAPI()
            run_statement(f"CALL saveStatistics('{course_name}')")
            response = run_statement(f"SELECT rating/rate_count AS 'Average Rating' FROM Courses WHERE course_name = '{course_name}';")[0][0]
            print(response)
            if response is None:
               response = 0
            result=run_statement(f"SELECT * FROM Course_Statistics_History;") #Run the query in DB
            print(response)
            return render(req,'teacher_course_statistics.html',{"response":response, "success":True,"results":result, 'news_elon_musk': news_elon_musk})
         else:
            return HttpResponseRedirect("/teacher/teacher_course_statistics/?fail=true")
      else:
         return HttpResponseRedirect("/teacher/teacher_course_statistics/?fail=true")
   except:
      return HttpResponseRedirect("/teacher/teacher_course_statistics/?fail=true")

## Get instant course statistics JSON
## teacher/teacher_get_course_statistics/?coursename=<prm>
def teacher_get_course_statistics(req):
   # getting parameter
   courseName = req.GET.get("coursename", "")
   # SQL query
   query = f"CALL getStatistics('{courseName}')"
   result = run_statement(query)
   # Converting it to array
   finalResult = []
   for i in result:
         finalResult.append(i)
   # Passing result JSON to html
   return JsonResponse({'data': finalResult})