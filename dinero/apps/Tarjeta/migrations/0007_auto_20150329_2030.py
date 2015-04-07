# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tarjeta', '0006_auto_20150329_1742'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tarjeta_beneficios',
            name='beneficio',
        ),
        migrations.RemoveField(
            model_name='tarjeta_beneficios',
            name='tarjeta',
        ),
        migrations.DeleteModel(
            name='Tarjeta_Beneficios',
        ),
        migrations.AddField(
            model_name='beneficio',
            name='tarjeta',
            field=models.ManyToManyField(related_name='tarjeta_producto', null=True, to='Tarjeta.Tarjeta', blank=True),
            preserve_default=True,
        ),
    ]
