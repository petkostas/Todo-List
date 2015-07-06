from django.conf.urls import url
from users.rest import views

urlpatterns = [
    url(
        r'^login/$',
        views.UserLoginView.as_view(),
        name='login'
    ),
    url(
        r'^logout/$',
        views.UserLogoutView.as_view(),
        name='logout'
    ),
    url(
        r'^create/$',
        views.UserRegistrationView.as_view(),
        name='create'
    )
]
