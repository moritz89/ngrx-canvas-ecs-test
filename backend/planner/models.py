from django.db import models
import uuid

#----------------------------------------------------------------------
# Aspect Models

class CanvasAspect(models.Model):
    type = models.CharField(max_length=20)

    top = models.FloatField()
    left = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()

    svg_url = models.CharField(max_length=50, blank=True)

    stroke_width = models.FloatField(blank=True)
    fill = models.CharField(blank=True, max_length=20)


class ElectricalAspect(models.Model):
    power_usage = models.FloatField()


class WaterAspect(models.Model):
    height_increase = models.FloatField()
    following_items = models.ManyToManyField(
        "self", related_name="previous_items", symmetrical=False, blank=True
    )
    is_open = models.BooleanField()

#----------------------------------------------------------------------
# Item Models

class Pipe(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=20)
    canvas_aspect = models.OneToOneField(CanvasAspect, on_delete=models.CASCADE)


class Pump(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=20)
    canvas_aspect = models.OneToOneField(CanvasAspect, on_delete=models.CASCADE)
    electrical_aspect = models.OneToOneField(ElectricalAspect, on_delete=models.CASCADE)

