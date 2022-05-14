from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard

#Ahmet Cemil YAZICI - Teacher adds courses to system.

def teacher_add_course(req):
   return render(req,'teacher_add_course.html')
   
   

def teacher_add_course_entered(req):
   ##############
   ## your code ##
   ##############
