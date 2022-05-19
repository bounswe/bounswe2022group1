from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard
import environ
#Kadir:
env = environ.Env()
environ.Env.read_env()
dbname=env("MYSQL_DATABASE")



##################
### Mustafa Atay ###
##################


@guestGuard
@require_http_methods(["GET"])
def login(req):
    error_message=req.GET.get("fail",False)
    
    return render(req, 'login.html',{"error_message": error_message})

@guestGuard
@require_http_methods(["POST"])
def loginQuery(req):
    username=req.POST.get("username",False)
    password=req.POST.get("password",False)
    if username and password:
        query=f"SELECT * FROM {dbname}.users WHERE username='{username}' AND password='{password}'"
        result=run_statement(query)
        if result:
            req.session["user"]={
                "username":username,
                "name_surname": result[0][1],
                "role": "teacher" if result[0][2] else "student"
            }
            return HttpResponseRedirect("/")
        else:
            return HttpResponseRedirect("/login/?fail=true")
    else:
        return HttpResponseRedirect("/login/?fail=true")

@require_http_methods(["POST"])
def logoutQuery(req):
    req.session.flush()
    return HttpResponseRedirect("/")
