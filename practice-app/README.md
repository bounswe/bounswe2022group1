## Requirements (COPY)

- MySQL
- Python(>3.8) and pip module.

If you have these, then run the following code:
`pip install -r requirements.txt`
In order to prevent any possible conflicts, you can set up a virtual environment. You can learn more about virtual environments on [here](https://docs.python.org/3/library/venv.html#module-venv)

## Deployment

First, Create a database on a sql ide (mysql) with <YOUR_DB_NAME>

Second, create an .env file in "practiceapp" folder (folder with the settings.py file), and insert:

```
MYSQL_DATABASE=<YOUR_DB_NAME>
MYSQL_USER=<YOUR_USERNAME>
MYSQL_ROOT_PASSWORD=<YOUR_PASSWORD>
MYSQL_PASSWORD=<YOUR_PASSWORD>
MYSQL_HOST="localhost"

API_KEY_give_rate=<API_KEY_give_rate>
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
