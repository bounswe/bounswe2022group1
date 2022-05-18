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
@require_http_methods(["POST","GET"])
def teacher_add_course(req):
   success = req.GET.get('success', False)
   fail = req.GET.get('fail', False)
   return render(req,'teacher_add_course.html',{'success': success, 'fail': fail})

@teacherGuard
@require_http_methods(["POST","GET"])
def teacher_add_course_entered(req):

   # GET Method   
   username = req.session.get('user').get('username') #Get the username of the current session
   is_teacher = req.session.get('user').get('role') #Get is_teacher of the current session

   # POST Method
   try:
      if is_teacher == "teacher":        
         course_name = req.POST["course_name"] #Post the course_name chosen
         run_statement(f"INSERT INTO Courses VALUES ( '{course_name}','{username}',0,0)" ) # insert data into DB 
         return HttpResponseRedirect("/teacher/teacher_add_course/?success=true")
      else:
         return HttpResponseRedirect("/teacher/teacher_add_course/?fail=true")
   except:
      return HttpResponseRedirect("/teacher/teacher_add_course/?fail=true")

   # External API
   





   
