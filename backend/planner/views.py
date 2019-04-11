from django.contrib.auth.models import User, Group

from rest_framework import viewsets
from .serializers import (
    UserSerializer,
    GroupSerializer,
    CanvasAspectSerializer,
    ElectricalAspectSerializer,
    PumpSerializer,
    PipeSerializer,
    WaterAspectSerializer,
)
from .models import (
    CanvasAspect,
    ElectricalAspect,
    Pump,
    Pipe,
    WaterAspect,
)


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


class PumpViewSet(viewsets.ModelViewSet):
    queryset = Pump.objects.all()
    serializer_class = PumpSerializer


class PipeViewSet(viewsets.ModelViewSet):
    queryset = Pipe.objects.all()
    serializer_class = PipeSerializer
