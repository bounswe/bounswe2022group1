from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
class ProfileTest(APITestCase):
    def setUp(self):
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
        self.token = response.data.get('token')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        

    
    def test_post_profile(self):
        url = reverse('profile')
        data = {
            "about_me": 'student',
            "image": "imagestring",
        }
        response = self.client.post(url, data, format='json')
    
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['about_me'], 'student')
        self.assertEqual(response.data['image'], 'imagestring')
        print("Test: profile post method test is passed ")


    def test_get_profile(self):
        url = reverse('profile')
        data = {
            "about_me": 'student',
            "image": "imagestring",
        }
        response = self.client.post(url, data, format='json')
        id = response.data['id']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('profile')
        response = self.client.get(url, {'id': id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['about_me'], 'student')
        self.assertEqual(response.data['image'], 'imagestring')
        print("Test: profile get method test is passed ")
    
    def test_patch_learning_space(self):
        url = reverse('profile')
        data = {
            "about_me": 'student',
            "image": "imagestring",
        }
        response = self.client.post(url, data, format='json')
        id = response.data['id']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('profile')
        data = {
           
            "image": "imagestring1",
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['about_me'], 'student')
        self.assertEqual(response.data['image'], 'imagestring1')
        print("Test: profile patch method test is passed ")
    
    
    