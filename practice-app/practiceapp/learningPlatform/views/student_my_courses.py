##################
### Osman Fehmi Albayrak ###
##################

from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard
import json
import requests

## Holding API KEY
import environ

env = environ.Env()
environ.Env.read_env()

## DB Query for html
def student_my_courses(req):
   username = req.session["user"]["username"]
   query = f"SELECT course_name FROM Enrolls WHERE student_username='{username}'"
   result = run_statement(query)
   finalResult = []
   for i in result:
         finalResult.append(i[0])

   # API call to jokeapi
   response = requests.get("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single").json()
   
   # Passing results to html
   return render(req, 'student_my_courses.html', {"my_student_courses_list": finalResult, "joke": response["joke"]})

## return button
def student_my_courses_back(req):
   return HttpResponseRedirect("/student")

## Get my courses JSON
## student/student_my_courses_back/get/?username=<prm>
def get_all_courses(req):
   # getting parameter
   username = req.GET.get("username", "")
   # SQL query
   query = f"SELECT course_name FROM Enrolls WHERE student_username='{username}'"
   result = run_statement(query)
   # Since result is like -> (('CMPE150',), ('CMPE160',))
   # Converting it to array
   finalResult = []
   for i in result:
         finalResult.append(i[0])
   # Passing result JSON to html
   return render(req, 'json.html', {"json": json.dumps(finalResult)})


 