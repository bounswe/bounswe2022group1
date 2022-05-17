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
username varchar(200),
name_surname varchar(200),
is_teacher BOOL,
password varchar(200) NOT NULL,
last_login_time INT Default NULL,
last_search_time INT Default NULL,
last_course_view_time INT Default NULL,
last_statistics_view_time INT Default NULL,
last_teacher_view_time INT Default NULL,
PRIMARY KEY(username)
);""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Courses (
course_name varchar(200) NOT NULL,
teacher_username varchar(200) NOT NULL,
rating FLOAT DEFAULT 0.0,
rate_count INT DEFAULT 0,
PRIMARY KEY(course_name),
FOREIGN KEY(teacher_username) REFERENCES Users(username) ON UPDATE CASCADE ON DELETE CASCADE
);""")


cursor.execute("""
CREATE TABLE IF NOT EXISTS Enrolls (
student_username varchar(200) NOT NULL,
course_name varchar(200) NOT NULL,
PRIMARY KEY (student_username,course_name),
FOREIGN KEY(student_username) REFERENCES Users(username) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY(course_name) REFERENCES Courses(course_name) ON UPDATE CASCADE ON DELETE CASCADE
);""")



connection.commit()

cursor.execute('INSERT INTO Users (username, name_surname, is_teacher, password) VALUES("quanex1","Mustafa Atay",true,"123123a");')
connection.commit()
cursor.execute('INSERT INTO Users (username, name_surname, is_teacher, password) VALUES("quanex2","Ömer Özdemir",true,"123123b");')
connection.commit()
cursor.execute('INSERT INTO Users (username, name_surname, is_teacher, password) VALUES("quanex3","Ahmet Yazıcı",true,"123123c");')
connection.commit()
cursor.execute('INSERT INTO Users (username, name_surname, is_teacher, password) VALUES("quanex4","Ege Onur Taga",false,"123123d");')
connection.commit()
cursor.execute('INSERT INTO Users (username, name_surname, is_teacher, password) VALUES("quanex5","Efekan Kavalcı",false,"123123e");')
connection.commit()
cursor.execute('INSERT INTO Users (username, name_surname, is_teacher, password) VALUES("quanex6","Ece Sarkın",false,"123123f");')
connection.commit()
cursor.execute('INSERT INTO Users (username, name_surname, is_teacher, password) VALUES("quanex7","Kadir Gökhan Sezer",false,"123123g");')
connection.commit()
cursor.execute('INSERT INTO Users (username, name_surname, is_teacher, password) VALUES("quanex8","Harun Erkurt",false,"123123h");')
connection.commit()
cursor.execute('INSERT INTO Users (username, name_surname, is_teacher, password) VALUES("quanex9","Kamil Korkut",false,"123123j");')
connection.commit()


cursor.execute('INSERT INTO Courses VALUES("CMPE150", "quanex1", 0.0, 0);')
connection.commit()
cursor.execute('INSERT INTO Courses VALUES("CMPE160", "quanex1", 0.0, 0);')
connection.commit()

cursor.execute('INSERT INTO Courses VALUES("CMPE220", "quanex2", 0.0, 0);')
connection.commit()
cursor.execute('INSERT INTO Courses VALUES("CMPE230", "quanex2", 0.0, 0);')
connection.commit()

cursor.execute('INSERT INTO Courses VALUES("CMPE240", "quanex3", 0.0, 0);')
connection.commit()
cursor.execute('INSERT INTO Courses VALUES("CMPE250", "quanex3", 0.0, 0);')
connection.commit()



cursor.execute('INSERT INTO Enrolls VALUES("quanex4", "CMPE150" );')
connection.commit()
cursor.execute('INSERT INTO Enrolls VALUES("quanex4", "CMPE160" );')
connection.commit()

cursor.execute('INSERT INTO Enrolls VALUES("quanex5","CMPE150" );')
connection.commit()
cursor.execute('INSERT INTO Enrolls VALUES("quanex5","CMPE160" );')
connection.commit()

cursor.execute('INSERT INTO Enrolls VALUES("quanex6","CMPE220" );')
connection.commit()
cursor.execute('INSERT INTO Enrolls VALUES("quanex6","CMPE230" );')
connection.commit()

cursor.execute('INSERT INTO Enrolls VALUES("quanex7","CMPE220" );')
connection.commit()
cursor.execute('INSERT INTO Enrolls VALUES("quanex7","CMPE230" );')
connection.commit()

cursor.execute('INSERT INTO Enrolls VALUES("quanex8","CMPE240" );')
connection.commit()
cursor.execute('INSERT INTO Enrolls VALUES("quanex8","CMPE250" );')
connection.commit()

cursor.execute('INSERT INTO Enrolls VALUES("quanex9","CMPE240" );')
connection.commit()
cursor.execute('INSERT INTO Enrolls VALUES("quanex9","CMPE250" );')


connection.commit()
