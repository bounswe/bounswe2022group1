from xmlrpc.client import ResponseError
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token



class EnrolledLearningSpaceTest(APITestCase):
    
        def test_EnrolledLearningSpace(self):
                """
                Ensure we can login using API
                """
                url = reverse('register')
                data = {
                        "username": "kadirkalkan",
                        "email": "kadir.kalkan@gmail.com",
                        "password": "kadir_123"}
                response = self.client.post(url, data, format='json')
                url = reverse('login')
                data = {
                        "username": "kadirkalkan",
                        "password": "kadir_123"}
        
                response = self.client.post(url, data, format='json')
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                token = response.data.get('token')

                client = APIClient()
                client.credentials(HTTP_AUTHORIZATION='Token ' + token)

                
                url = reverse('enrolled-learning-spaces')

              
        
                response = client.get(url)
                self.assertEqual(response.status_code, status.HTTP_200_OK)


                print("Test: get enrolled learning spaces test is passed")
                
                