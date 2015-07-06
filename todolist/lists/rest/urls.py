from django.conf.urls import url
from lists.rest import views

listpatterns = [
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
    ),
    url(
        r'^$',
        views.ListModelListView.as_view(),
        name='index'
    )
]

taskpatterns = [
    url(
        r'^tasks/create/$',
        views.ListTaskCreateView.as_view(),
        name='tasks-create'
    ),
    url(
        r'^tasks/update/(?P<pk>[\d]+)/$',
        views.ListTaskCRUDView.as_view(),
        name='tasks-update'
    )
]

urlpatterns = listpatterns + taskpatterns
