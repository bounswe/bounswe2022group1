from django.contrib import admin
from .models import LearningSpace, Content, Discussion, Profile


# Register your models here.
admin.site.register(LearningSpace)
admin.site.register(Content)
admin.site.register(Discussion)
admin.site.register(Profile)

