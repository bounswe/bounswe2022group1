from django.test import SimpleTestCase
from learningPlatform.forms import signUpForm #


class TestForms(SimpleTestCase):
    
    
    def test_valid_sign_up(self):
        form = signUpForm(data={
        'name_surname':'Ömer Özdemir',
        'username':'quanex0000',
        'password':'sifreyok',
        'is_teacher':True
        })
        
        self.assertTrue(form.is_valid())
        
        
    def test_no_data_sign_up(self):
        form=signUpForm(data={})
    
    
        self.assertFalse(form.is_valid())
        self.assertEquals(len(form.errors),4)
    
    print("All tests are successful!")