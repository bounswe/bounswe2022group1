from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import studentGuard


##################
### Ege Onur Taga ###
##################



def student_search_course(req):
   return render(req,'student_search_course.html')


def student_search_course_entered(req):
   pass
   ##############
   ## your code ##
   ##############
