# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Beneficio',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=30, verbose_name=b'Beneficio sobre')),
                ('descripcion', models.CharField(max_length=100, verbose_name=b'Descripcion')),
                ('monto', models.PositiveIntegerField(default=0, verbose_name=b'Porcentaje')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Dia',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('dia', models.CharField(max_length=30, verbose_name=b'D\xc3\xada de la semana')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tarjeta',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=30, verbose_name=b'Nombre de la tarjeta')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tarjeta_Beneficios',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('activo', models.BooleanField(default=False, verbose_name=b'Beneficio activo')),
                ('beneficio', models.ForeignKey(related_name='tarjeta_beneficios', to='Tarjeta.Beneficio')),
                ('tarjeta', models.ForeignKey(related_name='tarjeta_producto', to='Tarjeta.Tarjeta')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='beneficio',
            name='dias',
            field=models.ManyToManyField(to='Tarjeta.Dia', null=True, blank=True),
            preserve_default=True,
        ),
    ]
