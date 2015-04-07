from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^cargar_tarjeta/$', 'apps.Tarjeta.views_tarjeta.cargar_tarjeta'),
    url(r'^ver_tarjetas/$', 'apps.Tarjeta.views_tarjeta.ver_tarjetas'),
    url(r'^buscar/$', 'apps.Tarjeta.views_tarjeta.buscar'),

    url(r'^cargar_tarjeta_modal/$', 'apps.Tarjeta.views_tarjeta.cargar_tarjeta_modal'),    
)