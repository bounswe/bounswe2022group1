from django.urls import reverse
from django.test import TestCase

class TestStudentMyCourses(TestCase):

    def setUp(self):
        self.student_my_courses_url = reverse("student_my_courses_json")
        self.student_my_courses_seen_url = reverse("student_my_courses_seen")
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

    def test_student_my_courses(self):
        i = 1
        res = self.client.get(self.student_my_courses_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["error"], "Student not found!")
        i += 1
        res = self.client.get(self.student_my_courses_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["error"], "Student not found!")
        i += 1
        res = self.client.get(self.student_my_courses_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["error"], "Student not found!")
        i += 1
        res = self.client.get(self.student_my_courses_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["data"], ["CMPE150", "CMPE160"])
        i += 1
        res = self.client.get(self.student_my_courses_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["data"], ["CMPE150", "CMPE160"])
        i += 1
        res = self.client.get(self.student_my_courses_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["data"], ["CMPE220", "CMPE230"])
        i += 1
        res = self.client.get(self.student_my_courses_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["data"], ["CMPE220", "CMPE230"])
        i += 1
        res = self.client.get(self.student_my_courses_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["data"], ["CMPE240", "CMPE250"])
        i += 1
        res = self.client.get(self.student_my_courses_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["data"], ["CMPE240", "CMPE250"])
        i += 1

    def test_student_my_courses_seen(self):
        i = 1
        res = self.client.post(self.student_my_courses_seen_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["message"], "Student not found!")
        i += 1
        res = self.client.post(self.student_my_courses_seen_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["message"], "Student not found!")
        i += 1
        res = self.client.post(self.student_my_courses_seen_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["message"], "Student not found!")
        i += 1
        res = self.client.post(self.student_my_courses_seen_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["message"], "Updated!")
        i += 1
        res = self.client.post(self.student_my_courses_seen_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["message"], "Updated!")
        i += 1
        res = self.client.post(self.student_my_courses_seen_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["message"], "Updated!")
        i += 1
        res = self.client.post(self.student_my_courses_seen_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["message"], "Updated!")
        i += 1
        res = self.client.post(self.student_my_courses_seen_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["message"], "Updated!")
        i += 1
        res = self.client.post(self.student_my_courses_seen_url + "?username=quanex" + str(i))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["message"], "Updated!")
        i += 1