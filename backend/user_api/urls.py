from django.urls import path
from . import views


urlpatterns = [
    path('meal/<int:pk>/delete', views.MealDelete.as_view(), name = 'meal-delete'), 
    path('item/<int:pk>/delete', views.ItemDelete.as_view(), name = 'item-delete'),
    path('meals/', views.MealListCreate.as_view(), name = 'meal-create'), 
    path('meal/<int:pk>/view', views.MealDetailView.as_view(), name = 'meal-view'),
    path('item/<int:pk>/view', views.ItemDetailView.as_view(), name = 'item-view'),
    path('meal/<int:pk>/items', views.ItemListCreate.as_view(), name = 'item-create'),
    path('meal/<int:pk>/edit', views.MealUpdateView.as_view(), name = 'meal-update'),
    path('item/<int:pk>/edit', views.ItemUpdateView.as_view(), name = 'item-update'),
    path('fetch-item-info/<str:item>', views.FetchItemInfo, name = 'item-api-info'),
]
