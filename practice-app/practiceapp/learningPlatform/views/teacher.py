from asyncio.windows_events import NULL
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from ..guards import teacherGuard
from ..db_utils import run_statement

##################
### Everyone ###
##################

@teacherGuard
@require_http_methods(["GET"])
def teacher(req):
    return render(req, 'teacher.html',{'name_surname': req.session.get('user').get('name_surname')})
