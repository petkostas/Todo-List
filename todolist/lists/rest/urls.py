from django.conf.urls import url
from lists.rest import views

urlpatterns = [
    url(
        r'^$',
        views.ListModelListView.as_view(),
        name='index'
    ),
    url(
        r'^view/(?P<list_id>[\d]+)/$',
        views.TaskListView.as_view(),
        name='view'
    ),
    url(
        r'^destroy/(?P<pk>[\d]+)/$',
        views.ListModelCRUDView.as_view(),
        name='destroy'
    ),
    url(
        r'^update/(?P<pk>[\d]+)/$',
        views.ListModelCRUDView.as_view(),
        name='update'
    ),
    url(
        r'^toggle/(?P<pk>[\d]+)/$',
        views.ListModelCRUDView.as_view(),
        name='toggle'
    ),
    url(
        r'^create/$',
        views.ListModelCreateView.as_view(),
        name='create'
    )
]
