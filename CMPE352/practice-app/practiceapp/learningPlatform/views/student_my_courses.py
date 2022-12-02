##################
### Osman Fehmi Albayrak ###
##################

from re import S
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard, studentGuard
import requests
from django.http import JsonResponse
import time
import environ
import json

env = environ.Env()
environ.Env.read_env()

## DB Query for html
@studentGuard
def student_my_courses(req):
   username = req.session["user"]["username"]

   # POST REQUEST
   # Update my courses last seen
   my_req = HttpRequest()
   my_req.method = "POST"
   my_req.GET = { 'username': username }
   result_response_object = student_my_courses_seen_update(my_req)
   
   # GET REQUEST
   # Enrolled courses
   my_req = HttpRequest()
   my_req.method = "GET"
   my_req.GET = { 'username': username }
   result_response_object = get_all_courses(my_req)
   result = json.loads(result_response_object.content)["data"]

   # API call to jokeapi
   response = requests.get("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single").json()
   
   # Passing results to html
   return render(req, 'student_my_courses.html', {"my_student_courses_list": result, "joke": response["joke"]})

## return button
@studentGuard
def student_my_courses_back(req):
   return HttpResponseRedirect("/student")

## Get my courses JSON
## student/student_my_courses_back/get/?username=<prm>
@require_http_methods(["GET"])
def get_all_courses(req):
   # getting parameter
   username = req.GET.get("username", "")
   query = f"SELECT COUNT(1) FROM Users WHERE username = '{username}' AND is_teacher = 0"
   result = run_statement(query)[0][0]
   if result == 0:
      return JsonResponse({"error": "Student not found!"}, status=404)

   # SQL query
   query = f"SELECT course_name FROM Enrolls WHERE student_username = '{username}'"
   result = run_statement(query)
   # Since result is like -> (('CMPE150',), ('CMPE160',))
   # Converting it to array
   finalResult = []
   for i in result:
         finalResult.append(i[0])
   # Passing result JSON to html
   return JsonResponse({'data': finalResult}, status=200)

## Update last seen
## student/student_my_courses/seen/?username=<prm>
@require_http_methods(["POST"])
def student_my_courses_seen_update(req):
   # getting parameter
   username = req.GET.get("username", "")
   # Check student exists
   query = f"SELECT COUNT(1) FROM Users WHERE username = '{username}' AND is_teacher = 0"
   result = run_statement(query)[0][0]
   if result == 0:
      return JsonResponse({"message": "Student not found!"}, status=404)

   # Update
   query = f"UPDATE Users SET last_course_view_time = {time.time()} WHERE username = '{username}';"
   run_statement(query)
   return JsonResponse({"message": "Updated!"}, status=200)