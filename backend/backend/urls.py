"""tutorial URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_extensions.routers import NestedRouterMixin
from planner import views

class NestedDefaultRouter(NestedRouterMixin, DefaultRouter):
    pass

router = NestedDefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)
pump_router = router.register(r"pumps", views.PumpViewSet)
pump_router.register("canvas-aspect", views.CanvasAspectViewSet, base_name="pump-canvas-aspect", parents_query_lookups=["canvasAspect"])
router.register(r"canvas-aspect", views.CanvasAspectViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
]
