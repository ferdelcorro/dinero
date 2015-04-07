# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User


class Producto(models.Model):
    nombre = models.CharField('Nombre del producto', max_length=30)
    descripcion = models.TextField(
                    'Descripcion', max_length=800,
                    blank=True, null=True
                )

    user = models.ForeignKey(
                User, related_name='producto_persona',
                blank=True, null=True
        )

    def __unicode__(self):
        return self.nombre