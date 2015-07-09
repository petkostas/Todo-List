import json
from rest_framework import generics, views, status, permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate, login, logout
from users.rest import serializers


USER_MODEL = get_user_model()


class UserRegistrationView(generics.CreateAPIView):
    """
    View used for User registration.
    """
    queryset = USER_MODEL.objects.all()
    serializer_class = serializers.UserSerializer
    renderer_classes = (JSONRenderer,)


class UserLoginView(views.APIView):
    """
    View used for authenticating users.
    """

    def post(self, request, format=None):
        data = json.loads(request.body)
        username = data.get('username', None)
        password = data.get('password', None)

        account = authenticate(username=username, password=password)
        if account is not None:
            if account.is_active:
                login(request, account)
                serialized = serializers.UserSerializer(account)
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
