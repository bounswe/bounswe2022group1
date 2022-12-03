from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class LoginTest(APITestCase):
    
        def test_create_login_account(self):
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

        print("Test: Correct registration API")

