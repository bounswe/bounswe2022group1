from asyncio.windows_events import NULL
from queue import Empty
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard


import environ
env = environ.Env()
environ.Env.read_env()


##################
### Ömer Özdemir ###
##################

is_first_time=True
has_failed=False
check_username_not_available=False


def sign_up(req):
    #print(env("OMER_API_KEY"))
    return render(req,'sign_up.html',{'is_first_time':is_first_time,'fail':has_failed,'check_username_not_available':check_username_not_available})

def sign_up_entered(req):
    name_surname=req.POST["post_name_surname"] #get name-surname
    username=req.POST["post_username"] #get username
    password=req.POST["post_password"] #get password
    is_teacher=req.POST.get('post_is_teacher',False) # get is_teacher
    has_failed=run_statement(f"SELECT username FROM Users WHERE '{username}'=username ")
    if has_failed:
        return render(req,'sign_up.html',{'is_first_time':is_first_time,'fail':has_failed,'check_username_not_available':check_username_not_available})
    else:
        run_statement(f"INSERT INTO Users VALUES('{username}', '{name_surname}', {is_teacher}, '{password}' ) ;") #insert into Users table
        return render(req,'login.html')  #redirect to login page
    
def sign_up_check_username(req):
    is_first_time=False
    check_username=req.POST.get('post_check_username',"")
    check_username_not_available=run_statement(f"SELECT username FROM Users WHERE '{check_username}'=username ")
    return render(req,'sign_up.html',{'is_first_time':is_first_time,'fail':has_failed,'check_username_not_available':check_username_not_available})

