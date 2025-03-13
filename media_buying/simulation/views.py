from rest_framework import viewsets
from .models import Campaign, Keyword, Result
from .serializers import CampaignSerializer, KeywordSerializer, ResultSerializer

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

class KeywordViewSet(viewsets.ModelViewSet):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer

class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import UploadedFile
from .serializers import UploadedFileSerializer

class UploadFileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = UploadedFileSerializer(data=request.data)

        if file_serializer.is_valid():
            file_instance = file_serializer.save()
            file_path = file_instance.file.path  # Get uploaded file path

            # Process the Excel file
            try:
                df = pd.read_excel(file_path)
                keywords = df["Keywords"].tolist()  # Extract keywords from Excel

                # Convert data to JSON
                extracted_data = {
                    "keywords": keywords,
                    "campaigns": df.to_dict(orient="records")
                }

                return Response({"message": "File uploaded and processed successfully", "data": extracted_data}, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
