from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import CanvasAspect, ElectricalAspect, MetaAspect, WaterAspect


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
        fields = "__all__"


class ElectricalAspectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ElectricalAspect
        fields = "__all__"


class MetaAspectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MetaAspect
        fields = "__all__"


class WaterAspectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WaterAspect
        fields = (
            "id",
            "height_increase",
            "following_items",
            "previous_items",
            "is_open",
        )


# class PumpSerializer(serializers.HyperlinkedModelSerializer):
#     canvasAspect = CanvasAspectSerializer()

#     class Meta:
#         model = Pump
#         fields = ("id", "url", "name", "canvasAspect")
#         depth = 1

#     def create(self, validated_data):
#         canvas_aspect_data = validated_data.pop("canvasAspect")
#         canvas_aspect = CanvasAspect.objects.create(**canvas_aspect_data)
#         pump = Pump.objects.create(canvasAspect=canvas_aspect, **validated_data)
#         return pump
