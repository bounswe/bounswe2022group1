from django.db import models


class Annotation(models.Model):
    content_id = models.IntegerField()
    annotation_string = models.TextField()
