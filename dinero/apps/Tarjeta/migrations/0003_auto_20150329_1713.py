# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Producto', '0002_producto_descripcion'),
        ('Tarjeta', '0002_auto_20150329_1635'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='beneficio',
            name='nombre',
        ),
        migrations.AddField(
            model_name='beneficio',
            name='producto',
            field=models.ForeignKey(related_name='beneficio_producto', blank=True, to='Producto.Producto', null=True),
            preserve_default=True,
        ),
    ]
