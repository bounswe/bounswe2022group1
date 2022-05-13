from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard


#@studentGuard
def student_enroll(req):
        return student_enroll.html


def student_enroll_entered(req):
        username=req.session["username"] #Retrieve the username of the logged-in user
        course_name = req.POST.get("course_name") #Retrieve the name of the course from the html file
        run_statement(f"INSERT INTO Enrolls VALUES ( '{username}','{course_name}') ") # insert data into DB
        return render(req,'student.html') # redirect it to the main page.
