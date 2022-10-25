from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect, HttpRequest
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import studentGuard
import json
import requests
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import environ


env = environ.Env()
environ.Env.read_env()

##################
### Ege Onur Taga ###
##################

# student_preferences_get, student_preferences_post
@studentGuard
@require_http_methods(["GET"])
def student_specify_preferences(req):
   success =  True if req.GET.get('success', 'true')=='true' else False
   error = req.GET.get("error","")

   my_req = HttpRequest()
   my_req.method = "GET"
   student_username = req.session.get("user", dict()).get("username", "")
   my_req.GET = {'student_username': student_username}
   student_preferences_response_object = student_preferences_get(my_req)


   if student_preferences_response_object.status_code == 200:
      preferences_content = json.loads(student_preferences_response_object.content)
      values = preferences_content.values()
      preferences_list = []
      for value in values:
         topic = value['topic']
         response = requests.get(f'https://en.wikipedia.org/w/rest.php/v1/search/title?q={topic}&limit=1')
         content = json.loads(response.content)
         content_pages = content['pages']
         if len(content_pages) == 0:
            preferences_list.append([value['topic'], value['level'], 'There is no entry in wikipedia for this topic.' ])
         else:
            preferences_list.append([value['topic'], value['level'], content_pages[0].get('description', 'There is no entry in wikipedia for this topic.')])

      return render(req,"student_specify_preferences.html", {"preferences_content": preferences_list, "success": True, "error":error } )

   return render(req,'student_specify_preferences.html', {"success": False, "error":error } )

@studentGuard
@require_http_methods(["POST"])
def student_specify_preferences_entered(req):
   topic = req.POST.get('topic', False)
   level = req.POST.get('level', False)
   student_username = req.session.get("user", dict()).get("username", "")
   password = ''

   try:
      query=f"SELECT password FROM Users WHERE username='{student_username}' AND is_teacher=False;"
      return_result = run_statement(query)
      password = return_result[0][0]
   except:
      return HttpResponseRedirect('/student/student_specify_preferences?success=false&error='+ 'There is no user with given username and password.' )


   if level != 'Beginner' and level != 'Intermediate' and level != 'Advanced':
      return HttpResponseRedirect('/student/student_specify_preferences?success=false&error='+'The level should be Beginner, Intermediate or Advanced. Case Sensitive.' )
    
   cust_req = HttpRequest()
   cust_req.method = "POST"
   cust_req.POST = {'student_username': student_username, 'password': password, 'topic': topic, 'level':level}
   response_obj = student_preferences_post(cust_req)
   
   if response_obj.status_code == 200:
      content = json.loads(response_obj.content)
      status = content.get('status', 'true')
      error = content.get('error', '')
      return HttpResponseRedirect(f'/student/student_specify_preferences?success={status}&error={error}')
   
   return HttpResponseRedirect('/student/student_specify_preferences?success=fail&error=' + 'Cannot update the preferences.')

   
   
#student/preferences/get/?student_username=<name>
@csrf_exempt
@require_http_methods(["GET"])
def student_preferences_get(req):
   student_username = req.GET.get('student_username', "")
   query = f"SELECT Preferences.topic, Preferences.level FROM Preferences WHERE student_username='{student_username}';"
   result = run_statement(query)
   modified_result = dict()
   for i in range(len(result)):
      preference_name = f'preference_{(i+1)}'
      modified_result[preference_name] = {'topic':result[i][0], 'level':result[i][1]}

   j_response = JsonResponse(modified_result)
   return j_response
#student/preferences/post/
#send the JSON
@csrf_exempt
@require_http_methods(["POST"])
def student_preferences_post(req):
   student_username = req.POST.get('student_username', False)
   password = req.POST.get('password', False)
   topic = req.POST.get('topic', False)
   level = req.POST.get('level', False)

   if student_username == False or password == False or topic == False or level == False:
      return JsonResponse({'status': 'false', 'error': 'Please specify student_username, password, topic and level.'})

   try:
      query=f"SELECT * FROM Users WHERE username='{student_username}' AND password='{password}' AND is_teacher=False;"
      return_result = run_statement(query)
      if len(return_result) == 0:
         return JsonResponse({'status': 'false', "error":"There is no student with given username and password." })
   except:
      return JsonResponse({'status': 'false', "error":"An error occurred while searching the query in the database" })

   if level != 'Beginner' and level != 'Intermediate' and level != 'Advanced':
      return JsonResponse({'status': 'false', "error":"The level should be Beginner, Intermediate or Advanced. Case Sensitive." })



   response = dict()
   try:
      query = f"INSERT INTO Preferences VALUES('{student_username}', '{topic}','{level}');"
      run_statement(query)
      response = {'status':'true',  'student_username':student_username, 'topic':topic, 'level':level }
   except:
      return JsonResponse({'status': 'false', "error":"Error! Non-unique student_username-topic pair." })
   
   return JsonResponse(response)










