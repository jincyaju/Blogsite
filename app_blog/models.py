from django.db import models
from datetime import datetime
import uuid
from django.contrib.auth.models import AbstractUser
from ckeditor_uploader.fields import RichTextUploadingField


# Create your models here.
class Customer(AbstractUser):
    profile_photo=models.ImageField(null=True,blank=True,upload_to='profile_images/')
    phone_number=models.CharField(blank=True, null=True, max_length=15)
    
class Blog(models.Model):
    SortId = models.DateTimeField(editable=False, default=datetime.now)
    BlogId = models.CharField(
        max_length=50, primary_key=True, default=uuid.uuid4, editable=False)
    Title=models.CharField(blank=True, null=True, max_length=300)
    Description=RichTextUploadingField(null=True,blank=True)
    UserId=models.CharField(max_length=50)
    CreatedDate=models.DateTimeField(default=datetime.now)
    Tags=models.CharField(blank=True, null=True, max_length=300)
    BlogImage=models.ImageField(null=True,blank=True,upload_to='blog_images/')

    
