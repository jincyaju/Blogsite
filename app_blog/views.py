from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from app_blog.models import Blog, Customer
from app_blog.serializers import BlogSerializer, UserSerializer
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import AccessToken

from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from django.contrib import auth
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
# Create your views here.




@csrf_exempt
@api_view(['GET','POST','PUT'])
def CustomerApi(request):
    # try:
        if request.method == 'GET':
            customer = Customer.objects.all().order_by('-SortId')
            customerSerializer = UserSerializer(
                    customer, many=True)
            return JsonResponse(customerSerializer.data, safe=False)
        elif request.method == 'POST':
            # customerData = request.data
            customerSerializer = UserSerializer(data=request.data)
           
            
            if customerSerializer.is_valid():
                
                customerSerializer.save()
                return JsonResponse(customerSerializer.data['id'], safe=False)
            return JsonResponse("Failed to add", safe=False)
        elif request.method == 'PUT':
            customerData = request.data
            customer = Customer.objects.get(
                id=customerData['id'])
            customerSerializer = UserSerializer(
                customer, data=customerData)
            if customerSerializer.is_valid():
                customerSerializer.save()
                return JsonResponse(customerSerializer.data['id'], safe=False)
            return JsonResponse("Failed to Update", safe=False)
        else:
            return JsonResponse("", safe=False)
    # except:
    #     return JsonResponse("", safe=False)
    
@csrf_exempt
@api_view(['GET','DELETE'])
def CustomerApiById(request, id=""):
    try:
        if request.method == 'GET': 
            customer = Customer.objects.get(
                    id=id)
            customerSerializer = UserSerializer(
                    customer)
            customerData=customerSerializer.data
               
            return JsonResponse(customerData, safe=False)
        elif request.method == 'DELETE':
            customer = Customer.objects.get(id=id)
            customer.profile_photo.delete(save=True)
            customer.delete()
           

            return JsonResponse("Deleted successfully", safe=False)
        else:
            return JsonResponse("", safe=False)
    except:
        return JsonResponse("", safe=False)
    

@csrf_exempt
@api_view(['GET', 'POST', 'PUT'])
def BlogApi(request):
    try:
        if request.method == 'GET':
           
            blog = Blog.objects.all().order_by('-SortId')
            blogSerializer = BlogSerializer(blog, many=True)
            return JsonResponse(blogSerializer.data, safe=False)

        elif request.method == 'POST':
            blogSerializer = BlogSerializer(data=request.data)
            if blogSerializer.is_valid():
                blogSerializer.save()
                return JsonResponse(blogSerializer.data['BlogId'], safe=False)
            return JsonResponse("Failed to add", safe=False)

        elif request.method == 'PUT':
            blogData = request.data
            blog = Blog.objects.get(BlogId=blogData['BlogId'])
            blogSerializer = BlogSerializer(blog, data=blogData)
            if blogSerializer.is_valid():
                blogSerializer.save()
                return JsonResponse(blogSerializer.data['BlogId'], safe=False)
            return JsonResponse("Failed to Update", safe=False)

        else:
            return JsonResponse("", safe=False)

    except:
        return JsonResponse("", safe=False)
    
@csrf_exempt
@api_view(['GET','DELETE'])
def BlogApiById(request, BlogId=""):
    try:
        if request.method == 'GET': 
            blog = Blog.objects.get(
                    BlogId=BlogId)
            blogSerializer = BlogSerializer(
                    blog)
            blogData=blogSerializer.data
               
            return JsonResponse(blogData, safe=False)
        # elif request.method == 'DELETE':
        #     blog = Blog.objects.get(BlogId=BlogId)
        #     blog.BlogImage.delete(save=True)
        #     blog.delete()
        #     return JsonResponse("Deleted successfully", safe=False)
        else:
            return JsonResponse("", safe=False)
    except:
        return JsonResponse("", safe=False)
    




@api_view(['GET'])
def ListBlogbyUserId(request, UserId):
    blog = Blog.objects.filter(UserId=UserId).order_by('-SortId')
    paginator = PageNumberPagination()
    paginator.page_size = 7
    result_page = paginator.paginate_queryset(blog, request)

    serializer = BlogSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


def user_logout(request):
    auth.logout(request)
    return redirect('login')





from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken

# # *****
@api_view(['POST'])
def UserLogin(request):
    username = request.data.get('username')
    password = request.data.get('password')

    
    if not username or not password:
        return Response({"error": "Please provide both username/email and password."}, status=400)

    user = authenticate(username=username, password=password)
    
    if user is None:
        try:
            user = Customer.objects.get(email=username)  # Assuming email can also be used as login
            if not user.check_password(password):
                return Response({"error": "Invalid password."}, status=400)
        except Customer.DoesNotExist:
            return Response({"error": "User does not exist."}, status=404)   
    if user is not None:
        # login(request, user)
       
        token = AccessToken.for_user(user)
        
        
        return Response({
            'access': str(token),
            'user': {
                'user_id': user.id,
                'username': user.username,
                'email': user.email,
            }
        })
    
    
    return Response({"error": "Invalid credentials."}, status=400)
 
def login(request):
    return render(request, 'login.html')

def CustomerRegistration(request):
    return render(request, 'userregistration.html')


def ListAllBlog(request):
    return render(request,'blog_list.html')


def CreateBlog(request):
    return render(request,'blog_create.html')


def editBlog(request, BlogId=""):
   
    blog = Blog.objects.get(BlogId=BlogId)
    return render(request, 'blog-edit.html', {'blog': blog})


def ListAllMyBlog(request):
    return render(request,'myblog.html')



def DeleteBlog(request,BlogId=""):
    if request.method=='POST':
        blog = Blog.objects.get(BlogId=BlogId)
        blog.BlogImage.delete(save=True)
        blog.delete()
        return redirect('list-my-blog')
    return render(request,'delete.html')

def editCustomer(request, id=""):
   
    customer = Customer.objects.get(id=id)
    return render(request, 'profile-edit.html', {'customer': customer})



def unauthenticatedView(request):
    return render(request, 'unauthenticated.html')


def BlogDetail(request, BlogId=""):
   
    blog = Blog.objects.get(BlogId=BlogId)
    user=Customer.objects.get(id=blog.UserId)
    context={
        'blog':blog,
        'author':user.username
    }
    return render(request, 'blog_detail.html', context)