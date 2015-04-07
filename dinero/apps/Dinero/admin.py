from django.contrib import admin
from apps.Dinero.models import Sueldo, Gasto


class SueldoAdmin(admin.ModelAdmin):
    list_display = ('user', 'monto')
    search_fields = ('user', 'monto')


class GastoAdmin(admin.ModelAdmin):
    list_display = ('user', 'fecha', 'producto')
    search_fields = ('user', 'fecha', 'producto')


admin.site.register(Sueldo, SueldoAdmin)
admin.site.register(Gasto, GastoAdmin)