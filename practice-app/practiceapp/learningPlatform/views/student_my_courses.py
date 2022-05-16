from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard
   
def student_my_courses(req):
   username = req.session["user"]["username"]
   query = f"SELECT course_name FROM Enrolls WHERE student_username='{username}'"
   result = run_statement(query)
   finalResult = []
   for i in result:
         finalResult.append(i[0])
   return render(req, 'student_my_courses.html', {"my_student_courses_list": finalResult})

def student_my_courses_back(req):
   return HttpResponseRedirect("/student")