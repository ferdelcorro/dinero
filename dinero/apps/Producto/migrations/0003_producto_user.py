# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Producto', '0002_producto_descripcion'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='user',
            field=models.ForeignKey(related_name='producto_persona', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
    ]
