from asyncio.windows_events import NULL
from types import NoneType
from unittest import result
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from ..db_utils import run_statement
from django.views.decorators.http import require_http_methods
from ..guards import studentGuard

#@studentGuard
@require_http_methods(["GET"])
def student(req):
    return render(req, 'student.html', {})

