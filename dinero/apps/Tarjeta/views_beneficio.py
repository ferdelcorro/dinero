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

    paginator = Paginator(beneficios, 10)
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

    paginator = Paginator(beneficios, 10)
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