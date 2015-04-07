# -*- coding: utf-8 -*-
from django.template import RequestContext
from django.shortcuts import render_to_response, HttpResponse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect

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
        'Dinero/balance.html',
        RequestContext(
            request,
            {
                'total_sueldos': total_sueldos,
                'total_gastos': total_gastos,
                'datos': datos,
            }
        )
    )