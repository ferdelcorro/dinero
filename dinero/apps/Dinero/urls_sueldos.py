from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^cargar_sueldo/$', 'apps.Dinero.views_sueldos.cargar_sueldo'),
    url(r'^ver_sueldos/$', 'apps.Dinero.views_sueldos.ver_sueldos'),
    url(r'^sueldos_tabla/$', 'apps.Dinero.views_sueldos.sueldos_tabla'),

    url(r'^borrar/$', 'apps.Dinero.views_sueldos.borrar'),
    url(r'^modificar/$', 'apps.Dinero.views_sueldos.modificar'),
)