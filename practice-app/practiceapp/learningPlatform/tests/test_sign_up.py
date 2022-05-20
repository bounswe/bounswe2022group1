import json
from django.test import TestCase
from learningPlatform.views import sign_up
from django.http import HttpRequest
from django.test import TestCase
from django.db import connection

from ..db_utils import run_statement
import environ
env = environ.Env()
environ.Env.read_env()
dbname=env("MYSQL_DATABASE")

class sign_up_test(TestCase):
      

    def test_can_sign_up(self):
        run_statement(f"USE {dbname};")
        my_req = HttpRequest()
        my_req.method = "POST"
        
        #for non-existing username
        my_req.POST={
        'post_name_surname':'Ömer Özdemir',
        'post_username':'quanex0000',
        'post_password':'sifreyok',
        'post_is_teacher':True
        }

        self.assertTrue(sign_up.can_sign_up(my_req))
        
        
        
        #for existing username
        
        my_req.POST={
        'post_name_surname':'Ömer Özdemir',
        'post_username':'quanex1',
        'post_password':'sifreyok',
        'post_is_teacher':True
        }
        
        self.assertFalse(sign_up.can_sign_up(my_req))
        
        
    
    def test_do_sign_up(self):
        run_statement(f"USE {dbname};")
        my_req = HttpRequest()
        my_req.method = "POST"
        
        #for non-existing username
        my_req.POST={
        'post_name_surname':'Ömer Özdemir',
        'post_username':'quanex0000',
        'post_password':'sifreyok',
        'post_is_teacher':True
        }

        self.assertTrue(sign_up.do_sign_up(my_req))
        
        
        
        #for existing username
        
        my_req.POST={
        'post_name_surname':'Ömer Özdemir',
        'post_username':'quanex1',
        'post_password':'sifreyok',
        'post_is_teacher':True
        }
        
        self.assertFalse(sign_up.do_sign_up(my_req))
    
    
    def test_all_registered_users(self):
        run_statement(f"USE {dbname};")
        self.assertTrue(sign_up.get_see_all_registered_users(HttpRequest()))
        
    
    def test_random_username_api(self):
        run_statement(f"USE {dbname};")
        self.assertTrue(sign_up.call_external_API())

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        