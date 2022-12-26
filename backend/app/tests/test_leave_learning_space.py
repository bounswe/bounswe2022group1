from xmlrpc.client import ResponseError
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token



class leaveApiViewTest(APITestCase):
    
        def test_leaveApiView(self):
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

                url = reverse('learning-space')

                
                
                data = {
                       'name': "cooking",
                        'tag' : "tag"
                        }
              
        
                response = client.post(url, data, format='json')
                learning_space_id = response.data['id']
                self.assertEqual(response.status_code, status.HTTP_201_CREATED)
                print(response.data)
                url = reverse('enroll')

                
                
                data = {
                        "learning_space_id": learning_space_id,
                        }
              
        
                response = client.post(url, data, format='json')
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                
                url = reverse('leave-learning-space')

                
                
                data = {
                        "learning_space_id": learning_space_id,
                        }
              
        
                response = client.post(url, data, format='json')
                self.assertEqual(response.status_code, status.HTTP_200_OK)


                print("Test: leave learning space test is passed")
                
                