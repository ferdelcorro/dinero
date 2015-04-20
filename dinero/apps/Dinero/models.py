# -*- coding: utf-8 -*-
from django.db import models

from django.contrib.auth.models import User

from apps.Producto.models import Producto
from apps.Tarjeta.models import Tarjeta


MONEDA = (
    ('P', 'Peso'),
    ('D', 'Dólar'),
)


class Sueldo(models.Model):
    fecha = models.DateField('Date Created')
    monto = models.DecimalField(
        'Monto', max_digits=7, decimal_places=2, default=0
    )
    moneda = models.CharField('Moneda', max_length=1, choices=MONEDA)

    user = models.ForeignKey(User, related_name='sueldo_persona')

    def __unicode__(self):
        return u"%s %s" % (self.user, self.fecha)


class Gasto(models.Model):
    """tipo_pago = True -> pagó con tarjeta
    """
    fecha = models.DateField('Fecha')
    monto = models.DecimalField(
        'Monto', max_digits=7, decimal_places=2, default=0
    )
    descripcion = models.TextField(
        'Descripcion', max_length=800,
        blank=True, null=True
    )

    user = models.ForeignKey(User, related_name='gasto_persona')
    moneda = models.CharField('Moneda', max_length=1, choices=MONEDA)
    producto = models.ForeignKey(
        Producto, related_name='gasto_producto',
        blank=True, null=True
    )
    tarjeta = models.ForeignKey(
        Tarjeta, related_name='gasto_tarjeta',
        blank=True, null=True
    )

    def __unicode__(self):
        return u"%s %s %s" % (self.user, self.producto, self.fecha)
