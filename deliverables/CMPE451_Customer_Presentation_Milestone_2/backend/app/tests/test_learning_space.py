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

        self.token = response.data.get('token')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

    
    def test_create_learning_space(self):
        url = reverse('learning-space')
        data = {
            "name": 'Guitar',
            "tag": "music",
        }
        response = self.client.post(url, data, format='json')
    
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Guitar')
        self.assertEqual(response.data['tag'], 'music')


    def test_get_learning_space(self):
        url = reverse('learning-space')
        data = {
            "name": 'Guitar',
            "tag": "music",
        }
        response = self.client.post(url, data, format='json')
        id = response.data['id']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('learning-space')
        response = self.client.get(url, {'id': id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Guitar')
        self.assertEqual(response.data['tag'], 'music')
    