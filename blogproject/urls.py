"""
URL configuration for blogproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import include
from django.conf import settings
from django.conf.urls.static import static
from app_blog import views
from django.urls import path, re_path as url
from django.views.static import serve


urlpatterns = [
    path('admin/', admin.site.urls),
  path('ckeditor/',include('ckeditor_uploader.urls')),
    path('api-blog/', include('app_blog.urls')),

    path('create-blog/',views.CreateBlog,name='create-blog'),
    url(r'^edit-blog/(?P<BlogId>[0-9a-zA-Z\-]+)$', views.editBlog,name='edit-blog'),
    url(r'^detail-blog/(?P<BlogId>[0-9a-zA-Z\-]+)$', views.BlogDetail,name='detail-blog'),
    url(r'^delete-blog/(?P<BlogId>[0-9a-zA-Z\-]+)$', views.DeleteBlog,name='delete-blog'),
    # url(r'^edit-profile/(?P<id>[0-9a-zA-Z\-]+)$', views.editCustomer,name='edit-profile'),
path('edit-profile/<str:id>/',views.editCustomer,name='edit-profile'),
    # path('edit-blog/',views.editBlog,name='edit-blog'),
    path('list-blog/',views.ListAllBlog,name='list-blog'),
    path('user-register/',views.CustomerRegistration,name='user-register'),
    path('',views.login,name='login'),
    path('list-my-blog/',views.ListAllMyBlog,name='list-my-blog'),



    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT,}),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
