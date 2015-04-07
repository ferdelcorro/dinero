# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Producto', '0001_initial'),
        ('Tarjeta', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gastos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateField(verbose_name=b'Fecha')),
                ('monto', models.DecimalField(default=0, verbose_name=b'Monto', max_digits=7, decimal_places=2)),
                ('descripcion', models.CharField(max_length=100, verbose_name=b'Descripcion')),
                ('tipo_pago', models.BooleanField(default=False, verbose_name=b'Tipo de pago')),
                ('moneda', models.CharField(max_length=1, verbose_name=b'Moneda', choices=[(b'P', b'Peso'), (b'D', b'D\xc3\xb3lar')])),
                ('producto', models.ForeignKey(related_name='gasto_producto', to='Producto.Producto')),
                ('tarjeta', models.ForeignKey(related_name='gasto_tarjeta', to='Tarjeta.Tarjeta')),
                ('user', models.ForeignKey(related_name='gasto_persona', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Sueldo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateField(verbose_name=b'Date Created')),
                ('monto', models.DecimalField(default=0, verbose_name=b'Monto', max_digits=7, decimal_places=2)),
                ('moneda', models.CharField(max_length=1, verbose_name=b'Moneda', choices=[(b'P', b'Peso'), (b'D', b'D\xc3\xb3lar')])),
                ('user', models.ForeignKey(related_name='sueldo_persona', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
