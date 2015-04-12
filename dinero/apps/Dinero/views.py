# -*- coding: utf-8 -*-
from django.template import RequestContext
from django.shortcuts import render_to_response, HttpResponse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.db.models import Q, Sum

from apps.Dinero.models import Sueldo, Gasto

from apps.Dinero.forms import SueldoForm, GastoForm

from datetime import date, datetime, timedelta


#Balances
################################################################################


@login_required
def ver_balance(request):
    user = request.user
    gastos = Gasto.objects.filter(user=user)
    sueldos = Sueldo.objects.filter(user=user)

    dic = {} #{'fecha': [sueldo, gastos]}
    total_gastos = 0
    for e in gastos:
        total_gastos += e.monto
        if e.fecha not in dic:
            dic[e.fecha] = [0, e.monto]
        else:
            dic[e.fecha] += [0, e.monto]

    total_sueldos = 0
    for e in sueldos:
        total_sueldos += e.monto
        if e.fecha not in dic:
            dic[e.fecha] = [e.monto, 0]
        else:
            dic[e.fecha] += [e.monto, 0]

    datos = sorted(dic.iteritems())

    return render_to_response(
        'Dinero/balances/balance.html',
        RequestContext(
            request,
            {
                'total_sueldos': total_sueldos,
                'total_gastos': total_gastos,
                'datos': datos,
            }
        )
    )


@login_required
def filter_balance(request):
    user = request.user
    gastos = Gasto.objects.filter(user=user)
    sueldos = Sueldo.objects.filter(user=user)

    total_gastos = int(gastos.aggregate(total=Sum("monto"))['total'] or 0)
    total_sueldos = int(sueldos.aggregate(total=Sum("monto"))['total'] or 0)

    date_from = request.GET.get('from', None)
    date_to = request.GET.get('to', None)

    print date_from
    print date_to

    from datetime import datetime, date

    if date_from:
        date_from = date_from.split('/')
        date_from = date(int(date_from[2]), int(date_from[0]), int(date_from[1]))

        gastos = gastos.filter(fecha__gte=date_from)
        sueldos = sueldos.filter(fecha__gte=date_from)

    if date_to:
        date_to = date_to.split('/')
        date_to = date(int(date_to[2]), int(date_to[0]), int(date_to[1]))

        gastos = gastos.filter(fecha__lte=date_to)
        sueldos = sueldos.filter(fecha__lte=date_to)

    dic = {} #{'fecha': [sueldo, gastos]}
    for e in gastos:
        if e.fecha not in dic:
            dic[e.fecha] = [0, e.monto]
        else:
            dic[e.fecha] += [0, e.monto]

    for e in sueldos:
        if e.fecha not in dic:
            dic[e.fecha] = [e.monto, 0]
        else:
            dic[e.fecha] += [e.monto, 0]

    datos = sorted(dic.iteritems())

    return render_to_response(
        'Dinero/balances/balance_body.html',
        RequestContext(
            request,
            {
                'total_sueldos': total_sueldos,
                'total_gastos': total_gastos,
                'datos': datos,
            }
        )
    )