from django.urls import URLPattern, path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
  path('users/', views.getUsers),
]