"""quickstart URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from core.views import QuickView, pwa_installed
from django.views.decorators.cache import cache_control
from django.views.generic import TemplateView

urlpatterns = [
    url('analytics/pwa_installed/', pwa_installed),
    url(r'^admin/', admin.site.urls),
    url(r'^api/chats/', cache_control(max_age=3600)(TemplateView.as_view(
        template_name="core/data.json",
        content_type='application/json',
    )), name='data.json'),
    url(r'^api/profile/', cache_control(max_age=3600)(TemplateView.as_view(
        template_name="core/profile.json",
        content_type='application/json',
    )), name='profile.json'),
    url(r'^service-worker.js', cache_control(max_age=3600)(TemplateView.as_view(
        template_name="core/service-worker.js",
        content_type='application/javascript',
    )), name='service-worker.js'),
    url('^', QuickView.as_view())
]
