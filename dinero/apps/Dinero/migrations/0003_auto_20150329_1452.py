# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Dinero', '0002_auto_20150329_0356'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gasto',
            name='descripcion',
            field=models.TextField(max_length=800, null=True, verbose_name=b'Descripcion', blank=True),
            preserve_default=True,
        ),
    ]
