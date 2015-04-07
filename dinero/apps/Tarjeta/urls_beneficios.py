from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^cargar_beneficio/$', 'apps.Tarjeta.views_beneficio.cargar_beneficio'),
    url(r'^ver_beneficios/$', 'apps.Tarjeta.views_beneficio.ver_beneficios'),
    url(r'^buscar/$', 'apps.Tarjeta.views_beneficio.buscar'),
)