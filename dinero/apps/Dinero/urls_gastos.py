from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^cargar_gastos/$', 'apps.Dinero.views_gastos.cargar_gasto'),
    url(r'^ver_gastos/$', 'apps.Dinero.views_gastos.ver_gastos'),
    url(r'^gastos_tabla/$', 'apps.Dinero.views_gastos.gastos_tabla'),

    url(r'^asd/$', 'apps.Dinero.views_gastos.asd'),
)