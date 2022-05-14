from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard


##################
### Efekan Kavalcı ###
##################


def student_give_rate(req):
   return render(req,'student_give_rate.html')

   
   
def student_give_rate_entered(req):
   ##############
   ## your code ##
   ##############
