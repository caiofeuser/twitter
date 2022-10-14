from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from users.models import User
from .serializers import UserSerializer, UserSerializer1
from rest_framework.decorators import api_view
from rest_framework.response import Response


class UserCreateView(CreateAPIView):
    model = User
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer1(users, many=True)
    return Response(serializer.data)
