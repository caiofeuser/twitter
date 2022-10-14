from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

    class Meta:
        model = User
        fields = ('id', 'email', 'password')
  
class UserSerializer1(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
