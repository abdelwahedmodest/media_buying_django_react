from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CampaignViewSet, KeywordViewSet, ResultViewSet
from .views import UploadFileView


router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet)
router.register(r'keywords', KeywordViewSet)
router.register(r'results', ResultViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/upload/', UploadFileView.as_view(), name='file-upload'),
]



