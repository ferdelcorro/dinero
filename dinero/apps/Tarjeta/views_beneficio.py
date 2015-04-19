# -*- coding: utf-8 -*-
import operator

from django.template import RequestContext
from django.shortcuts import render_to_response, HttpResponse, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpResponseRedirect
from django.core.paginator import (
    Paginator, EmptyPage, InvalidPage, PageNotAnInteger
)

from apps.funciones.views import json_response

from apps.Tarjeta.models import Beneficio

from apps.Tarjeta.forms import BeneficioForm


#Beneficios
################################################################################

@login_required
def cargar_beneficio(request):
    form = BeneficioForm()

    if request.method == 'POST':
        form = BeneficioForm(request.POST)
        if form.is_valid():
            form.save()
            return render_to_response('base.html',RequestContext(request,{}))
    return render_to_response(
        'Tarjeta/beneficio/cargar_beneficio.html',
        RequestContext(
            request,
            {
                'form': form,
            }
        )
    )


@login_required
def ver_beneficios(request):
    user = request.user
    beneficios = Beneficio.objects.all()

    paginator = Paginator(beneficios, 5)
    page = request.GET.get('page')
    try:
        beneficios = paginator.page(page)
    except PageNotAnInteger:
        beneficios = paginator.page(1)
    except EmptyPage:
        beneficios = paginator.page(paginator.num_pages)

    return render_to_response(
        'Tarjeta/beneficio/ver_beneficios.html',
        RequestContext(
            request,
            {
                'beneficios': beneficios,
            }
        )
    )


@login_required
def buscar(request):
    term = request.GET.get('term', None)
    beneficios = Beneficio.objects.all()

    if term:
        terms = term.split(' ')
        qs1 = reduce(operator.or_, (Q(producto__nombre__icontains=n) for n in terms))
        qs2 = reduce(operator.or_, (Q(descripcion__icontains=n) for n in terms))

        beneficios = beneficios.filter(Q(qs1) | Q(qs2))

    paginator = Paginator(beneficios, 5)
    page = request.GET.get('page')
    try:
        beneficios = paginator.page(page)
    except PageNotAnInteger:
        beneficios = paginator.page(1)
    except EmptyPage:
        beneficios = paginator.page(paginator.num_pages)

    return render_to_response(
        'Tarjeta/beneficio/beneficios_tabla.html',
        RequestContext(
            request,
            {
                'beneficios': beneficios,
            }
        )
    )


@login_required
def borrar(request):
    response = {}
    form = BeneficioForm()

    if request.method == 'GET':
        pk = request.GET.get('id', None)
        beneficio = get_object_or_404(Beneficio, pk=pk)

        return render_to_response(
            'Tarjeta/beneficio/modal/_borrar_beneficio_modal_contenido.html',
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
    try:
        beneficio.delete()
        response['result'] = 'OK'
    except:
        response['result'] = 'ERROR'

    return json_response(response)


@login_required
def modificar(request):
    response = {}

    if request.method == 'GET':
        pk = request.GET.get('id', None)
        beneficio = get_object_or_404(Beneficio, pk=pk)
        form = BeneficioForm(instance=beneficio)
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


@login_required
def ver(request, beneficio_id):
    beneficio = get_object_or_404(Beneficio, pk=beneficio_id)

    return render_to_response(
        'Tarjeta/beneficio/modal/_beneficio_modal.html',
        RequestContext(
            request,
            {
                'beneficio': beneficio,
            }
        )
    )
