from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Meal(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()
    created_at = models.DateTimeField(null = True, blank = True)

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes') #deletes all users meals if user is deleted

    # def get_absolute_url(self):
    #     return reverse("meal-detail", kwargs={"pk": self.pk}) #redirect to home

    def __str__(self):
        return self.title