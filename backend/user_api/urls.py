from django.urls import path
from . import views


urlpatterns = [
    path('meal/<int:pk>/delete', views.MealDelete.as_view(), name='meal-delete'), 
    path('meals/', views.MealListCreate.as_view(), name='meal-create'), 
    path('meal/<int:pk>/view', views.MealDetailView.as_view(), name='meal-view'),
    path('meal/<int:pk>/items', views.ItemListCreate.as_view(), name='item-create'),
    path('meal/<int:pk>/edit', views.MealUpdateView.as_view(), name = 'meal-update')
]
