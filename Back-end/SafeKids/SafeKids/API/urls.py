from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import *
import notifications.urls


urlpatterns = [
    path('add_found_kid/', add_found_kid, name='add_found_kid'),
    path('add_missing_kid/', add_missing_kid, name='add_missing_kid'),
    path('get_missing_kids/', get_missing_kids, name='get_missing_kids'),
    path('get_found_kid_details/', get_found_kid_details, name='get_found_kid_details'),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('edit_user/', edit_user, name='edit_user'),
    path('edit_kid/', edit_kid, name='edit_kid'),
    path('user_logout/', user_logout, name='user_logout'),
    path('get_my_kids/', get_my_kids, name='get_my_kids'),
    path('get_matching_profiles/', get_matching_profiles, name='get_matching_profiles'),
    path('send_notification/', send_notification, name='send_notification'),
    path('get_user_notifications/', get_user_notifications, name='get_user_notifications'),
    path('read_notification/', read_notification, name='read_notification'),
    path('forgot_password/', forgot_password, name='forgot_password'),
    path('change_kid_state/', change_kid_state, name='change_kid_state'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# path('forgot-password/', forgot_password, name='forgot_password'),
# path('password-reset/', auth_views.PasswordResetView.as_view(template_name='password_reset.html'), name='password_reset'),
# path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
# path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), name='password_reset_confirm'),
# path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),