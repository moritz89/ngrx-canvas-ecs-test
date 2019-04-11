from django.contrib import admin
from .models import CanvasAspect, ElectricalAspect, WaterAspect, Pump, Pipe

# Register your models here.
admin.site.register(CanvasAspect)
admin.site.register(ElectricalAspect)
admin.site.register(WaterAspect)
admin.site.register(Pump)
admin.site.register(Pipe)
