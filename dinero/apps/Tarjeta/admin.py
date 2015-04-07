from django.contrib import admin
from apps.Tarjeta.models import Dia


#class GastoAdmin(admin.ModelAdmin):
#    list_display = ('user', 'fecha', 'producto')
#    search_fields = ('user', 'fecha', 'producto')


admin.site.register(Dia)
#admin.site.register(Gasto, GastoAdmin)