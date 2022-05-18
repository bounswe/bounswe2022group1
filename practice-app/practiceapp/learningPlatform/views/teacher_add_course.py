from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard, teacherGuard

##################
### Ahmet Cemil Yazıcı ###
##################
#Ahmet Cemil YAZICI - Teacher adds courses to system.

@teacherGuard
def teacher_add_course(req):
   return render(req,'teacher_add_course.html')
   
   
@teacherGuard
def teacher_add_course_entered(req):
   username=req.session["username"] #Get the username of the current session
   is_teacher = req.session["is_teacher"] #Get is_teacher of the current session

   if is_teacher == True:
      course_name = req.POST["course_name"] #Get the course_name chosen
      run_statement(f"INSERT INTO Courses VALUES ( '{username}','{course_name}',0,0)" ) # insert data into DB
      return render(req,'teacher.html') # redirect it to the teacher page
   else:
      return render(req,'teacher.html') # redirect it to the teacher page
