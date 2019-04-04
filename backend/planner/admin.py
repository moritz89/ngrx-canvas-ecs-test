from django.contrib import admin
from .models import CanvasAspect, ElectricalAspect, MetaAspect, WaterAspect

# Register your models here.
admin.site.register(CanvasAspect)
admin.site.register(ElectricalAspect)
admin.site.register(MetaAspect)
admin.site.register(WaterAspect)
