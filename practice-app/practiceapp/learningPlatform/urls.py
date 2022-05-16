from django.urls import path
from . import views

urlpatterns = [
    
    ##login and logout pages
    path('login/', views.authentication.login, name="index"),
    path('login/query/', views.authentication.loginQuery, name="loginQuery"),
    
    path('logout/query/', views.authentication.logoutQuery, name="logoutQuery"),
    
    ##sign-up
    path('sign_up',views.sign_up.sign_up,name="sign_up"),
    path('sign_up_entered',views.sign_up.sign_up_entered,name="sign_up_entered"),
    
    ## student pages
    path('student/',views.student.student, name="student"),
    path('student/student_enroll',views.student_enroll.student_enroll, name="student_enroll"),
    path('student/student_enroll_entered',views.student_enroll.student_enroll_entered, name="student_enroll_entered"),
    path('student/student_give_rate',views.student_give_rate.student_give_rate, name="student_give_rate"),
    path('student/student_give_rate_entered',views.student_give_rate.student_give_rate_entered, name="student_give_rate_entered"),
    path('student/student_my_courses/', views.student_my_courses.student_my_courses, name="student_my_courses"),
    path('student/student_my_courses_back/', views.student_my_courses.student_my_courses_back, name="student_my_courses_back"),
    path('student/student_search_course',views.student_search_course.student_search_course, name="student_search_course"),
    path('student/student_search_course_entered',views.student_search_course.student_search_course_entered, name="student_search_course_entered"),
    
    ## teacher pages
    path('teacher/',views.teacher.teacher, name="teacher"),
    path('teacher/teacher_add_course',views.teacher_add_course.teacher_add_course, name="teacher_add_course"),
    path('teacher/teacher_add_course_entered',views.teacher_add_course.teacher_add_course_entered, name="teacher_add_course_entered"),
    path('teacher/teacher_course_statistics',views.teacher_course_statistics.teacher_course_statistics, name="teacher_course_statistics"),
    path('teacher/teacher_delete_course',views.teacher_delete_course.teacher_delete_course, name="teacher_delete_course"),
    path('teacher/teacher_delete_course_entered',views.teacher_delete_course.teacher_delete_course_entered, name="teacher_delete_course_entered"),
    path('teacher/teacher_my_courses',views.teacher_my_courses.teacher_my_courses, name="teacher_my_courses"),

]
