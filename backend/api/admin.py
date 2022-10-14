from django.contrib import admin
from .models import Like, Note, Comment

admin.site.register(Note)
admin.site.register(Like)
admin.site.register(Comment)