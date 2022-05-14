from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard



##################
### Kadir Gökhan Sezer ###
##################

def teacher_delete_course(req):
   return render(req,'teacher_delete_course.html')


def teacher_delete_course_entered(req):
   ##############
   ## your code ##
   ##############
