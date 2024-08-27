from django.urls import path
from . import views


urlpatterns = [
    path('meal/<int:pk>/delete', views.MealDelete.as_view(), name='meal-delete'), 
    path('meals/', views.MealListCreate.as_view(), name='meal-create'), 
]
