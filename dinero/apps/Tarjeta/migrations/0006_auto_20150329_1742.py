# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tarjeta', '0005_auto_20150329_1724'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beneficio',
            name='monto',
            field=models.IntegerField(verbose_name=b'Porcentaje'),
            preserve_default=True,
        ),
    ]
