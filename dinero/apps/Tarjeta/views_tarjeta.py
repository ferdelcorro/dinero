# -*- coding: utf-8 -*-
import operator

from django.http import Http404

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

from apps.funciones.views import json_response

from apps.Tarjeta.models import Tarjeta, Beneficio
from apps.Producto.models import Producto

from apps.Tarjeta.forms import TarjetaForm


#Tarjetas
################################################################################


@login_required
def cargar_tarjeta(request):
    form = TarjetaForm()

    if request.method == 'POST':
        form = TarjetaForm(request.POST)
        if form.is_valid():
            t = form.save(commit=False)
            t.user = request.user
            t.save()
            return render_to_response(
                'base.html', RequestContext(request, {})
            )
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
    from apps.funciones.views import json_response
    form = TarjetaForm()
    response = {}

    if request.method == 'POST':
        form = TarjetaForm(request.POST)
        if form.is_valid():
            try:
                t = form.save(commit=False)
                t.user = request.user
                t.save()
                response['result'] = 'OK'
                response['tarjeta_id'] = t.id
                response['tarjeta_name'] = t.nombre
            except:
                response['result'] = 'ERROR'
                response['error_type'] = 'OTHER'

        else:
            errors = dict([(k, str(v[0])) for k, v in form.errors.items()])
            response['result'] = 'ERROR'
            response['error_type'] = 'INVALID'
            response['errors'] = errors

        return json_response(response)
    else:
        raise Http404


@login_required
def ver_tarjetas(request):
    user = request.user
    tarjetas = Tarjeta.objects.filter(user=request.user).order_by('nombre')

    paginator = Paginator(tarjetas, 5)
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
    tarjetas = Tarjeta.objects.filter(user=request.user).order_by('nombre')

    if term:
        terms = term.split(' ')
        qs1 = reduce(operator.or_, (
            Q(nombre__icontains=n) for n in terms)
        )
        qs2 = reduce(operator.or_, (
            Q(descripcion__icontains=n) for n in terms)
        )

        tarjetas = tarjetas.filter(Q(qs1) | Q(qs2))

    paginator = Paginator(tarjetas, 5)
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


@login_required
def borrar(request):
    response = {}
    form = TarjetaForm()

    if request.method == 'GET':
        pk = request.GET.get('id', None)
        tarjeta = get_object_or_404(Tarjeta, pk=pk, user=request.user)

        return render_to_response(
            'Tarjeta/tarjeta/modal/_borrar_tarjeta_modal_contenido.html',
            RequestContext(
                request,
                {
                    'tarjeta': tarjeta,
                    'form': form,
                }
            )
        )

    pk = request.POST.get('id', None)
    tarjeta = get_object_or_404(Tarjeta, pk=pk, user=request.user)
    try:
        tarjeta.delete()
        response['result'] = 'OK'
    except:
        response['result'] = 'ERROR'

    return json_response(response)


@login_required
def tarjeta_lista(request, producto_pk):
    user = request.user
    producto = Producto.objects.filter(pk=producto_pk)
    beneficios = Beneficio.objects.filter(
        producto=producto, tarjeta__isnull=False
    )

    tarjetas = []
    for e in beneficios:
        for x in e.tarjeta.all():
            if x not in tarjetas:
                tarjetas.append(x)

    return render_to_response(
        'Tarjeta/tarjeta/tarjeta_lista.html',
        RequestContext(
            request,
            {
                'tarjetas': tarjetas,
            }
        )
    )
