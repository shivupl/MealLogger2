from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, MealSerializer, ItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Meal
from .models import Item
import requests
from django.http import JsonResponse



# User Views
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Meal Views
class MealListCreate(generics.ListCreateAPIView):
    serializer_class = MealSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Meal.objects.filter(author=user)
            # queryset = super(MealListView, self).get_queryset()
            # return queryset.filter(author=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)

        return super().perform_create(serializer)
    
class MealDelete(generics.DestroyAPIView):
    serializer_class = MealSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Meal.objects.filter(author=user)
    
class MealDetailView(generics.RetrieveAPIView):
    serializer_class = MealSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Meal.objects.filter(author=user)
    

# finish this/devide into mutiple update options
class MealUpdateView(generics.UpdateAPIView):
    serializer_class = MealSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Meal.objects.filter(author=user)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
            
        return super().perform_update(serializer)



# Item views 
class ItemListCreate(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        mealID = self.kwargs.get('pk')
        return Item.objects.filter(meal__id = mealID ,meal__author=self.request.user)

    def perform_create(self, serializer):
        mealID = self.kwargs.get('pk')
        meal = Meal.objects.get(id=mealID, author = self.request.user)
        if serializer.is_valid():
            serializer.save(meal = meal)
        else:
            print(serializer.errors)

        return super().perform_create(serializer)
    
class ItemDelete(generics.DestroyAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        itemID = self.kwargs.get('pk')
        return Item.objects.filter(id=itemID, meal__author=self.request.user)

class ItemUpdateView(generics.UpdateAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        itemID = self.kwargs.get('pk')
        return Item.objects.filter(id=itemID, meal__author=self.request.user)
    

class ItemDetailView(generics.RetrieveAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        itemID = self.kwargs.get('pk')
        return Item.objects.filter(id=itemID, meal__author=self.request.user)
    

def FetchItemInfo(request, item):
    api_url = 'https://api.calorieninjas.com/v1/nutrition?query='
    response = requests.get(api_url + item, headers={'X-Api-Key': '8rluDVXWfisgryBz6Psb+g==4A1FMjhbDzdVm1j1'})
    if response.status_code == requests.codes.ok:
        return JsonResponse(response.json())
    else:
        return JsonResponse("Error:", response.status_code, response.text)

        





