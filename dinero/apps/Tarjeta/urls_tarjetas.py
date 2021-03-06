from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(
        r'^cargar_tarjeta/$',
        'apps.Tarjeta.views_tarjeta.cargar_tarjeta'),
    url(
        r'^ver_tarjetas/$',
        'apps.Tarjeta.views_tarjeta.ver_tarjetas'),
    url(
        r'^buscar/$',
        'apps.Tarjeta.views_tarjeta.buscar'),
    url(
        r'^tarjeta_lista/(?P<producto_pk>\d+)/$',
        'apps.Tarjeta.views_tarjeta.tarjeta_lista'),

    #MODALS
    url(
        r'^cargar_tarjeta_modal/$',
        'apps.Tarjeta.views_tarjeta.cargar_tarjeta_modal'),
    url(
        r'^borrar/$',
        'apps.Tarjeta.views_tarjeta.borrar'),
    url(
        r'^modificar/$',
        'apps.Tarjeta.views_tarjeta.modificar'),
)
