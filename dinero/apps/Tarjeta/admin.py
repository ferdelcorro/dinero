from django.contrib import admin
from apps.Tarjeta.models import Dia, Tarjeta, Beneficio


#class GastoAdmin(admin.ModelAdmin):
#    list_display = ('user', 'fecha', 'producto')
#    search_fields = ('user', 'fecha', 'producto')

class TarjetaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)


#class BeneficioAdmin(admin.ModelAdmin):
#    list_display = ('tarjeta', 'producto')
#    search_fields = ('tarjeta', 'dias', 'producto')


admin.site.register(Dia)
admin.site.register(Tarjeta, TarjetaAdmin)
#admin.site.register(Beneficio, BeneficioAdmin)
#admin.site.register(Gasto, GastoAdmin)