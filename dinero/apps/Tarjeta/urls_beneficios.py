from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(
        r'^cargar_beneficio/$',
        'apps.Tarjeta.views_beneficio.cargar_beneficio'),
    url(
        r'^ver_beneficios/$',
        'apps.Tarjeta.views_beneficio.ver_beneficios'),
    url(
        r'^buscar/$',
        'apps.Tarjeta.views_beneficio.buscar'),

    #MODALS
    url(
        r'^borrar/$',
        'apps.Tarjeta.views_beneficio.borrar'),
    url(
        r'^modificar/$',
        'apps.Tarjeta.views_beneficio.modificar'),
    url(
        r'^ver/(?P<beneficio_id>\d+)/$',
        'apps.Tarjeta.views_beneficio.ver'),
)
