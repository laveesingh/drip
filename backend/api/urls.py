from django.conf.urls import url, include

from . import auth_views

urlpatterns = [
    url(r'^welcome/', auth_views.welcome),
    url(r'^signup/', auth_views.signup)
]
