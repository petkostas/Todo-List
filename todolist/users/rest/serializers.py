from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.contrib.auth import get_user_model

USER_MODEL = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    User Serializer.
    """

    class Meta:
        model = USER_MODEL
        fields = (
            'id', 'username', 'password', 'email'
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        """
        Generate the password.
        """
        return USER_MODEL.objects.create_user(
            **validated_data
        )
