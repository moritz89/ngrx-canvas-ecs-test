from django.db import models


class CanvasAspect(models.Model):
    type = models.CharField(max_length=20)

    top = models.FloatField()
    left = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()

    svgUrl = models.CharField(max_length=50, blank=True)

    strokeWidth = models.FloatField(blank=True)
    fill = models.CharField(blank=True, max_length=20)


class Pump(models.Model):
    name = models.CharField(max_length=50)
    canvasAspect = models.ForeignKey(CanvasAspect, on_delete=models.CASCADE)


class Pipe(models.Model):
    name = models.CharField(max_length=50)
    canvasAspect = models.ForeignKey(CanvasAspect, on_delete=models.CASCADE)
