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

from apps.Producto.models import Producto

from apps.Producto.forms import ProductoForm


#Productos
################################################################################


@login_required
def cargar_producto(request):
    form = ProductoForm()

    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            p = form.save(commit=False)
            p.user = request.user
            p.save()
            return HttpResponseRedirect('base.html')
    return render_to_response(
        'Producto/cargar_producto.html',
        RequestContext(
            request,
            {
                'form': form,
            }
        )
    )


@login_required
def ver_productos(request):
    user = request.user
    productos = Producto.objects.all()

    paginator = Paginator(productos, 10)
    page = request.GET.get('page')
    try:
        productos = paginator.page(page)
    except PageNotAnInteger:
        productos = paginator.page(1)
    except EmptyPage:
        productos = paginator.page(paginator.num_pages)

    return render_to_response(
        'Producto/ver_productos.html',
        RequestContext(
            request,
            {
                'productos': productos,
            }
        )
    )


@login_required
def buscar(request):
    term = request.GET.get('term', None)

    if term:
        terms = term.split(' ')
        qs1 = reduce(operator.or_, (Q(nombre__icontains=n) for n in terms))
        qs2 = reduce(operator.or_, (Q(descripcion__icontains=n) for n in terms))

        productos = Producto.objects.all()

        productos = productos.filter(Q(qs1) | Q(qs2))

        paginator = Paginator(productos, 10)
        page = request.GET.get('page')
        try:
            productos = paginator.page(page)
        except PageNotAnInteger:
            productos = paginator.page(1)
        except EmptyPage:
            productos = paginator.page(paginator.num_pages)

    return render_to_response(
        'Producto/productos_tabla.html',
        RequestContext(
            request,
            {
                'productos': productos,
            }
        )
    )