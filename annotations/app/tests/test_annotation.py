from unittest.mock import Mock
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class AnnotationTest(APITestCase):

    def test_annotations(self):

        url = reverse('annotation')
        data = {
            "content_id": 1,
            "annotation_string": "ejfgbejhfbnefhjnb", 
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = {
            "content_id": 1,
        }
        
        response = self.client.get(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = {
            "id": 1,
            "annotation_string": "ejfgbdwdwdwdejhfbnefhjnb", 
        }
        response = self.client.patch(url, data,  format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        url = reverse('delete-annotation')
        data = {
            "id": 1,
        }
        response = self.client.post(url, data,  format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)




 