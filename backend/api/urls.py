from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('notes/', views.getNotes),
    path('', views.getRoutes), 
    path('notes/add/', views.addNotes),
    path('notes/update/<str:pk>/', views.updateNotes),
    path('notes/delete/<str:pk>/', views.deleteNotes),

    path('likes/get', views.getLikes),
    path('likes/add/', views.addLikes),
    path('likes/delete/<str:pk>/', views.deleteLikes),
    path('likes/update/<str:pk>/', views.updateLikes),

    path('users/', views.getUsers),

    path('comments/', views.getComments),
    path('comments/add/', views.addComments),
    path('comments/delete/<str:pk>/', views.deleteComments),


    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
]
