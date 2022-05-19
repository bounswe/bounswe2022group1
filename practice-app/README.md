## Requirements (COPY)

- MySQL
- Python(>3.8) and pip module.

If you have these, then run the following code:
``
In order to prevent any possible conflicts, you can set up a virtual environment. You can learn more about virtual environments on [here](https://docs.python.org/3/library/venv.html#module-venv)

## Deployment

First, Create a database on a sql ide (mysql) with <YOUR_DB_NAME>

Second, create an .env file in "practiceapp" folder (folder with the settings.py file), and insert:

```
MYSQL_DATABASE="MYSQL_DATABASE"
MYSQL_USER="MYSQL_USER"
MYSQL_ROOT_PASSWORD="MYSQL_PASSWORD"
MYSQL_PASSWORD="MYSQL_PASSWORD"
MYSQL_HOST="localhost"
```

After that, ensure that your database server is up and run these commands to set up the database to Django configurations:

```
python manage.py makemigrations
python manage.py migrate
```

This will create some Django related tables on the database (Do not alter them otherwise framework may fail).

Then, you can run this command to create up and fill relevant tables (Note: execute this command in the root folder of project):

```
python practiceapp/create_db.py
```

Finally, run the command:
`python manage.py runserver`
and check whether the website is accessible at: [http://127.0.0.1:8000/learningPlatform/](http://127.0.0.1:8000/learningPlatform/)



def teacher_course_statistics(req):
   #Retrieve data from the request body
    try:
        courseName=req.POST["course_name"]
        run_statement(f"CALL getStatistics('{courseName}')")
        return HttpResponseRedirect("../course-statistics")

    except Exception as e:
        print(str(e))
        return HttpResponseRedirect('../course-statistics?fail=true')







<!DOCTYPE html>

<html lang="en">
<head>
  	<title>Course Statistics</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <style>
        table, th, td {
            border: 1px solid;
        }
        .center {
            margin-left: auto;
            margin-right: auto;
            justify-content: center;
        }
        form { 
            margin: 0 auto; 
            width:250px;
        }
    </style>
</head>
<body>
    <div class="container">
        <table class="center">
            <colgroup>
                <col span="1" style="width: 25%;">
                <col span="1" style="width: 20%;">
                <col span="1" style="width: 25%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 10%;">
            </colgroup>
            <tr>
                <th>Date</th>
                <th>Course Name</th>
                <th>Teacher Name</th>
                <th>Total Student</th>
                <th>Rating</th>
                <th>Rate Count</th>
            </tr>
            {% for row in results %}
            <tr>
                {% for value in row %}
                <td>
                    {{value}}
                </td>
                {% endfor %}
            </tr>
            {% endfor %}
        </table>
    </div>
    <div class="center">
        {% if action_failx %}
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Getting Instant Statistics Failed.</h4>
                <p>Cannot get.</p>
            </div>
         {% endif %}
        <form id="postform" class="form-group" method="POST" action="{%url 'getStatistics' %}">
                {%csrf_token%}
                <br>
                <label>Get Statistics:</label>
                <br>
                <input type="text" name="courseName" placeholder="Course Name" required>
                <br>
                <input type="submit" name="submit" value="Get!">
                <br>
        </form>
    </div>
    <div class="center">
        {% if action_fail %}
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Saving Course Statistics Failed</h4>
                <p>Cannot save</p>
            </div>
         {% endif %}
        <form id="postform" class="form-group" method="POST" action="{%url 'saveStatistics' %}">
                {%csrf_token%}
                <br>
                <label>Save Statistics:</label>
                <br>
                <input type="text" name="courseName" placeholder="Course Name" required>
                <br>
                <input type="submit" name="submit" value="Save!">
                <br>
        </form>
    </div>
    <a href="{%url '/teacher/course-statistics' %}"> <p style="text-align:center">Turn Back</p></a>

</body>
</html>
