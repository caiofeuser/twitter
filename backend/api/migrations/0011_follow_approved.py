# Generated by Django 4.0.4 on 2022-10-21 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_follow_followed_follow_following'),
    ]

    operations = [
        migrations.AddField(
            model_name='follow',
            name='approved',
            field=models.BooleanField(default=False),
        ),
    ]
