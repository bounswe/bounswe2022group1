from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard

@guestGuard
@require_http_methods(["GET"])
def login(req):
    error_message=req.GET.get("fail",False)
    
    return render(req, 'login.html',{"error_message": error_message})