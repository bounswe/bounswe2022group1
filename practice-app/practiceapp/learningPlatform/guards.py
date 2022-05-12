from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods


def studentGuard(func):
    def inner(req):
        if not req.session.get('user'):
            return HttpResponseRedirect("/learningPlatform/studentLogin")

        role = req.session.get('user').get('role')
        if role == 'student':
            return func(req)
        elif role == 'teacher': 
            return HttpResponseRedirect("/learningPlatform/teacher/")
        else:
            req.session.flush()
            return HttpResponseRedirect("/learningPlatform")
    return inner

def teacherGuard(func):
    def inner(req):
        if not req.session.get('user'):
            return HttpResponseRedirect("/learningPlatform/teacherLogin")

        role = req.session.get('user').get('role')
        if role == 'student':
            return HttpResponseRedirect("/learningPlatform/student/")
        elif role == 'teacher': 
            return func(req)
        else:
            req.session.flush()
            return HttpResponseRedirect("/learningPlatform")
    return inner

def guestGuard(func):
    def inner(req):
        if not req.session.get('user'):
            return func(req)

        role = req.session.get('user').get('role')
        if role == 'student':
            return HttpResponseRedirect("/learningPlatform/student/")
        elif role == 'teacher': 
            return HttpResponseRedirect("/learningPlatform/teacher/")
        else:
            req.session.flush()
            return HttpResponseRedirect("/learningPlatform")
    return inner