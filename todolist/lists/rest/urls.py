from django.conf.urls import url, include
from lists.rest import views

listpatterns = [
    url(
        r'^view/(?P<list_id>[\d]+)/$',
        views.TaskListView.as_view(),
        name='view'
    ),
    url(
        r'^destroy/(?P<pk>[\d]+)/$',
        views.ListModelRUDView.as_view(),
        name='destroy'
    ),
    url(
        r'^update/(?P<pk>[\d]+)/$',
        views.ListModelRUDView.as_view(),
        name='update'
    ),
    url(
        r'^toggle/(?P<pk>[\d]+)/$',
        views.ListModelRUDView.as_view(),
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
        r'^create/$',
        views.ListTaskCreateView.as_view(),
        name='create'
    ),
    url(
        r'^update/(?P<pk>[\d]+)/$',
        views.ListTaskRUDView.as_view(),
        name='update'
    )
]

tasks = [
    url(
        r'^tasks/',
        include(taskpatterns, namespace='tasks'),
    )
]

urlpatterns = listpatterns + tasks
