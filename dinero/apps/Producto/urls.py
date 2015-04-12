from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^cargar_producto/$', 'apps.Producto.views.cargar_producto'),
    url(r'^ver_productos/$', 'apps.Producto.views.ver_productos'),
    url(r'^buscar/$', 'apps.Producto.views.buscar'),

    url(r'^cargar_producto_modal/$', 'apps.Producto.views.cargar_producto_modal'),
)