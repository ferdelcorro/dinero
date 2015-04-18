# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Tarjeta', '0007_auto_20150329_2030'),
    ]

    operations = [
        migrations.AddField(
            model_name='tarjeta',
            name='user',
            field=models.ForeignKey(related_name='tarjeta_user', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='dia',
            name='dia',
            field=models.CharField(max_length=2, verbose_name=b'D\xc3\xada de la semana', choices=[(b'LU', b'Lunes'), (b'MA', b'Martes'), (b'MI', b'Mi\xc3\xa9rcoles'), (b'JU', b'Jueves'), (b'VI', b'Viernes'), (b'SA', b'S\xc3\xa1bado'), (b'DO', b'Domingo')]),
            preserve_default=True,
        ),
    ]
