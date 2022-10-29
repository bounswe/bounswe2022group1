from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class RegisterTest(APITestCase):
    def test_create_account(self):
        """
        Ensure we can register using the API. 
        """
        url = reverse('register')
        data = {
                "username": "ege_onur",
                 "email": "ege_taga@hotmail.com",
                    "password": "ege_ege_123"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    

    print("Test: Correct registration API")
