from collections import OrderedDict
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import (
    CanvasAspect,
    ElectricalAspect,
    Item,
    ItemType,
    WaterAspect,
    Pump,
    Pipe,
)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("url", "username", "email", "groups")


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ("url", "name")


class CanvasAspectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CanvasAspect
        exclude = ["id"]


class ElectricalAspectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectricalAspect
        exclude = ["id"]


class WaterAspectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WaterAspect
        fields = "__all__"


class ItemTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ItemType
        fields = "__all__"


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    canvas_aspect = CanvasAspectSerializer()

    class Meta:
        model = Item
        fields = ("id", "type", "name", "canvas_aspect")

    def to_representation(self, instance):
        result = super(ItemSerializer, self).to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None]
        )

    def create(self, validated_data):
        import ipdb

        ipdb.set_trace()

        canvas_aspect_data = validated_data.pop("canvasAspect")
        canvas_aspect = CanvasAspect.objects.create(**canvas_aspect_data)

        item = Item.objects.create(canvas_aspect=canvas_aspect, **validated_data)
        return item


class PumpSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.UUIDField()
    canvas_aspect = CanvasAspectSerializer()
    electrical_aspect = ElectricalAspectSerializer()

    class Meta:
        model = Pump
        fields = ("id", "url", "name", "canvas_aspect", "electrical_aspect")

    def create(self, validated_data):
        canvas_aspect_data = validated_data.pop("canvas_aspect")
        canvas_aspect = CanvasAspect.objects.create(**canvas_aspect_data)
        electrical_aspect_data = validated_data.pop("electrical_aspect")
        electrical_aspect = ElectricalAspect.objects.create(**electrical_aspect_data)
        pump = Pump.objects.create(
            canvas_aspect=canvas_aspect,
            electrical_aspect=electrical_aspect,
            **validated_data
        )
        return pump


class PipeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.UUIDField()
    canvas_aspect = CanvasAspectSerializer()

    class Meta:
        model = Pipe
        fields = "__all__"

    def create(self, validated_data):
        canvas_aspect_data = validated_data.pop("canvas_aspect")
        canvas_aspect = CanvasAspect.objects.create(**canvas_aspect_data)
        pipe = Pipe.objects.create(canvas_aspect=canvas_aspect, **validated_data)
        return pipe

