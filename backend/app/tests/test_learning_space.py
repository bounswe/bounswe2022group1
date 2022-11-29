from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class LearningSpaceTest(APITestCase):
    def setUp(self):
        url = reverse('register')
        data = {
            "username": "mustafa.atay",
            "email": "mustafa.atay@boun.edu.tr",
            "password": "mustafa1234"
        }
        response = self.client.post(url, data, format='json')

        self.token = response.content['token']

        self.headers = {
            "Authorization": "token {}".format(self.token)
        }
    
    def test_create_learning_space(self):
            """
            Ensure we can login using API
            """
            url = reverse('learning-space')
            data = {
                    "name": 'Guitar',
                    }
            response = self.client.post(url, data, format='json', headers=self.headers)
        
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.content['name'], 'Guitar')



