import mysql.connector
import environ

env = environ.Env()
environ.Env.read_env()

connection = mysql.connector.connect(
  host=env("MYSQL_HOST"),
  user=env("MYSQL_USER"),
  password=env("MYSQL_PASSWORD"),
  database=env("MYSQL_DATABASE"),
  auth_plugin='mysql_native_password'
)

cursor= connection.cursor()
#cursor.execute("DROP TABLE IF EXISTS Users, Courses, Enrolls")

cursor.execute("DROP TABLE IF EXISTS Preferences;")
connection.commit()

cursor.execute("DROP TABLE IF EXISTS Enrolls;")
connection.commit()


cursor.execute("DROP TABLE IF EXISTS Courses;")
connection.commit()


cursor.execute("DROP TABLE IF EXISTS Users;")
connection.commit()



