import json
from django.test import TestCase
from learningPlatform.views import sign_up
from django.http import HttpRequest
from django.test import TestCase
from django.db import connection



class sign_up_test(TestCase):
      

    def test_can_sign_up(self):
        my_req = HttpRequest()
        my_req.method = "GET"
        
        my_req.GET={
        'post_name_surname':'Ömer Özdemir',
        'post_username':'quanex0000',
        'post_password':'sifreyok',
        'post_is_teacher':True
        }

        can_sign_up_response_object=sign_up.can_sign_up(my_req)
        
        
        
        