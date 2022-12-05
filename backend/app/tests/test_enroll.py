from unittest.mock import Mock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class EnrollTest(APITestCase):
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

    def test_enroll(self):
        # create learning space first
        url = reverse('learning-space')
        data = {
            "name": 'Guitar',
            "tag": "music",
        }
        response = self.client.post(url, data, format='json')
        learning_space_id = response.data['id']

        # enroll
        data = {
            "learning_space_id": learning_space_id,
        }
        url = reverse('enroll')
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], learning_space_id)
        self.assertEqual(response.data['name'], 'Guitar')
        self.assertEqual(response.data['tag'], 'music')



 