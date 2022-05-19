#from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect, JsonResponse
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import teacherGuard
import requests


##################
### Kamil Korkut ###
##################


#for back button
@teacherGuard
def teacher_my_courses_back(req):
    return HttpResponseRedirect("/teacher")

#
@teacherGuard
def teacher_my_courses(req):
    username = req.session["user"]["username"]
    result = run_statement(f"SELECT course_name FROM Courses WHERE teacher_username = '{username}' ")
    
    response = requests.get("https://weatherdbi.herokuapp.com/data/weather/istanbul").json()
    
    finalResult = []
    for i in result:
        finalResult.append(i[0])
    
    return render(req, 'teacher_my_courses.html', {"teacher_courses_list": finalResult, "region":response["region"], "c": response["currentConditions"]["temp"]["c"], "type": response["currentConditions"]["comment"], "tc": response["next_days"][0]["max_temp"]["c"], "ttype": response["next_days"][0]["comment"]})


@teacherGuard
def teacher_get_courses(req):
    username = req.GET.get("username", "")
    result = run_statement(f"SELECT course_name FROM Courses WHERE teacher_username = '{username}' ")
    
    if result:
        return JsonResponse({username:result})
    else:
        return JsonResponse({username:"User is not registered or not a teacher"})
