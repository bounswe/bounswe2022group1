from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import guestGuard, studentGuard,teacherGuard
import json
import requests
from django.http import JsonResponse
from django.test.client import Client
## Holding API KEY
import environ

env = environ.Env()
environ.Env.read_env()



##################
### Kadir Gökhan Sezer ###
##################
'''
   I could not find any endpoint to post online, instead i leave my post request code segment from my professional work. 
   Just adding "params" parameter with a dictionary is enough to send data. We also use put and remove requests.   
   response = requests.post(
         cfg.getGUISettings().uri,
         data={"grant_type": "client_credentials",
               "scope": "public projects profile tig forum elearning"},
         auth=(cfg.getPublicKey(), cfg.getPrivatKey())
   )
   '''
dbname=env("MYSQL_DATABASE")
lastdeleted=""
entertext="Enter the course name that you want to delete"
def get_funny_url():
   if response:=requests.get('https://api.thecatapi.com/v1/images/search', params={ "limit":1, "size":"full" } ):
      urll=json.loads(response.text)[0]["url"]
      return urll
   return 0
def get_text(fail):
   if fail=="Fail":
      text="Failed. This can be because the course's teacher is not you or just a typo."
   elif fail=="Success":
      text="The course is deleted, you can undo by the button."
   elif fail=="undofail1":
      text="You never deleted a course or the last attemp was not valid."
   elif fail=="undofail2":
      text="The course is already in the db."
   elif fail=="undosuccess":
      text="You saved the course you deleted before."
   else:
      text=entertext
   return text


@require_http_methods(["GET"])  
def getCourses(req):
   username = req.session["user"]["username"]
   dbname=env("MYSQL_DATABASE")
   query = f"SELECT course_name FROM {dbname}.Courses WHERE teacher_username='{username}'"
   result = []
   for i in run_statement(query):
         result.append(i[0])
   return JsonResponse({"courses":result})


@teacherGuard
@require_http_methods(["GET"])
def teacher_delete_course(req):
   text=get_text(req.GET.urlencode()[7:])
   user=req.session["user"]["username"]
   c  = Client()
   #username='quanex1', password='123123a'
   passw=run_statement(f"select password from {dbname}.users where username='{user}'")[0][0]
   c.login(username=user,password=passw)
   c.post("http://127.0.0.1:8000/login/query/",data={"username":user,"password":passw})
   response=c.get("http://127.0.0.1:8000/teacher/getCourses/").json()
   return render(req, 'teacher_delete_course.html', {"my_teacher_courses_list":response["courses"], "photo": get_funny_url(),"enter_text":text})



@teacherGuard
@require_http_methods(["POST"])
def teacher_delete_course_entered(req):
   coursename=""
   coursename=req.POST.get("coursename",False)
   username = req.session["user"]["username"]
   query = f"SELECT course_name FROM {dbname}.Courses WHERE teacher_username='{username}'"
   result = []
   for i in run_statement(query):
         result.append(i[0])
   if coursename in result:
      run_statement(f"DELETE FROM {dbname}.Courses WHERE course_name='{coursename}'")
      query = f"SELECT course_name FROM {dbname}.Courses WHERE teacher_username='{username}'"
      global lastdeleted
      lastdeleted=coursename
      result = []
      for i in run_statement(query):
          result.append(i[0])
      return HttpResponseRedirect("/teacher/teacher_delete_course/?status=Success")
   return HttpResponseRedirect("/teacher/teacher_delete_course/?status=Fail")


@teacherGuard
@require_http_methods(["POST"])
def teacher_delete_course_undo(req):
   text=get_text(req.POST.urlencode()[7:])
   global lastdeleted
   username = req.session["user"]["username"]
   if lastdeleted=="":
      query = f"SELECT course_name FROM {dbname}.Courses WHERE teacher_username='{username}'"
      result = []
      for i in run_statement(query):
         result.append(i[0])
      return render(req, 'teacher_delete_course.html', {"my_teacher_courses_list": result, "photo": get_funny_url(),"enter_text":"Failed.You never deleted a course or the last attemp was not valid."},status=408)
   else:
      query = f"SELECT course_name FROM {dbname}.Courses WHERE teacher_username='{username}'"
      result=[]
      for i in run_statement(query):
         result.append(i[0])
      if lastdeleted in result:
         return render(req, 'teacher_delete_course.html', {"my_teacher_courses_list": result, "photo": get_funny_url(),"enter_text":"Failed.The course is already in the db."},status=409)
      query = f'INSERT INTO {dbname}.Courses VALUES("{lastdeleted}", "{username}", 0.0, 0);'
      run_statement(query)
      query = f"SELECT course_name FROM {dbname}.Courses WHERE teacher_username='{username}'"
      result = []
      for i in run_statement(query):
         result.append(i[0])
      return render(req, 'teacher_delete_course.html', {"my_teacher_courses_list": result, "photo": get_funny_url(),"enter_text":"Success.You saved the course you deleted before."},status=204)

