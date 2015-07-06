# This is a rest urls inclusion, we use this as a single
# entry point for all REST urls of our project.

from django.conf.urls import include, url


urlpatterns = [
    url(r'^lists/', include('lists.rest.urls', namespace='lists')),
    url(r'^users/', include('users.rest.urls', namespace='users'))
]
