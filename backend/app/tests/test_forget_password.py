from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class forgetpasswordApiViewTest(APITestCase):
    def test_forgetpasswordApiView(self):
        """
        Ensure we can register using the API. 
        """
        url = reverse('register')
        data = {
                        "username": "kadirkalkan",
                        "email": "kkadirkkalkan@gmail.com",
                        "password": "kadir_123"}
        self.client.post(url, data, format='json')
        
        url = reverse('forget_password')

        data = {
        "email": "kkadirkkalkan@gmail.com"}
        
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        print("Test: forget password test is passed ")