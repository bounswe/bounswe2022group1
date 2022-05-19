from queue import Empty
from urllib import response
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard


from urllib import request
from django.http import JsonResponse
import time
from django.views.decorators.csrf import csrf_exempt
import requests



import environ
env = environ.Env()
environ.Env.read_env()

dbname=env("MYSQL_DATABASE")

######################## EXTERNAL API RELATED ##################################
import requests
import json

import http.client

conn = http.client.HTTPSConnection("random-username-generate.p.rapidapi.com")

headers = {
    'X-RapidAPI-Host': "random-username-generate.p.rapidapi.com",
    'X-RapidAPI-Key': env("RandomUsername_API_KEY")
    }


def call_external_API():
    conn.request("GET", "/?locale=en_US&minAge=18&maxAge=50&domain=ugener.com", headers=headers)
    res = conn.getresponse()
    data = res.read()
    random_username=json.loads(data.decode("utf-8"))['items']['username']
    random_username_exist=run_statement(f"SELECT username FROM {dbname}.Users WHERE '{random_username}'=username ")
    if random_username_exist: #check random_username does not exist in database
        call_external_API()
    else:
        return random_username

######################## EXTERNAL API RELATED ##################################

##################
### Ömer Özdemir ###
##################



@csrf_exempt
def can_sign_up(req):
    username=req.GET.get("username",False) #get username
    if username:
        if run_statement(f"SELECT username FROM {dbname}.Users WHERE '{username}'=username "): # username already exists
            return JsonResponse({'can_sign_up': False,'error_reason':"The entered username already exists!"})
        else: # username does not exist in database
            return JsonResponse({'can_sign_up': True})
    else: # name_surname or username or password not given
        return JsonResponse({'can_sign_up': False, 'error_reason':"Username must be given!"})
    
@csrf_exempt
@require_http_methods(["POST"])
def do_sign_up(req):
    name_surname=req.POST.get("name_surname",False)#get name-surname
    username=req.POST.get("username",False) #get username
    password=req.POST.get("password",False) #get password
    is_teacher=req.POST.get('is_teacher',False) # get is_teacher
    
    my_req = HttpRequest()
    my_req.method = "GET"
    my_req.GET = {'username': username, 'name_surname':name_surname,'password': password,'is_teacher':is_teacher}
    can_sign_up_response_object = can_sign_up(my_req) # we check whether with given parameters, user can signup
    response_content = json.loads(can_sign_up_response_object.content) # json is converted to python dictionary

    if can_sign_up_response_object.status_code == 200:
        if response_content['can_sign_up']:
            try:
                run_statement(f"INSERT INTO {dbname}.Users (username, name_surname, is_teacher, password) VALUES('{username}', '{name_surname}', {is_teacher}, '{password}' ) ;") #insert into Users table
                return JsonResponse({'isSignedUp': True})
            except: #due to html protocols, insertion could not be done.
                return JsonResponse({'isSignedUp': False, 'error_reason': 'An error occured due to HTML protocols.'})
        else: # can_sign_up failed! Either username exists or username was not given
            return JsonResponse({'isSignedUp': False, 'error_reason': response_content.get('error_reason',"Reason of the error is not known!")})
    else:  # can_sign_up failed due to html protocols
        return JsonResponse({'isSignedUp': False, 'error_reason': response_content.get('error_reason',"Reason of the error is not known!")})
    
    
@csrf_exempt
def sign_up(req):
    responseOfAPI=call_external_API()
    return render(req,'sign_up.html',{'is_first_time':True,'fail':False,'check_username_not_available':False,'responseOfAPI':responseOfAPI})


@csrf_exempt
def sign_up_entered(req):
    responseOfAPI=call_external_API()
    name_surname=req.POST.get("post_name_surname")#get name-surname
    username=req.POST.get("post_username") #get username
    password=req.POST.get("post_password") #get password
    is_teacher=req.POST.get('post_is_teacher',False) # get is_teacher
    
    my_req = HttpRequest()
    my_req.method = "POST"
    my_req.POST = {'username': username, 'name_surname':name_surname,'password': password,'is_teacher':is_teacher}
    do_sign_up_response_object = do_sign_up(my_req)
    
    if do_sign_up_response_object.status_code==200: # signed succeeds
        return HttpResponseRedirect("/login/")
    else: # signed fails
        return render(req,'sign_up.html',{'is_first_time':False,'fail':True,'check_username_not_available':check_username_not_available,'responseOfAPI':responseOfAPI})

    
@csrf_exempt
def sign_up_check_username(req):
    responseOfAPI=call_external_API()
    check_username=req.POST.get('post_check_username',"")
    check_username_not_available=run_statement(f"SELECT username FROM {dbname}.Users WHERE '{check_username}'=username ")
    return render(req,'sign_up.html',{'is_first_time':False,'fail':False,'check_username_not_available':check_username_not_available,'responseOfAPI':responseOfAPI})



# http://127.0.0.1:8000/see_all_registered_users/
from django.http import JsonResponse
def see_all_registered_users_method(req):
    query=run_statement(f"SELECT username FROM {dbname}.Users")
    return JsonResponse({'RegisteredUsers':query})



