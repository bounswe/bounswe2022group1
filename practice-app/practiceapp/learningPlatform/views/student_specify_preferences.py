from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import studentGuard


##################
### Ege Onur Taga ###
##################



def student_specify_preferences(req):
   return render(req,'student_specify_preferences.html')


def student_specify_preferences_entered(req):
   pass
   ##############
   ## your code ##
   ##############
