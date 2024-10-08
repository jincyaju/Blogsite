## Project Overview

This is a simple Blog Application platform built with Python and Django. It allows users to create, edit, and delete blog posts, and manage their profiles. The application follows RESTful API principles, ensuring scalability and ease of integration with other services.

## Features

- **User Authentication**: Register, login, and manage user profiles.
- **CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **Responsive Design**: Accessible on all devices with a mobile-first approach.
- **RESTful API**: Interact with the application programmatically.
- **Docker Support**: Containerize the application for easy deployment.

## Technologies Used

- **Backend**: Python, Django, Django REST Framework
- **Frontend**: HTML, Tailwind CSS, JavaScript,
- **Database**: MySQL
- **Containerization**: Docker, Docker Compose
- **Version Control**: Git


## Setup and Installation

### Prerequisites

- **Python 3.8+**
- **pip** (Python package installer)
- **Git**

### Installation Steps

1. **Clone the Repository**

 git clone https://github.com/jincyaju/Blogsite.git 

2. Create a virtual environment
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
3. pip install -r requirements.txt
4. Create database 'blog_db'
5. apply migrations to db
    python manage.py migrate
6. To run the application locally
    python manage.py runserver

###     Dockerization
To create docker image
docker build -t my-docker-image .

To create container
docker run -d --name my-docker-container -p 8001:8000 my-docker-image

docker compose up -d


### API Documentation

1. User Registration
URL: api-blog/CustomerApi/
Method:POST

parameter:{
    'username',
    'password',
    'email',
    'profile_photo'

}

2. User Login
URL: api-blog/UserLogin/
Method:POST

parameter:{
    'username',
    'password'

}

3. To create or update blog
URL: api-blog/BlogApi/
Method:POST/PUT
Parameter: {
    'Title',
    'Description',
    'UserId',
    'Tags',
    'BlogImage'
}


4. To list my blogs
URL: api-blog/ListBlogbyUserId/ + UserId
Method:GET
Response: paginated response of blog details

5. To get detail of one blog
URL: api-blog/BlogApiById/ + BlogId
Method:GET

6. To delete a blog
URL: api-blog/BlogApiById/ + BlogId
Method:DELETE



### Deployment
At first create the Ubuntu EC2 instance in your Amazon Web Service 
Chapter 1
----------
Install Linux, Nginx, MySQL, PHP (LEMP stack)
------------------------------------------------------------------------------------------------
1.	Update and Upgrade Ubuntu 
	
sudo apt-get update && sudo apt-get upgrade
2.	Install the Nginx Web Server
sudo apt-get install nginx
3.	Install MySQL Server
sudo apt-get install mysql-server
5.	Type Command to open mysql as:
		sudo mysql
6. create user and grant permission
7. Install PHP for Processing
sudo apt-get install php-fpm php-mysql
8. Configure Nginx to Use the PHP Processor
sudo nano /etc/nginx/sites-available/default
9. Type below command to check whether configuration files have error or not:
			sudo nginx -t
10. Reload the nginx:
    sudo systemctl reload nginx
11.	Install PhpMyAdmin using the command as:
	
sudo apt-get install phpmyadmin
12. Finally, Create symbolic link:
sudo ln -s /usr/share/phpmyadmin /var/www/html

After that restart nginx 
sudo systemctl restart nginx

Chapter 2
---------
1. clone the project
sudo git clone https://github.com/jincyaju/Blogsite.git
2. Install virtualenv with the command as:
	sudo apt-get install python3-venv
To create virtualenv use:
	python3 -m venv env_name
3.	Install mysqlclient inside the virtual environment of EC2 instance:
pip install mysqlclient
[Note: If error occurred while installing mysqlclient give command in new terminal as:]

sudo apt-get install python3 python3-dev python3-pip libxml2-dev libxslt1-dev zlib1g-dev libffi-dev libssl-dev
Also Run: 
sudo apt install libmysqlclient-dev

4. Install all plugins using pip install -r requirement.txt
5.	Install Gunicorn:
6.	Bind the application with gunicorn:
Specify a server socket to bind.
Syntax:
	gunicorn --bind 0.0.0.0:8000 Project_Name.wsgi:application
7.	Install supervisor: 
sudo apt-get install -y supervisor
8. Configure supervisor
Step 1: Go to the conf.d directory 

	cd /etc/supervisor/conf.d/

Step 2: Create gunicorn.conf file
	
	sudo touch gunicorn.conf

Step 3: Configure the gunicorn.conf file with following lines of code:
	
	sudo nano gunicorn.conf
9.	Create gunicorn directory in following path:

mkdir /var/log/gunicorn
10.	Re-read and then update supervisor to configuration file:

sudo supervisorctl reread
 It must say guni:available if not then you might have made some mistakes in gunicorn.conf file. 

sudo supervisorctl update

9.	Start supervisor to start at background:

sudo supervisorctl status
		It must say RUNNING pid …..
10.	Go to the sites-available directory and configure below code:
sudo nano /etc/nginx/sites-available/default
11. Restart nginx and the supervisor using the command as:

sudo service nginx restart
 sudo supervisorctl restart all













