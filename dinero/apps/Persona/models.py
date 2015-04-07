# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User


class Persona(models.Model):
    foto = models.ImageField(
        upload_to="img/persona/", null=True, blank=True
    )

    def __unicode__(self):
        return self.user.get_full_name()