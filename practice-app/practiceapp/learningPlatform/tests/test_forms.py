from django.test import TestCase
from learningPlatform.forms import *
from django.urls import reverse,resolve


class TestForms(TestCase):
    
    @classmethod
    def setUp(self):
        self.name_surname="X"
        self.username="q"
        self.password="1"
        self.is_teacher=True
        
    
    
    def test_valid_sign_up(self):
        data={
        'name_surname':'Ömer Özdemir',
        'username':'quanex0000',
        'password':'sifreyok',
        'is_teacher':True
        }
        
        response=self.client.post(reverse('sign_up_entered'),data)
        self.assertEqual(response.status_code, 302)
        
        
    def test_no_data_sign_up(self):
        form=signUpForm(data={})
        self.assertFalse(form.is_valid())
        self.assertEquals(len(form.errors),4)
    
    
    def test_check_username_exists(self):
        form=signUpFormCheckUsername(data={'check_username':'any_username'})
        self.assertTrue(form.is_valid())
    
    
    
    print("All tests are successful!")