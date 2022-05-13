from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement

@require_http_methods(["GET"])
def studentLogin(req):
    if req.session.get('user'):
        return HttpResponseRedirect("/")

    error_message=req.GET.get("fail",False)
    
    return render(req, 'login.html',{"error_message": error_message, "headerText": "Student", "bottomText": "student", "formPostPath": "loginAsStudent"})


@require_http_methods(["GET"])
def teacherLogin(req):
    if req.session.get('user'):
        return HttpResponseRedirect("/")

    error_message=req.GET.get("fail",False)
    
    return render(req, 'login.html',{"error_message": error_message, "headerText": "Teacher", "bottomText": "teacher", "formPostPath": "loginAsTeacher"})

