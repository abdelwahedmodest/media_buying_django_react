from django.db import models

class Campaign(models.Model):
    CAMPAIGN_TYPES = [
        ('search', 'Search Ads'),
        ('display', 'Display Ads'),
        ('video', 'Video Ads'),
        ('social', 'Social Media Ads'),
    ]

    name = models.CharField(max_length=255)
    campaign_type = models.CharField(max_length=20, choices=CAMPAIGN_TYPES)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    target_audience = models.TextField()

    def __str__(self):
        return self.name

class Keyword(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="keywords")
    keyword = models.CharField(max_length=255)
    competition_level = models.CharField(max_length=50, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High')
    ])
    search_volume = models.PositiveIntegerField()

    def __str__(self):
        return self.keyword

class Result(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="results")
    impressions = models.PositiveIntegerField()
    clicks = models.PositiveIntegerField()
    conversions = models.PositiveIntegerField()
    cost_per_click = models.DecimalField(max_digits=6, decimal_places=2)
    conversion_rate = models.FloatField()
    roas = models.FloatField()  # Return On Ad Spend

    def __str__(self):
        return f"Results for {self.campaign.name}"



class UploadedFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
