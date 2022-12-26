from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
class NoteTest(APITestCase):


        
        

    
    def test_note(self):
        ##register
        url = reverse('register')
        data = {
                "username": "kadirkalkan",
                "email": "kadir.kalkan@gmail.com",
                "password": "kadir_123"}
        response = self.client.post(url, data, format='json')
        user= response.data.get('user')
        user_id=user["id"]
        ##login
        url = reverse('login')
        data = {
                "username": "kadirkalkan",
                "password": "kadir_123"}

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.token = response.data.get('token')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
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
        ##create note  test post method
        url = reverse('note')
        data = {
            "body": 'this is my note',
            "content": content_id,
        }
        response = self.client.post(url, data, format='json')
    
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        print("Test: note post method test is passed ")
        ##test get method

        url = reverse('note')
        response = self.client.get(url, {'content_id': content_id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.assertEqual(response.data['data'][0]["body"], "this is my note")
        self.assertEqual(response.data['data'][0]["owner"], user)
        self.assertEqual(response.data['data'][0]["content"], content_id)
        note_id=response.data['data'][0]["id"]
        print("asdasdasdasdasd:::", note_id)
        print("Test: note get method test is passed ")










    
    
    
    