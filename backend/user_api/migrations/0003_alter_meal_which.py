# Generated by Django 5.1 on 2024-10-18 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0002_meal_which'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='which',
            field=models.CharField(choices=[('bfast', 'Breakfast'), ('lunch', 'Lunch'), ('dinner', 'Dinner'), ('snack', 'Snack')], default='bfast', max_length=20),
        ),
    ]
