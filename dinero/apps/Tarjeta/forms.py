from django import forms

from django.forms import ModelForm, TextInput, DateInput
from apps.Tarjeta.models import Tarjeta, Beneficio


class TarjetaForm(ModelForm):

    class Meta:
        model = Tarjeta

        fields = {
            'nombre', 'descripcion',
        }

        widgets = {
            'moneda': forms.Select(attrs={
                'class': 'form-control',
                'style': 'display: inline; width: 20%'}
                ),
        }


class BeneficioForm(ModelForm):

    class Meta:
        model = Beneficio

        fields = {
            'producto', 'descripcion', 'monto', 'dias', 'tarjeta'
        }

        widgets = {
            'moneda': forms.Select(attrs={
                'class': 'form-control',
                'style': 'display: inline; width: 20%'}
                ),
            'monto': forms.TextInput(attrs={
                'class': 'form-control',
                'style': 'display: inline; width: 20%'}
                ),
        }
