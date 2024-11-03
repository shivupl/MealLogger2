from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Meal
from . models import Item

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    


class ItemSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required = False,allow_blank = True)
    calories = serializers.FloatField(required = False)
    class Meta:
        model = Item
        fields = ["id", "name", "calories", "quantity"]


class MealSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many= True, required=False) 
    description = serializers.CharField(required = False, allow_blank = True)
    class Meta:
        model = Meal
        fields = ["id", "description", "created_at", "author", "which", "items"]
        #fields = ["id", "title", "description", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}