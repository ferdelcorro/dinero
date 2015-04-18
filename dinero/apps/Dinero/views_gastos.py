# -*- coding: utf-8 -*-
from datetime import date, datetime, timedelta

from django.template import RequestContext
from django.shortcuts import render_to_response, HttpResponse, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, InvalidPage, PageNotAnInteger
from django.http import HttpResponseRedirect

from apps.funciones.views import json_response

from apps.Dinero.models import Sueldo, Gasto

from apps.Dinero.forms import SueldoForm, GastoForm
from apps.Tarjeta.forms import TarjetaForm
from apps.Producto.forms import ProductoForm




#Gastos
################################################################################

@login_required
def cargar_gasto(request):
    form = GastoForm()
    t_form = TarjetaForm()
    p_form = ProductoForm()

    if request.method == 'POST':
        form = GastoForm(request.POST)
        if form.is_valid():
            c = form.save(commit=False)
            c.user = request.user
            c.save()
            return render_to_response('base.html',RequestContext(request,{}))

    return render_to_response(
        'Dinero/gastos/cargar_gasto.html',
        RequestContext(
            request,
            {
                'form': form,
                't_form': t_form,
                'p_form': p_form,
            }
        )
    )


@login_required
def ver_gastos(request):
    user = request.user
    dt = date.today()
    gastos = Gasto.objects.filter(
                user=user,
            ).order_by('-fecha')

    #paginator = Paginator(gastos, nro_row)
    paginator = Paginator(gastos, 5)
    page = request.GET.get('page')
    try:
        gastos = paginator.page(page)
    except PageNotAnInteger:
        gastos = paginator.page(1)
    except EmptyPage:
        gastos = paginator.page(paginator.num_pages)

    return render_to_response(
        'Dinero/gastos/ver_gastos.html',
        RequestContext(
            request,
            {
                'gastos': gastos,
            }
        )
    )


@login_required
def gastos_tabla(request):
    user = request.user
    gastos = Gasto.objects.filter(user=user).order_by('-fecha')

    time = request.GET.get('time', None)
    print time

    dt = date.today()
    if time == 'month':
        gastos = gastos.filter(
                    fecha__year=dt.year,
                    fecha__month=dt.month
                )
    elif time == 'year':
        gastos = gastos.filter(fecha__year=dt.year)
    
    #paginator = Paginator(gastos, nro_row)
    paginator = Paginator(gastos, 5)
    page = request.GET.get('page')
    try:
        gastos = paginator.page(page)
    except PageNotAnInteger:
        gastos = paginator.page(1)
    except EmptyPage:
        gastos = paginator.page(paginator.num_pages)

    return render_to_response(
        'Dinero/gastos/gastos_tabla.html',
        RequestContext(
            request,
            {
                'time': time,
                'gastos': gastos,
            }
        )
    )


@login_required
def borrar(request):
    response = {}
    form = GastoForm()

    if request.method == 'GET':
        pk = request.GET.get('id', None)
        gasto = get_object_or_404(Gasto, pk=pk, user=request.user)
        return render_to_response(
            'Dinero/gastos/modal/_borrar_gasto_modal_contenido.html',
            RequestContext(
                request,
                {
                    'gasto': gasto,
                    'form': form,
                }
            )
        )

    pk = request.POST.get('id', None)
    gasto = get_object_or_404(Gasto, pk=pk, user=request.user)
    try:
        gasto.delete()
        response['result'] = 'OK'
    except:
        response['result'] = 'ERROR'

    return json_response(response)


@login_required
def modificar(request):
    response = {}

    if request.method == 'GET':
        pk = request.GET.get('id', None)
        gasto = get_object_or_404(Gasto, pk=pk, user=request.user)
        form = GastoForm(instance=gasto)
        return render_to_response(
            'Dinero/gastos/modal/_modificar_gasto_modal_contenido.html',
            RequestContext(
                request,
                {
                    'gasto': gasto,
                    'form': form,
                }
            )
        )

    pk = request.POST.get('id', None)
    gasto = get_object_or_404(Gasto, pk=pk, user=request.user)
    form = GastoForm(data=request.POST, instance=gasto)
    if form.is_valid():
        form.save()
        response['result'] = 'OK'
    else:
        response['result'] = 'ERROR'
        errors = dict([(k, str(v[0])) for k, v in form.errors.items()])
        response['errors'] = errors
    return json_response(response)