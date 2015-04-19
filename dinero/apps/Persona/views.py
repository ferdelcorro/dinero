# -*- coding: utf-8 -*-
from datetime import date

from django.contrib.auth.forms import UserCreationForm

from django.template import RequestContext
from django.shortcuts import render_to_response, HttpResponse
from django.contrib.auth.decorators import login_required

from apps.Tarjeta.models import Beneficio

DAYS_WEEK = {
    0: 'Lunes',
    1: 'Martes',
    2: 'Miércoles',
    3: 'Jueves',
    4: 'Viernes',
    5: 'Sábado',
    6: 'Domingo'
}


@login_required
def home(request):
    dt = date.today().weekday()
    b = []
    beneficios = Beneficio.objects.all()
    for e in beneficios:
        for x in e.dias.all():
            if x.dia == DAYS_WEEK[dt]:
                b.append(e)
    return render_to_response(
        'Persona/base.html',
        RequestContext(
            request,
            {
                'beneficios': b,
                'date': date.today(),
            }
        )
    )


def sign_up(request):
    form = UserCreationForm()
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            new_user.is_active = False
            new_user.save()
            return home(request)
    return render_to_response(
        'registration/signup.html',
        RequestContext(
            request,
            {
                'form': form,
            }
        )
    )
