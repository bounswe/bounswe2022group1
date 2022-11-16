from xmlrpc.client import ResponseError
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token



class ChangePasswordTest(APITestCase):
    
        def test_change_password_account(self):
                """
                Ensure we can login using API
                """
                url = reverse('register')
                data = {
                        "username": "ege_onur",
                        "email": "ege_taga@hotmail.com",
                        "password": "ege_ege_123"}
                response = self.client.post(url, data, format='json')
                url = reverse('login')
                data = {
                        "username": "ege_onur",
                        "password": "ege_ege_123"}
        
                response = self.client.post(url, data, format='json')
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                token = response.data.get('token')

                client = APIClient()
                client.credentials(HTTP_AUTHORIZATION='Token ' + token)

                
                url = reverse('change-password')

                data = {
                        "old_pass": "ege_ege_13",
                        "new_pass": "egeonur12345"

                    }

                    

                
        
                response = client.put(url, data, format='json')
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


                print("Test: wrong old password test is passed")

                

               
                
                
                data = {
                        "old_pass": "ege_ege_123",
                        "new_pass": "egeonur12345"

                    }

                    

                
        
                response = client.put(url, data, format='json')
                self.assertEqual(response.status_code, status.HTTP_200_OK)


                print("Test: change password test is passed")

