# -*- coding: utf-8 -*-
from django.template import RequestContext
from django.shortcuts import render_to_response, HttpResponse
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, InvalidPage, PageNotAnInteger
from django.http import HttpResponseRedirect

from apps.Dinero.models import Sueldo, Gasto

from apps.Dinero.forms import SueldoForm, GastoForm
from apps.Tarjeta.forms import TarjetaForm
from apps.Producto.forms import ProductoForm

from datetime import date, datetime, timedelta


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
    paginator = Paginator(gastos, 10)
    page = request.GET.get('page')
    try:
        gastos = paginator.page(page)
        print 'try'
    except PageNotAnInteger:
        gastos = paginator.page(1)
        print 'except 1'
    except EmptyPage:
        print 'asdasd'
        gastos = paginator.page(paginator.num_pages)
        print 'except 2'

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
    paginator = Paginator(gastos, 10)
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
    