from django.test import TestCase
from learningPlatform.forms import *
#from django.urls import reverse,resolve

import json
from django.http import HttpRequest
from django.test import TestCase
from django.db import connection



class sign_up(TestCase):
      

    def test_valid_sign_up(self):
        my_req = HttpRequest()
        my_req.method = "POST"
        
        my_req.POST={
        'name_surname':'Ömer Özdemir',
        'username':'quanex0000',
        'password':'sifreyok',
        'is_teacher':True
        }
        
        valid_sign_up_response_object=sign_up.valid_sign_up(my_req)
        self.assertEqual(valid_sign_up_response_object.status_code,405)
        
        
    def test_no_data_sign_up(self):
        form=signUpForm(data={})
        self.assertFalse(form.is_valid())
        self.assertEquals(len(form.errors),4)
    
    
    def test_check_username_exists(self):
        form=signUpFormCheckUsername(data={'check_username':'any_username'})
        self.assertTrue(form.is_valid())
    
    
    
    print("All tests are successful!")