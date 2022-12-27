from unittest.mock import Mock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class FavoriteUnfavorite(APITestCase):
    def setUp(self):
        url = reverse('register')
        data = {
            "username": "ege.taga",
            "email": "ege.taga@boun.edu.tr",
            "password": "123123"
        }
        response = self.client.post(url, data, format='json')

        self.token = response.data.get('token')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

    def test_favorite_unfavorite(self):
        # create learning space first
        url = reverse('learning-space')
        data = {
            "name": 'Guitar',
            "tag": "music",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        learning_space_id = response.data['id']


        data = {
            "learningSpace": learning_space_id,
        }
        url = reverse('favorite')
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('unfavorite')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK
)

     


