import requests
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..db_utils import run_statement
from ..guards import studentGuard

##################
### Ece Sarkın ###
##################

# External API


@studentGuard
@require_http_methods(["GET"])
def student_enroll(req):
        username = req.session["user"]["username"]
        result = run_statement(f"SELECT course_name FROM Enrolls WHERE student_username = '{username}' ")

        response = requests.get("https://shakespeare-quotes-generator.herokuapp.com/api/v1/quotes/single").json()


        #print(response.text)
        #return render(req,'student_enroll.html')


        finalResult = []
        for i in result:
            finalResult.append(f"{i+1}.) ")
            finalResult.append(i[0])

        return render(req, 'student_enroll.html', {"quotes_list": finalResult})


## return button
@studentGuard
def student_enroll_back(req):
   return HttpResponseRedirect("/student")

def student_enroll_entered(req):
        username=req.session["username"] #Retrieve the username of the logged-in user
        course_name = req.POST.get("course_name") #Retrieve the name of the course from the html file
        run_statement(f"INSERT INTO Enrolls VALUES ( '{username}','{course_name}') ") # insert data into DB
        return render(req,'student.html') # redirect it to the main page.
