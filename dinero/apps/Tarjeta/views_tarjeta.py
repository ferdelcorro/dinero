# -*- coding: utf-8 -*-
import operator

from django.template import RequestContext
from django.shortcuts import render_to_response, HttpResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpResponseRedirect
from django.core.paginator import (
    Paginator, EmptyPage, InvalidPage, PageNotAnInteger
)

from apps.Tarjeta.models import Tarjeta

from apps.Tarjeta.forms import TarjetaForm


#Tarjetas
################################################################################


@login_required
def cargar_tarjeta(request):
    form = TarjetaForm()

    if request.method == 'POST':
        form = TarjetaForm(request.POST)
        if form.is_valid():
            form.save()
            return render_to_response('base.html',RequestContext(request,{}))
    return render_to_response(
        'Tarjeta/tarjeta/cargar_tarjeta.html',
        RequestContext(
            request,
            {
                'form': form,
            }
        )
    )


@login_required
def cargar_tarjeta_modal(request):
    print 'modal'
    form = TarjetaForm()

    if request.method == 'POST':
        form = TarjetaForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                response['result'] = 'OK'
            except:
                response['result'] = 'ERROR'
                response['error_type'] = 'OTHER'
        else:
            errors = dict([(k, str(v[0])) for k, v in form.errors.items()])
            response['result'] = 'ERROR'
            response['error_type'] = 'INVALID'
            response['errors'] = errors
        
        return json_response(response)
    return render_to_response(
        'Tarjeta/tarjeta/modal/_cargar_tarjeta_modal_contedino.html',
        RequestContext(
            request,
            {
                'form': form,
            }
        )
    )


@login_required
def ver_tarjetas(request):
    user = request.user
    tarjetas = Tarjeta.objects.all()

    paginator = Paginator(tarjetas, 10)
    page = request.GET.get('page')
    try:
        tarjetas = paginator.page(page)
    except PageNotAnInteger:
        tarjetas = paginator.page(1)
    except EmptyPage:
        tarjetas = paginator.page(paginator.num_pages)

    return render_to_response(
        'Tarjeta/tarjeta/ver_tarjetas.html',
        RequestContext(
            request,
            {
                'tarjetas': tarjetas,
            }
        )
    )


@login_required
def buscar(request):
    term = request.GET.get('term', None)
    tarjetas = Tarjeta.objects.all()

    if term:
        terms = term.split(' ')
        qs1 = reduce(operator.or_, (Q(nombre__icontains=n) for n in terms))
        qs2 = reduce(operator.or_, (Q(descripcion__icontains=n) for n in terms))

        tarjetas = tarjetas.filter(Q(qs1) | Q(qs2))

    paginator = Paginator(tarjetas, 10)
    page = request.GET.get('page')
    try:
        tarjetas = paginator.page(page)
    except PageNotAnInteger:
        tarjetas = paginator.page(1)
    except EmptyPage:
        tarjetas = paginator.page(paginator.num_pages)

    return render_to_response(
        'Tarjeta/tarjeta/tarjetas_tabla.html',
        RequestContext(
            request,
            {
                'tarjetas': tarjetas,
            }
        )
    )