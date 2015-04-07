# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('Tarjeta', '0003_auto_20150329_1713'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beneficio',
            name='monto',
            field=models.PositiveIntegerField(default=0, verbose_name=b'Porcentaje', validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)]),
            preserve_default=True,
        ),
    ]
