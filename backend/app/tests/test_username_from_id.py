from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class GetUserFromIDTest(APITestCase):
   
    def test_get_user_name_from_id(self):
        url = reverse('register')
        data = {
                "username": "egetaga",
                "email": "egetag@gmail.com",
                "password": "123123"}
        response = self.client.post(url, data, format='json')
        user= response.data.get('user')
        id=user["id"]
        username = user["username"]
        email = user["email"]
        url = reverse('login')
        data = {
                "username": "egetaga",
                "password": "123123"}

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.token = response.data.get('token')
        
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        url = reverse('user-from-id')
       
        response = self.client.get(url, {'id': id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], id)
        self.assertEqual(response.data['username'], username)
        self.assertEqual(response.data['email'], email)
        print("Test: get username from id test is passed ")
    
    
    