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

from apps.Tarjeta.models import Beneficio

from apps.Tarjeta.forms import BeneficioForm