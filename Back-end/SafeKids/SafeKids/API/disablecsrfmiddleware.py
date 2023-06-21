from django.middleware.csrf import CsrfViewMiddleware

class DisableCSRFMiddleware(CsrfViewMiddleware):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)