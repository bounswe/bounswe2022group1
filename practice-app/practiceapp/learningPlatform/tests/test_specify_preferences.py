from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
import json

from django.http import JsonResponse
import environ

from django.test import TestCase
from learningPlatform.views import student_specify_preferences
from django.contrib.sessions.middleware import SessionMiddleware
from django.http import HttpRequest
from django.test import TestCase
from django.contrib.auth.models import User
from django.test.client import Client


import mysql.connector
from django.db import connection

def run_statement(statement):
    cursor= connection.cursor()
    cursor.execute(statement)
    return cursor.fetchall()