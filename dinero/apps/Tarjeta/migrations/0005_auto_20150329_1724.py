# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tarjeta', '0004_auto_20150329_1721'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beneficio',
            name='monto',
            field=models.DecimalField(default=0, verbose_name=b'Porcentaje', max_digits=2, decimal_places=2),
            preserve_default=True,
        ),
    ]
