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


class PumpSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pump
        fields = ("name", "canvasAspect")


class CanvasAspectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CanvasAspect
        fields = (
            "type",
            "top",
            "left",
            "width",
            "height",
            "svgUrl",
            "strokeWidth",
            "fill",
        )

