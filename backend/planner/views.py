from django.contrib.auth.models import User, Group

from rest_framework import viewsets
from .serializers import (
    UserSerializer,
    GroupSerializer,
    CanvasAspectSerializer,
    ElectricalAspectSerializer,
    MetaAspectSerializer,
    WaterAspectSerializer,
)
from .models import CanvasAspect, ElectricalAspect, MetaAspect, WaterAspect


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class CanvasAspectViewSet(viewsets.ModelViewSet):
    queryset = CanvasAspect.objects.all()
    serializer_class = CanvasAspectSerializer


class ElectricalAspectViewSet(viewsets.ModelViewSet):
    queryset = ElectricalAspect.objects.all()
    serializer_class = ElectricalAspectSerializer


class MetaAspectViewSet(viewsets.ModelViewSet):
    queryset = MetaAspect.objects.all()
    serializer_class = MetaAspectSerializer


class WaterAspectViewSet(viewsets.ModelViewSet):
    queryset = WaterAspect.objects.all()
    serializer_class = WaterAspectSerializer
