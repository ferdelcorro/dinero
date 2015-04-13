# -*- coding: utf-8 -*-
from django.template import RequestContext
from django.shortcuts import render_to_response, HttpResponse, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.core.paginator import Paginator, EmptyPage, InvalidPage, PageNotAnInteger

from apps.Dinero.models import Sueldo

from apps.Dinero.forms import SueldoForm

from datetime import date, datetime, timedelta


#Sueldos
################################################################################


@login_required
def cargar_sueldo(request):
    form = SueldoForm()

    if request.method == 'POST':
        form = SueldoForm(request.POST)
        if form.is_valid():
            c = form.save(commit=False)
            c.user = request.user
            c.save()
            return render_to_response('base.html',RequestContext(request,{}))
    return render_to_response(
        'Dinero/sueldos/cargar_sueldo.html',
        RequestContext(
            request,
            {
                'form': form,
            }
        )
    )


@login_required
def ver_sueldos(request):
    user = request.user

    dt = date.today()
    sueldos = Sueldo.objects.filter(user=user).order_by('-fecha')

    paginator = Paginator(sueldos, 10)
    page = request.GET.get('page')
    try:
        sueldos = paginator.page(page)
    except PageNotAnInteger:
        sueldos = paginator.page(1)
    except EmptyPage:
        sueldos = paginator.page(paginator.num_pages)

    return render_to_response(
        'Dinero/sueldos/ver_sueldos.html',
        RequestContext(
            request,
            {
                'sueldos': sueldos,
            }
        )
    )


@login_required
def sueldos_tabla(request):
    user = request.user
    sueldos = Sueldo.objects.filter(user=user).order_by('-fecha')

    time = request.GET.get('time', None)

    dt = date.today()
    if time == 'month':
        sueldos = sueldos.filter(
                    fecha__year=dt.year,
                    fecha__month=dt.month
                )
    elif time == 'year':
        sueldos = sueldos.filter(fecha__year=dt.year)

    paginator = Paginator(sueldos, 10)
    page = request.GET.get('page')
    try:
        sueldos = paginator.page(page)
    except PageNotAnInteger:
        sueldos = paginator.page(1)
    except EmptyPage:
        sueldos = paginator.page(paginator.num_pages)

    return render_to_response(
        'Dinero/sueldos/sueldos_tabla.html',
        RequestContext(
            request,
            {
                'time': time,
                'sueldos': sueldos,
            }
        )
    )


def borrar_sueldo(request):
    response = {}
    form = SueldoForm()

    if request.method == 'GET':
        pk = request.GET.get('id', None)
        sueldo = get_object_or_404(Sueldo, pk=pk, user=request.user)
        return render_to_response(
            'Dinero/sueldos/modal/_borrar_sueldo_modal_contenido.html',
            RequestContext(
                request,
                {
                    'sueldo': sueldo,
                    'form': form,
                }
            )
        )

    from apps.funciones.views import json_response
    pk = request.POST.get('id', None)
    sueldo = get_object_or_404(Sueldo, pk=pk, user=request.user)

    try:
        sueldos.delete()
        response['result'] = 'OK'
    except:
        response['result'] = 'ERROR'
    print response
    return json_response(response)