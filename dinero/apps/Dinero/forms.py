from django import forms

from django.forms import ModelForm, TextInput, DateInput
from apps.Dinero.models import Sueldo, Gasto


class SueldoForm(ModelForm):

    class Meta:
        model = Sueldo

        fields = {
            'fecha', 'monto', 'moneda'
        }

        widgets = {
            'fecha': forms.DateInput(
                    attrs={
                        'class': 'form-control date-field',
                        'style': 'display: inline; width: 50%'
                    }
                ),
            'moneda': forms.Select(attrs={
                'class': 'form-control',
                'style': 'display: inline; width: 50%'}
                ),
        }


class GastoForm(ModelForm):

    class Meta:
        model = Gasto

        fields = {
            'fecha', 'monto', 'moneda', 'descripcion', 
            'producto', 'tarjeta'
        }

        widgets = {
            'fecha': forms.DateInput(
                    attrs={
                        'class': 'form-control date-field',
                        'style': 'display: inline; width: 50%'
                    }
                ),
            'moneda': forms.Select(attrs={
                'class': 'form-control',
                'style': 'display: inline; width: 50%'}
                ),
        }