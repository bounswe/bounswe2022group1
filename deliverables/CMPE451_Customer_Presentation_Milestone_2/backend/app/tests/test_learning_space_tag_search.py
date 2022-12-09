from unittest.mock import Mock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class LearningSpaceTagSearch(APITestCase):
    def setUp(self):
        url = reverse('register')
        data = {
            "username": "ege.taga",
            "email": "ege.taga@boun.edu.tr",
            "password": "ege123"
        }
        response = self.client.post(url, data, format='json')

        self.token = response.data.get('token')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

    def test_learning_space_tag_search(self):

        url = reverse('learning-space')
        data = {
            "name": 'Guitar',
            "tag": "music",
        }
        response = self.client.post(url, data, format='json')
        
        url = reverse('learning-space-tag-search')
        response = self.client.get(url,  {"tag" : "music"} ,format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)