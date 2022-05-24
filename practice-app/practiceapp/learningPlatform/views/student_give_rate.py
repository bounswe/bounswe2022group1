from cmath import exp
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import studentGuard
import requests
from django import forms
import json
from django.http import JsonResponse
import environ
from django.views.decorators.csrf import csrf_exempt
##################
### Efekan Kavalcı ###
##################

env = environ.Env()
environ.Env.read_env()

@studentGuard
def student_give_rate(req):
   u = req.session.get('user')['username']
   query =f"SELECT course_name FROM Enrolls WHERE student_username='{u}'"
   result=run_statement(query)
   arr = [i[0] for i in result]
   context = {}
   context['courses'] = arr

   category = 'learning'
   api_url = 'https://api.api-ninjas.com/v1/quotes?category={}'.format(category)
   response = requests.get(api_url, headers={'X-Api-Key': env("API_KEY_give_rate")})
   if response.status_code == requests.codes.ok:
      y = json.loads(response.text)
      context['quote'] = y[0]['quote']
      context['author'] = y[0]['author']
   else:
      context['quote'] = '-'
      context['author'] = '-'

   return render(req,'student_give_rate.html', context)

   
   
def student_give_rate_entered(req):
   course_name=req.POST["course_name"]
   rate=int(req.POST['rate'])
   #if rate > 5 or rate < 0:
   #   return JsonResponse({'Status':'false'})
   query =f"SELECT rating, rate_count FROM Courses WHERE course_name='{course_name}'"
   result=run_statement(query)
   cur_rate = result[0][0]
   cur_rate_count = result[0][1]

   new_rate_count = cur_rate_count+1
   new_rate = (cur_rate*cur_rate_count + rate) / new_rate_count

   upt = f"UPDATE Courses SET rating='{new_rate}', rate_count='{new_rate_count}' WHERE course_name='{course_name}'" 
   run_statement(upt)
   return HttpResponseRedirect("/student")
   #return JsonResponse({'Status':'true'})


#student/student_give_rate/get/?course_name=<course_name>
#GET operation for API
def student_get_rate(req):
   try:
      course_name = req.GET.get("course_name", "")
      # SQL query
      query = f"SELECT rating FROM Courses WHERE course_name='{course_name}'"
      result = run_statement(query)
      # Passing result JSON to html
      return JsonResponse({'Course Rate': result[0][0]})
   
   except:
      return HttpResponseBadRequest()

#student/student_give_rate/post/?course_name=<course_name>&rate=<rate>
#POST operation for API
@csrf_exempt
def student_post_rate(req):
   try:
      rate = int(req.POST.get("rate", ""))
      course_name = req.POST.get("course_name", "")
      if rate > 5 or rate < 0:
         return HttpResponseBadRequest()
      query =f"SELECT rating, rate_count FROM Courses WHERE course_name='{course_name}'"
      result=run_statement(query)
      cur_rate = result[0][0]
      cur_rate_count = result[0][1]

      new_rate_count = cur_rate_count+1
      new_rate = (cur_rate*cur_rate_count + rate) / new_rate_count

      upt = f"UPDATE Courses SET rating='{new_rate}', rate_count='{new_rate_count}' WHERE course_name='{course_name}'" 
      run_statement(upt)
      # Passing result JSON to html
      return JsonResponse({'New Course Rate': new_rate,'New Rate Count':new_rate_count})
   
   except:
      return HttpResponseBadRequest()