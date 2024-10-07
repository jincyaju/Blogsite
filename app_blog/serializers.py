from django.shortcuts import redirect
from rest_framework import serializers

from app_auth.models import Login
from app_blog.models import Blog, Customer

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Customer
        fields = ['id', 'username', 'password', 'email', 'profile_photo', 'phone_number']

    def create(self, validated_data):
        user = Customer(
            username=validated_data['username'],
            email=validated_data['email'],
            profile_photo=validated_data.get('profile_photo'),
            phone_number=validated_data.get('phone_number'),
        )
        user.set_password(validated_data['password'])  
        user.save()
        return user
    


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('SortId',
                  'BlogId',
                  'Title',
                  'Description',
                  'UserId',
                  'CreatedDate',
                  'Tags',
                  'BlogImage')
