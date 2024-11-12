from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Meal(models.Model):
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    which = models.CharField(max_length=20, choices=[('Breakfast', 'Breakfast'), ('Lunch', 'Lunch'), ('Dinner', 'Dinner'), ('Snack', 'Snack')], default='Breakfast',blank=False)
    #author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes') #deletes all users meals if user is deleted
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='meals') #deletes all users meals if user is deleted

     

    # def get_absolute_url(self):
    #     return reverse("meal-detail", kwargs={"pk": self.pk}) #redirect to home

    def __str__(self):
        return self.title
    
class Item(models.Model):
    name = models.CharField(max_length=25)
    calories = models.FloatField()
    quantity = models.FloatField()
    sugar = models.FloatField()
    fat = models.FloatField()
    protein = models.FloatField()

    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name="items")


    def __str__(self):
        return self.name
    
