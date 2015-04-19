# -*- coding: utf-8 -*-
import operator

from django.template import RequestContext
from django.shortcuts import (
    render_to_response, HttpResponse, get_object_or_404
)
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpResponseRedirect
from django.core.paginator import (
    Paginator, EmptyPage, InvalidPage, PageNotAnInteger
)

from apps.Tarjeta.models import Beneficio, Tarjeta

from apps.Tarjeta.forms import BeneficioForm


@login_required
def tarjetas(request):
    tarjetas = Tarjeta.objects.filter(user=request.user)
    return render_to_response(
        'Tarjeta/tarjeta_beneficios/_tarjetas_beneficios_contenedor.html',
        RequestContext(
            request,
            {
                'tarjetas': tarjetas,
            }
        )
    )


@login_required
def tarjeta_selected(request, tarjeta_id):
    t = get_object_or_404(Tarjeta, pk=tarjeta_id, user=request.user)
    beneficios = Beneficio.objects.filter(tarjeta=t)
    print beneficios
    return render_to_response(
        'Tarjeta/tarjeta_beneficios/_beneficios_contenido.html',
        RequestContext(
            request,
            {
                'beneficios': beneficios,
            }
        )
    )


@login_required
def beneficio_selected(request, beneficios_id):
    response = {}

    if request.method == 'GET':
        print 'hola'
        beneficio = get_object_or_404(
            Beneficio, pk=beneficios_id, tarjeta__user=request.user
        )
        print beneficio
        form = BeneficioForm(instance=beneficio)
        print form
        return render_to_response(
            'Tarjeta/beneficio/modal/_modificar_beneficio_modal_contenido.html',
            RequestContext(
                request,
                {
                    'beneficio': beneficio,
                    'form': form,
                }
            )
        )

    pk = request.POST.get('id', None)
    beneficio = get_object_or_404(Beneficio, pk=pk)
    form = BeneficioForm(data=request.POST, instance=beneficio)
    if form.is_valid():
        form.save()
        response['result'] = 'OK'
    else:
            response['result'] = 'ERROR'
            errors = dict([(k, str(v[0])) for k, v in form.errors.items()])
            response['errors'] = errors
    return json_response(response)
