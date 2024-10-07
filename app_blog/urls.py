from django.urls import path, re_path as url
from app_blog import views
app_name='app_blog'
urlpatterns = [

    path('CustomerApi/', views.CustomerApi),
    path('CustomerApiById/<str:id>', views.CustomerApiById),
    # url(r'^CustomerApiById/(?P<UserId>[0-9a-zA-Z\-]+)$', views.CustomerApiById),


    path('BlogApi/', views.BlogApi),
    url(r'^BlogApiById/(?P<BlogId>[0-9a-zA-Z\-]+)$', views.BlogApiById),
    url(r'^ListBlogbyUserId/(?P<UserId>[0-9a-zA-Z\-]+)$', views.ListBlogbyUserId),





    path('UserLogin/',views.UserLogin,name='UserLogin'),

     path('unauthenticated/', views.unauthenticatedView, name='unauthenticatedView'),
    path('logout/',views.user_logout,name='logout'),
]
