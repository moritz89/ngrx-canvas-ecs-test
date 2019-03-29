from django.db import models


class CanvasAspect(models.Model):
    type = models.CharField(max_length=20)

    top = models.FloatField()
    left = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()

    url = models.CharField(max_length=50, blank=True)

    strokeWidth = models.FloatField(blank=True)
    fill = models.FloatField(blank=True)


class Pump(models.Model):
    name = models.CharField(max_length=50)
    canvasAspect = models.OneToOneField(
        CanvasAspect, on_delete=models.CASCADE, related_name="item"
    )


class Pipe(models.Model):
    name = models.CharField(max_length=50)
    canvasAspect = models.OneToOneField(
        CanvasAspect, on_delete=models.CASCADE, related_name="item"
    )
