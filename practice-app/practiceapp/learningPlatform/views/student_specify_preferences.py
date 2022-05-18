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


##################
### Ege Onur Taga ###
##################

# student_preferences_get, student_preferences_post

def student_specify_preferences(req):
   
   my_req = HttpRequest()
   my_req.method = "GET"
   student_username = req.session.get("user", dict()).get("username", "")
   my_req.GET = {'student_username': student_username}
   student_preferences_response_object = student_preferences_get(my_req)


   if student_preferences_response_object.status_code == 200:
      preferences_content = json.loads(student_preferences_response_object.content)
      return render(req,"student_specify_preferences.html", {"preferences_content": preferences_content.get("preference_list", []), "success": True } )


   return render(req,'student_specify_preferences.html', {"success": False } )


def student_specify_preferences_entered(req):
   pass
   ##############
   ## your code ##
   ##############

@csrf_exempt
@require_http_methods(["GET"])
def student_preferences_get(req):
   student_username = req.GET.get("student_username", "")
   query = f"SELECT * FROM Preferences WHERE student_username='{student_username}'"
   result = run_statement(query)
   modified_result = []
   for res in result:
      modified_result.append([res[1], res[2]])


   final_result = {"preference_list":modified_result}
   return JsonResponse(final_result)

@csrf_exempt
@require_http_methods(["POST"])
def student_preferences_post(req):
   student_username = req.POST['student_username']
   topic = req.POST['topic']
   level = req.POST['level']
   query = f"INSERT INTO Preferences VALUES('{student_username}', '{topic}','{level}');"
   result = run_statement(query)
   response = {"student_username":student_username, "topic":topic, "level":level }
   return JsonResponse(response)









