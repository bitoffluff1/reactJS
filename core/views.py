from django.shortcuts import HttpResponse
from django.views.generic import TemplateView


class QuickView(TemplateView):
    template_name = 'core/index.html'

def pwa_installed(request):
    print('pwa_installed')
    return HttpResponse('OK')