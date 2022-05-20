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
    return random_username

######################## EXTERNAL API RELATED ##################################

##################
### Ömer Özdemir ###
##################



@csrf_exempt
def can_sign_up(req):
    username=req.POST.get("post_username",False) #get username
    if username:
        if run_statement(f"SELECT username FROM Users WHERE '{username}'=username "): # username already exists
            return False
        else: # username does not exist in database
            return True
    else: # name_surname or username or password not given
        return False
    
@csrf_exempt
def do_sign_up(req):
    name_surname=req.POST.get("post_name_surname",False)#get name-surname
    username=req.POST.get("post_username",False) #get username
    password=req.POST.get("post_password",False) #get password
    is_teacher=req.POST.get('post_is_teacher',False) # get is_teacher

    if can_sign_up(req):
            try:
                run_statement(f"INSERT INTO Users (username, name_surname, is_teacher, password) VALUES('{username}', '{name_surname}', {is_teacher}, '{password}' ) ;") #insert into Users table
                return True
            except: #due to html protocols, insertion could not be done.
                return False
    else:  # can_sign_up failed due to html protocols
        return False
    
    
@csrf_exempt
def sign_up(req):
    responseOfAPI=call_external_API()
    return render(req,'sign_up.html',{'show_check_username':False,'fail':False,'check_username_available':False,'responseOfAPI':responseOfAPI})


@csrf_exempt
def sign_up_entered(req):
    responseOfAPI=call_external_API()
    name_surname=req.POST.get("post_name_surname")#get name-surname
    username=req.POST.get("post_username") #get username
    password=req.POST.get("post_password") #get password
    is_teacher=req.POST.get('post_is_teacher',False) # get is_teacher
    if do_sign_up(req): # signed_up succeeds
        return HttpResponseRedirect("/login/")
    else: # signed_up fails
        return render(req,'sign_up.html',{'show_check_username':False,'fail':True,'check_username_available':False ,'responseOfAPI':responseOfAPI})


@csrf_exempt
@require_http_methods(["POST"])
def sign_up_does_check_username_exist(req):
    check_username=req.POST.get('post_check_username',"")
    return run_statement(f"SELECT username FROM Users WHERE '{check_username}'=username;")
    
    
@csrf_exempt
def sign_up_check_username(req):
    responseOfAPI=call_external_API()
    if sign_up_does_check_username_exist(req):
        return render(req,'sign_up.html',{'show_check_username':True,'fail':False,'check_username_available':False,'responseOfAPI':responseOfAPI})
    else:
        return render(req,'sign_up.html',{'show_check_username':True,'fail':False,'check_username_available':True,'responseOfAPI':responseOfAPI})


@csrf_exempt
def get_see_all_registered_users(req):
    return run_statement(f"SELECT username FROM Users")


# http://127.0.0.1:8000/see_all_registered_users/
def see_all_registered_users_method(req):
    return JsonResponse({'RegisteredUsers':get_see_all_registered_users(req)})
