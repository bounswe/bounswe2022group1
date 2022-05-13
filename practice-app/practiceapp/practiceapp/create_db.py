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
#Create tables
cursor.execute("""
CREATE TABLE IF NOT EXISTS Users (
username TEXT PRIMARY KEY,
name_surname varchar(200),
is_teacher BOOL,
password TEXT NOT NULL,
);""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Courses (
course_name TEXT NOT NULL PRIMARY KEY,
teacher_name TEXT NOT NULL,
instructor_username TEXT NOT NULL,
rating FLOAT DEFAULT 0.0,
rate_count INT DEFAULT 0,
FOREIGN KEY(instructor_username,teacher_name) REFERENCES Users(username,name_surname) ON UPDATE CASCADE ON DELETE CASCADE
);""")


cursor.execute("""
CREATE TABLE IF NOT EXISTS Enrolls (
student_username TEXT NOT NULL,
student_name TEXT NOT NULL,
course_name TEXT NOT NULL,
PRIMARY KEY (student_username,course_name),
FOREIGN KEY(student_username,student_name) REFERENCES Users(username,name_surname) ON UPDATE CASCADE ON DELETE CASCADE
);""")



connection.commit()

cursor.execute('INSERT INTO Users VALUES("quanex1","Mustafa Atay",true,"123123a");')
cursor.execute('INSERT INTO Users VALUES("quanex2","Ömer Özdemir",true,"123123b");')
cursor.execute('INSERT INTO Users VALUES("quanex3","Ahmet Yazıcı",true,"123123c");')
cursor.execute('INSERT INTO Users VALUES("quanex4","Ege Onur Taga",false,"123123d");')
cursor.execute('INSERT INTO Users VALUES("quanex5","Efekan Kavalcı",false,"123123e");')
cursor.execute('INSERT INTO Users VALUES("quanex6","Ece Sarkın",false,"123123f");')
cursor.execute('INSERT INTO Users VALUES("quanex7","Kadir Gökhan Sezer",false,"123123g");')
cursor.execute('INSERT INTO Users VALUES("quanex8","Harun Erkurt",false,"123123h");')
cursor.execute('INSERT INTO Users VALUES("quanex9","Kamil Korkut",false,"123123j");')


cursor.execute('INSERT INTO Courses VALUES("CMPE150","Mustafa Atay","quanex1");')
cursor.execute('INSERT INTO Courses VALUES("CMPE160","Mustafa Atay","quanex1");')

cursor.execute('INSERT INTO Courses VALUES("CMPE220","Ömer Özdemir","quanex2");')
cursor.execute('INSERT INTO Courses VALUES("CMPE230","Ömer Özdemir","quanex2");')

cursor.execute('INSERT INTO Courses VALUES("CMPE240","Ahmet Yazıcı","quanex3");')
cursor.execute('INSERT INTO Courses VALUES("CMPE250","Ahmet Yazıcı","quanex3");')



cursor.execute('INSERT INTO Enrolls VALUES("quanex4","Ege Onur Taga","CMPE150" );')
cursor.execute('INSERT INTO Enrolls VALUES("quanex4","Ege Onur Taga","CMPE160" );')

cursor.execute('INSERT INTO Enrolls VALUES("quanex5","Efekan Kavalcı","CMPE150" );')
cursor.execute('INSERT INTO Enrolls VALUES("quanex5","Efekan Kavalcı","CMPE160" );')

cursor.execute('INSERT INTO Enrolls VALUES("quanex6","Ece Sarkın","CMPE220" );')
cursor.execute('INSERT INTO Enrolls VALUES("quanex6","Ece Sarkın","CMPE230" );')

cursor.execute('INSERT INTO Enrolls VALUES("quanex7","Kadir Gökhan Sezer","CMPE220" );')
cursor.execute('INSERT INTO Enrolls VALUES("quanex7","Kadir Gökhan Sezer","CMPE230" );')

cursor.execute('INSERT INTO Enrolls VALUES("quanex8","Harun Erkurt","CMPE240" );')
cursor.execute('INSERT INTO Enrolls VALUES("quanex8","Harun Erkurt","CMPE250" );')

cursor.execute('INSERT INTO Enrolls VALUES("quanex9","Kamil Korkut","CMPE240" );')
cursor.execute('INSERT INTO Enrolls VALUES("quanex9","Kamil Korkut","CMPE250" );')


connection.commit()
