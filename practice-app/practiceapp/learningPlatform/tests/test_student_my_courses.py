from django.urls import reverse
from django.test import TestCase

from ..db_utils import run_statement
import environ
env = environ.Env()
environ.Env.read_env()
dbname=env("MYSQL_DATABASE")

class TestStudentMyCourses(TestCase):

    def setUp(self):
        run_statement(f"USE {dbname};")
        self.student_my_courses_url = reverse("student_my_courses_json")
        self.student_my_courses_seen_url = reverse("student_my_courses_seen")
        return super().setUp()

    def tearDown(self):
        run_statement(f"USE {dbname};")
        return super().tearDown()

    def test_student_my_courses(self):
        run_statement(f"USE {dbname};")
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
        run_statement(f"USE {dbname};")
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