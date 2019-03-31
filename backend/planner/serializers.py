from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import CanvasAspect, Pipe, Pump


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("url", "username", "email", "groups")


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ("url", "name")


class CanvasAspectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CanvasAspect
        fields = (
            "id",
            "url",
            "type",
            "top",
            "left",
            "width",
            "height",
            "svgUrl",
            "strokeWidth",
            "fill",
        )

class PumpSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pump
        fields = ("id", "url", "name", "canvasAspect")
        depth = 1

    # def create(self, validated_data):
    #     # import ipdb
    #     # ipdb.set_trace()
    #     print(validated_data)
    #     canvas_aspect_data = validated_data.pop('canvasAspect')
    #     print(canvas_aspect_data)
    #     canvas_aspect = CanvasAspect.objects.create(**canvas_aspect_data)
    #     pump = Pump.objects.create(canvas_aspect=canvas_aspect, **validated_data)
    #     return pump
