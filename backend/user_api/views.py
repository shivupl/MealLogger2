from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, MealSerializer, ItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Meal
from .models import Item


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
    #queryset = Meal.objects.all()
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
    

