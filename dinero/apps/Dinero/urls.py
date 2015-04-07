from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^ver_balance/$', 'apps.Dinero.views.ver_balance'),

    url(
        r'^s/',
        include(
            'apps.Dinero.urls_sueldos', namespace='sueldos',
            app_name='Dinero_sueldos'
        )
    ),

    url(
        r'^g/',
        include(
            'apps.Dinero.urls_gastos', namespace='gastos',
            app_name='Dinero_gastos'
        )
    ),
)
