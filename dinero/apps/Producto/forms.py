from django import forms

from django.forms import ModelForm, TextInput, DateInput
from apps.Producto.models import Producto


class ProductoForm(ModelForm):

    class Meta:
        model = Producto

        fields = {
            'nombre', 'descripcion',
        }