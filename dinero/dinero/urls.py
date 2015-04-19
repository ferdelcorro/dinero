from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'dinero.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', 'apps.Persona.views.home', name='home'),
    url(r'^login/$', 'django.contrib.auth.views.login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout',
        {'next_page': '/'}
    ),
    url(r'^signup/$', 'apps.Persona.views.sign_up'),

    url(r'^admin/', include(admin.site.urls)),

    url(
        r'^dinero/',
        include(
            'apps.Dinero.urls', namespace='dinero',
            app_name='Dinero'
        )
    ),

    url(
        r'^producto/',
        include(
            'apps.Producto.urls', namespace='producto',
            app_name='Producto'
        )
    ),

    url(
        r'^tarjeta/',
        include(
            'apps.Tarjeta.urls', namespace='tarjeta',
            app_name='Tarjeta'
        )
    ),
)
