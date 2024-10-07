document.addEventListener('DOMContentLoaded', async function () {
    const blogList = document.getElementById('blogList');
    const message = document.getElementById('message');

    // Retrieve the token from storage
    const token = localStorage.getItem('access_token'); // Adjust based on how you store it

    if (!token) {
        message.textContent = 'You must be logged in to view the blogs.';
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/api-blog/BlogApi/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`, // Use 'Bearer' prefix if using JWT
            },
        });

        if (response.status === 401) {
            message.textContent = 'Authentication failed. Please log in again.';
            return;
        }

        const blogs = await response.json();

        if (response.ok) {
            if (blogs.length === 0) {
                message.textContent = 'No blogs available.';
                return;
            }

            const recentBlog = blogs[0];
            const otherBlogs = blogs.slice(1);

            renderRecentBlog(recentBlog);
            renderOtherBlogs(otherBlogs);

        } else {
            message.textContent = `Failed to load blogs: ${blogs.detail || 'Unknown error.'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        message.textContent = 'An error occurred while fetching blogs.';
    }
});



function renderRecentBlog(blog) {
    const blogList = document.getElementById('blogList');
    const recentBlogCard = `
        <div class="bg-white shadow-lg rounded-lg overflow-hidden col-span-1 md:col-span-2 lg:col-span-3">
            <img class="w-full h-64 object-cover" src="${blog.BlogImage ? blog.BlogImage : '/static/images/default-image.png'}" alt="${blog.title}">
            <div class="p-6">
                <h2 class="text-3xl font-bold mb-4">${blog.Title}</h2>
                <p class="text-gray-700 mb-4">${blog.Description.substring(0, 150)}...</p>
                <a href="/detail-blog/${blog.BlogId}" class="text-indigo-500 hover:underline font-semibold">Read more</a>
            </div>
        </div>
    `;
    blogList.innerHTML += recentBlogCard;  // Insert the recent blog at the top
}

function renderOtherBlogs(blogs) {
    const blogList = document.getElementById('blogList');
    
    blogs.forEach(blog => {
        const blogCard = `
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
                <img class="w-full h-48 object-cover" src="${blog.BlogImage ? blog.BlogImage : '/static/images/default-image.png'}" alt="${blog.title}">
                <div class="p-4">
                    <h2 class="text-2xl font-bold mb-2">${blog.Title}</h2>
                    <p class="text-gray-700 mb-4">${blog.Description.substring(0, 100)}...</p>
                    <a href="/detail-blog/${blog.BlogId}" class="text-indigo-500 hover:underline font-medium">Read more</a>
                </div>
            </div>
        `;
        blogList.innerHTML += blogCard;
    });
}
