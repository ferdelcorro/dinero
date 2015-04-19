from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^tarjetas/$',
        'apps.Tarjeta.views.tarjetas'),
    url(r'^tarjeta_selected/(?P<tarjeta_id>\d+)/$',
        'apps.Tarjeta.views.tarjeta_selected'),
    url(r'^beneficio_selected/(?P<beneficios_id>\d+)/$',
        'apps.Tarjeta.views.beneficio_selected'),
    url(
        r'^t/',
        include(
            'apps.Tarjeta.urls_tarjetas', namespace='tarjetas',
            app_name='Producto_tarjetas'
        )
    ),

    url(
        r'^b/',
        include(
            'apps.Tarjeta.urls_beneficios', namespace='beneficios',
            app_name='Producto_beneficios'
        )
    ),
)
