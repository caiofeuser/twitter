# Generated by Django 4.0.4 on 2022-10-12 23:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_like'),
    ]

    operations = [
        migrations.RenameField(
            model_name='like',
            old_name='title',
            new_name='tweet',
        ),
        migrations.RenameField(
            model_name='note',
            old_name='title',
            new_name='tweet',
        ),
    ]
