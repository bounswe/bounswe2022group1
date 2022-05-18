from asyncio.windows_events import NULL
from queue import Empty
from urllib import response
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard


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
    if run_statement(f"SELECT username FROM Users WHERE '{random_username}'=username "): #check random_username does not exist in database
        call_external_API()
    else:
        return random_username

######################## EXTERNAL API RELATED ##################################

##################
### Ömer Özdemir ###
##################

is_first_time=True
has_failed=False
check_username_not_available=False


def sign_up(req):
    #print(env("OMER_API_KEY"))
    
    responseOfAPI=call_external_API()
    return render(req,'sign_up.html',{'is_first_time':is_first_time,'fail':has_failed,'check_username_not_available':check_username_not_available,'responseOfAPI':responseOfAPI})

def sign_up_entered(req):
    responseOfAPI=call_external_API()
    name_surname=req.POST["post_name_surname"] #get name-surname
    username=req.POST["post_username"] #get username
    password=req.POST["post_password"] #get password
    is_teacher=req.POST.get('post_is_teacher',False) # get is_teacher
    has_failed=run_statement(f"SELECT username FROM Users WHERE '{username}'=username ")
    if has_failed:
        return render(req,'sign_up.html',{'is_first_time':is_first_time,'fail':has_failed,'check_username_not_available':check_username_not_available,'responseOfAPI':responseOfAPI})
    else:
        run_statement(f"INSERT INTO Users VALUES('{username}', '{name_surname}', {is_teacher}, '{password}' ) ;") #insert into Users table
        return HttpResponseRedirect("/login/")  #redirect to login page
    
def sign_up_check_username(req):
    is_first_time=False
    responseOfAPI=call_external_API()
    check_username=req.POST.get('post_check_username',"")
    check_username_not_available=run_statement(f"SELECT username FROM Users WHERE '{check_username}'=username ")
    return render(req,'sign_up.html',{'is_first_time':is_first_time,'fail':has_failed,'check_username_not_available':check_username_not_available,'responseOfAPI':responseOfAPI})



# http://127.0.0.1:8000/see_all_registered_users/
from django.http import JsonResponse
def see_all_registered_users_method(req):
    query=run_statement(f"SELECT username FROM Users")
    return JsonResponse({'RegisteredUsers':query})
