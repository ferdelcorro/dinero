# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Producto', '0001_initial'),
        ('Tarjeta', '0001_initial'),
        ('Dinero', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gasto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateField(verbose_name=b'Fecha')),
                ('monto', models.DecimalField(default=0, verbose_name=b'Monto', max_digits=7, decimal_places=2)),
                ('descripcion', models.TextField(max_length=800, verbose_name=b'Descripcion')),
                ('moneda', models.CharField(max_length=1, verbose_name=b'Moneda', choices=[(b'P', b'Peso'), (b'D', b'D\xc3\xb3lar')])),
                ('producto', models.ForeignKey(related_name='gasto_producto', blank=True, to='Producto.Producto', null=True)),
                ('tarjeta', models.ForeignKey(related_name='gasto_tarjeta', blank=True, to='Tarjeta.Tarjeta', null=True)),
                ('user', models.ForeignKey(related_name='gasto_persona', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='gastos',
            name='producto',
        ),
        migrations.RemoveField(
            model_name='gastos',
            name='tarjeta',
        ),
        migrations.RemoveField(
            model_name='gastos',
            name='user',
        ),
        migrations.DeleteModel(
            name='Gastos',
        ),
    ]
