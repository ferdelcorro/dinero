from django import template

from math import fabs

register = template.Library()


@register.filter(name='diference')
def diference(num1, arg):
    num2 = int(arg)
    return num1 - num2


@register.filter(name='absolute')
def diference(num1):
    return fabs(num1)
