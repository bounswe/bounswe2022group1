from django.shortcuts import render
from django.http import HttpRequest, HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard
from django.http import JsonResponse
import json
import time
from django.views.decorators.csrf import csrf_exempt


##################
### Mustafa Atay ###
##################

@csrf_exempt
@require_http_methods(["GET"])
def canLogin(req):
    username=req.GET.get("username",False)
    password=req.GET.get("password",False)
    if username and password:
        query=f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
        result=run_statement(query)
        if result:
            return JsonResponse({'canLogin': True})
        else:
            return JsonResponse({'canLogin': False, 'error': 'Wrong username or password.'})
    else:
        return JsonResponse({'canLogin': False, 'error': 'Both username and password variables must be given.'})

@csrf_exempt
@require_http_methods(["POST"])
def doLogin(req):
    username=req.POST.get("username",False)
    password=req.POST.get("password",False)

    my_req = HttpRequest()
    my_req.method = "GET"
    my_req.GET = {'username': username, 'password': password}
    canLogin_response_object = canLogin(my_req)

    response_content = json.loads(canLogin_response_object.content)

    if canLogin_response_object.status_code == 200:
        if response_content['canLogin']:
            try:
                query=f"UPDATE users SET last_login_time = {time.time()} WHERE username='{username}'"
                run_statement(query)
                return JsonResponse({'loggedIn': True})
            except:
                return JsonResponse({'loggedIn': False, 'error': 'An error occured while logging in.'})
        else:
            return JsonResponse({'loggedIn': False, 'error': 'An error occured while logging in.'})
        
    return JsonResponse({'loggedIn': False, 'error': response_content.get('error', 'Unknown error.')})


@guestGuard
@require_http_methods(["GET"])
def login(req):
    fail=req.GET.get("fail",False)
    error=req.GET.get("error","")

    return render(req, 'login.html',{"fail": fail, "error": error})

@guestGuard
@require_http_methods(["POST"])
def loginQuery(req):
    username=req.POST.get("username",False)
    password=req.POST.get("password",False)

    my_req = HttpRequest()
    my_req.method = "POST"
    my_req.POST = {'username': username, 'password': password}
    doLogin_response_object = doLogin(my_req)

    if doLogin_response_object.status_code == 200:
        response_content = json.loads(doLogin_response_object.content)
        if response_content.get('loggedIn', False):
            query=f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
            result=run_statement(query)
            req.session["user"]={
                "username":username,
                "name_surname": result[0][1],
                "role": "teacher" if result[0][2] else "student"
            }
            return HttpResponseRedirect("/")
        else:
            return HttpResponseRedirect('/login?fail=true&error=' + response_content.get('error', 'Unknown error.'))
    else:
        return HttpResponseRedirect('/login?fail=true&error=' + response_content.get('error', 'Unknown error.'))


@require_http_methods(["POST"])
def logoutQuery(req):
    req.session.flush()
    return HttpResponseRedirect("/")
