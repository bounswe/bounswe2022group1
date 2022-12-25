from unittest.mock import Mock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class ContentListTest(APITestCase):
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

    def test_content_list(self):
        # create learning space first
        url = reverse('learning-space')
        data = {
            "name": 'Guitar',
            "tag": "music",
        }
        response = self.client.post(url, data, format='json')
        learning_space_id = response.data['id']

        
        url = reverse('content')

        # create content 1
        data1 = {
            "learningSpace": learning_space_id,
            "name": "Content About Guitar",
            "text": "this is a testing content",
            "type": "text",
        }
        self.client.post(url, data1, format='json')

        # create content 2
        data2 = {
            "learningSpace": learning_space_id,
            "name": "Guitar Chords",
            "url": "www.google.com",
            "type": "video",
        }
        self.client.post(url, data2, format='json')

        # get content list
        url = reverse('content-list')
        response = self.client.get(url, {'learning_space_id': learning_space_id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), 2)
        self.assertEqual(response.data['data'][0]['name'], 'Content About Guitar')
        self.assertEqual(response.data['data'][0]['text'], 'this is a testing content')
        self.assertEqual(response.data['data'][0]['url'], '')
        self.assertEqual(response.data['data'][0]['type'], 'text')
        self.assertEqual(response.data['data'][1]['name'], 'Guitar Chords')
        self.assertEqual(response.data['data'][1]['text'], '')
        self.assertEqual(response.data['data'][1]['url'], 'www.google.com')
        self.assertEqual(response.data['data'][1]['type'], 'video')
        


   
