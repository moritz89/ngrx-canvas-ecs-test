from django.db import models
import uuid


class CanvasAspect(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=20)

    top = models.FloatField()
    left = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()

    svg_url = models.CharField(max_length=50, blank=True)

    stroke_width = models.FloatField(blank=True)
    fill = models.CharField(blank=True, max_length=20)


class ElectricalAspect(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    power_usage = models.FloatField()


class MetaAspect(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=20)
    name = models.CharField(max_length=20)


class WaterAspect(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    height_increase = models.FloatField()
    following_items = models.ManyToManyField(
        "self", related_name="previous_items", symmetrical=False, blank=True
    )
    is_open = models.BooleanField()
