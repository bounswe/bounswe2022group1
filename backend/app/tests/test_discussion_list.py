from unittest.mock import Mock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class DiscussListTest(APITestCase):
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

    def test_discuss_list(self):

        url = reverse('learning-space')
        data = {
            "name": 'Guitar',
            "tag": "music",
        }
        response = self.client.post(url, data, format='json')
        learning_space_id = response.data['id']

        # create content
        url = reverse('content')
        data = {
            "learningSpace": learning_space_id,
            "name": "Content About Guitar",
            "text": "this is a testing content",
            "type": "text",
        }

        response = self.client.post(url, data, format='json')
        content_id = response.data['id']
        data = {
            "content": content_id,
            "body": "I really like the discussion here.",
        }

        url = reverse('discussion')
        response = self.client.post(url, data, format='json')

        data = {
            "content": content_id,
            "body": "I really like the discussion here.",
        }
        response = self.client.post(url, data, format='json')

        url = reverse('discussion-list')

        response = self.client.get(url, {'content_id': content_id}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)