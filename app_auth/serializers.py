from rest_framework import serializers

from app_auth.models import Login

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('SortId',
                  'LoginId',
                  'UserId',
                  'UserType',
                  'EmailId',
                  'Password',
                  'Status')
