from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard


def sign_up(req):
    return render(req,'sign_up.html')

def sign_up_entered(req):
    name_surname=req.POST["post_name_surname"] #get name-surname
    username=req.POST["post_username"] #get username
    password=req.POST["post_password"] #get password
    is_teacher=req.POST.get('post_is_teacher',False) # get is_teacher
    run_statement(f"INSERT INTO Users VALUES('{username}', '{name_surname}', '{is_teacher}', '{password}' ) ;") #insert into Users table
    return render(req,'login.html')  #redirect to login page
