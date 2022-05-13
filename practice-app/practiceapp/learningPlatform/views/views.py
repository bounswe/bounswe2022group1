from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from ..db_utils import run_statement
from django.views.decorators.http import require_http_methods
from ..guards import studentGuard, teacherGuard, guestGuard

class User:
    def __init__(self, username, name_surname, is_teacher, password):
        self.username = username
        self.name_surname = name_surname
        self.is_teacher = is_teacher
        self.password = password
    
@guestGuard
@require_http_methods(["GET"])
def index(req):
    if not req.session.get('user'):
        return render(req, 'landingPage.html',{})

    is_teacher = req.session.get('user').get('is_teacher')
    if is_teacher == False:
        return HttpResponseRedirect("/practice-app/student/")
    elif is_teacher == True: 
        #pass
        return HttpResponseRedirect("/practice-app/teacher/")
    else:
        req.session.flush()
        return HttpResponseRedirect("/practice-app")

@studentGuard
@require_http_methods(["GET"])
def student(req):
    return render(req, 'student.html',{})


