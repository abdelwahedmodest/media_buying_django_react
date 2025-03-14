from rest_framework import serializers
from .models import Campaign, Keyword, Result
from .models import UploadedFile

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = '__all__'

class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = '__all__'

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'

class CampaignSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True, read_only=True)
    results = ResultSerializer(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = '__all__'
