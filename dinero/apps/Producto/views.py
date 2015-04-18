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
            return render_to_response('base.html',RequestContext(request,{}))
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
def cargar_producto_modal(request):
    from apps.funciones.views import json_response
    form = ProductoForm()
    response = {}

    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            try:
                p = form.save(commit=False)
                p.user = request.user
                p.save()
                response['result'] = 'OK'
                response['producto_id'] = p.id
                response['producto_name'] = p.nombre
                print response
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
def ver_productos(request):
    user = request.user
    productos = Producto.objects.filter(user=request.user).order_by('nombre')

    paginator = Paginator(productos, 5)
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
    productos = Producto.objects.filter(user=request.user).order_by('nombre')

    if term:
        terms = term.split(' ')
        qs1 = reduce(operator.or_, (Q(nombre__icontains=n) for n in terms))
        qs2 = reduce(operator.or_, (Q(descripcion__icontains=n) for n in terms))

        productos = productos.filter(Q(qs1) | Q(qs2))

        paginator = Paginator(productos, 5)
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


@login_required
def borrar(request):
    response = {}
    form = ProductoForm()

    if request.method == 'GET':
        pk = request.GET.get('id', None)
        producto = get_object_or_404(Producto, pk=pk, user=request.user)

        return render_to_response(
            'Producto/modal/_borrar_producto_modal_contenido.html',
            RequestContext(
                request,
                {
                    'producto': producto,
                    'form': form,
                }
            )
        )

    pk = request.POST.get('id', None)
    producto = get_object_or_404(Producto, pk=pk, user=request.user)
    try:
        producto.delete()
        response['result'] = 'OK'
    except:
        response['result'] = 'ERROR'

    return json_response(response)


@login_required
def modificar(request):
    response = {}

    if request.method == 'GET':
        pk = request.GET.get('id', None)
        producto = get_object_or_404(Producto, pk=pk, user=request.user)
        form = ProductoForm(instance=producto)
        return render_to_response(
            'Producto/modal/_modificar_producto_modal_contenido.html',
            RequestContext(
                request,
                {
                    'producto': producto,
                    'form': form,
                }
            )
        )

    pk = request.POST.get('id', None)
    producto = get_object_or_404(Producto, pk=pk, user=request.user)
    form = ProductoForm(data=request.POST, instance=producto)
    if form.is_valid():
        form.save()
        response['result'] = 'OK'
    else:
        response['result'] = 'ERROR'
        errors = dict([(k, str(v[0])) for k, v in form.errors.items()])
        response['errors'] = errors
    return json_response(response)