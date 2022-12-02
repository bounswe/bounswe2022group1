from xmlrpc.client import ResponseError
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token



class LogoutTest(APITestCase):
    
        def test_logout_account(self):
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


                url = reverse('logout')
                data = {}
        
                response = client.post(url, data, format='json')
                self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


        print("Test: Correct logout API")