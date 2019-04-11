from django.contrib import admin
from .models import CanvasAspect, ElectricalAspect, Item, WaterAspect, ItemType

# Register your models here.
admin.site.register(ItemType)
admin.site.register(Item)
admin.site.register(CanvasAspect)
admin.site.register(ElectricalAspect)
admin.site.register(WaterAspect)
