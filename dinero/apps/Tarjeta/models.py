# -*- coding: utf-8 -*-
from django.db import models

from apps.Producto.models import Producto

from multiselectfield import MultiSelectField


DIA = (
    ('LU', 'Lunes'),
    ('MA', 'Martes'),
    ('MI', 'Miércoles'),
    ('JU', 'Jueves'),
    ('VI', 'Viernes'),
    ('SA', 'Sábado'),
    ('DO', 'Domingo'),
)


class Tarjeta(models.Model):
    nombre = models.CharField('Nombre de la tarjeta', max_length=30)
    descripcion = models.TextField(
                    'Descripcion', max_length=800,
                    blank=True, null=True
                )

    def __unicode__(self):
        return self.nombre


class Dia(models.Model):
    dia = models.CharField(
        'Día de la semana',
        max_length=2, choices=DIA,
    )

    def __unicode__(self):
        return self.dia


class Beneficio(models.Model):
    descripcion = models.TextField(
                    'Descripcion', max_length=800,
                    blank=True, null=True
                )
    monto = models.IntegerField('Porcentaje')
    
    producto = models.ForeignKey(
                    Producto, related_name='beneficio_producto',
                    blank=True, null=True
                )
    dias = models.ManyToManyField(Dia, blank=True, null=True)
    tarjeta = models.ManyToManyField(
                Tarjeta, related_name='tarjeta_producto',
                blank=True, null=True
            )

    def __unicode__(self):
        return u"%s %s" % (self.producto, self.monto)

"""
class Tarjeta_Beneficios(models.Model):
    activo = models.BooleanField('Beneficio activo', default=False)

    tarjeta = models.ForeignKey(Tarjeta, related_name='tarjeta_producto')
    beneficio = models.ForeignKey(Beneficio, related_name='tarjeta_beneficios')

    def __unicode__(self):
        return u"%s %s" % (self.tarjeta, self.beneficio)
"""

    