from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect, JsonResponse
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import teacherGuard
import requests
import environ


env = environ.Env()
environ.Env.read_env()
dbname=env("MYSQL_DATABASE")

##################
### Kamil Korkut ###
##################


#for back button
@teacherGuard
def teacher_my_courses_back(req):
    return HttpResponseRedirect("/teacher")

#shows list of courses and external api
#GET METHOD
@teacherGuard
def teacher_my_courses(req):
    username = req.session["user"]["username"]
    result = run_statement(f"SELECT course_name FROM {dbname}.Courses WHERE teacher_username = '{username}' ")
    
    response = requests.get("https://api.coindesk.com/v1/bpi/currentprice.json").json()
    
    finalResult = []
    for i in result:
        finalResult.append(i[0])
    
    return render(req, 'teacher_my_courses.html', {"teacher_courses_list": finalResult, "bpi":response["bpi"]["USD"]["rate"], "time":response["time"]["updated"]})

#shows list of courses of given username
#GET METHOD
def teacher_get_courses(req):
    username = req.GET.get("username", "")
    result = run_statement(f"SELECT course_name FROM {dbname}.Courses WHERE teacher_username = '{username}' ")
    
    if result:
        return JsonResponse({username:result}, status=200)
    else:
        return JsonResponse({username:"User is not registered or not a teacher"}, status=404)

#updates course name
#POST METHOD
@teacherGuard
def teacher_update_course(req):
    username = req.session["user"]["username"]
    course_name=req.POST["course_name"]
    new_name=req.POST["new_name"]
    check = run_statement(f"SELECT * FROM {dbname}.Courses WHERE course_name='{course_name}' and teacher_username='{username}'")
    
    if check:
        result = run_statement(f"UPDATE {dbname}.Courses SET course_name='{new_name}' WHERE course_name='{course_name}'")
        return JsonResponse({username:"Success"}, status=200)
    else:
        return JsonResponse({username:"Error"}, status=404)
