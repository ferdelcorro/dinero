# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tarjeta', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tarjeta',
            name='descripcion',
            field=models.TextField(max_length=800, null=True, verbose_name=b'Descripcion', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='beneficio',
            name='descripcion',
            field=models.TextField(max_length=800, null=True, verbose_name=b'Descripcion', blank=True),
            preserve_default=True,
        ),
    ]
