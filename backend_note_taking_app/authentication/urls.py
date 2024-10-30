# urls.py
from django.urls import path
from .views import UserRegistrationView

urlpatterns = [
    path('api/register/', UserRegistrationView.as_view(), name='user-register'),
]
