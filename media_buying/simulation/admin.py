# simulation/admin.py
from django.contrib import admin
from .models import Campaign, Keyword, Result

admin.site.register(Campaign)
admin.site.register(Keyword)
admin.site.register(Result)

