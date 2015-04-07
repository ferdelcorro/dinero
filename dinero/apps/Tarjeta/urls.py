from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^beneficio_tarjeta/$', 'apps.Tarjeta.views.beneficio_tarjeta'),
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