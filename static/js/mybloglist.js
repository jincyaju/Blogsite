document.addEventListener('DOMContentLoaded', async function () {
    const blogList = document.getElementById('blogList');
    const message = document.getElementById('message');
    const paginationControls = document.getElementById('paginationControls');
    const userId = localStorage.getItem('user_id'); // Retrieve the UserId from localStorage
    let nextUrl = null;
    let previousUrl = null;

    // Initial call to fetch the first page of blogs
    await fetchBlogs(`http://15.206.89.205/api-blog/ListBlogbyUserId/${userId}`);

    // Fetch blogs function with dynamic URL
    async function fetchBlogs(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) { // Check if the response is not successful
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const blogs = data.results;

            nextUrl = data.next;
            previousUrl = data.previous;

            blogList.innerHTML = '';  // Clear the existing blogs
            renderBlogs(blogs); // Call to render both recent and other blogs

            updatePaginationControls();  // Enable/disable buttons based on nextUrl/previousUrl
        } catch (error) {
            console.error('Error:', error);
            message.textContent = `An error occurred: ${error.message}`;
        }
    }

    // Render both recent and other blogs
    function renderBlogs(blogs) {
        if (blogs.length === 0) {
            message.textContent = 'No blogs available.';
            return;
        }

        const recentBlog = blogs[0];  
        const otherBlogs = blogs.slice(1);

        renderRecentBlog(recentBlog);
        renderOtherBlogs(otherBlogs);
    }

    // Render the recent blog
    function renderRecentBlog(blog) {
        const recentBlogCard = `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden col-span-1 md:col-span-2 lg:col-span-3" data-blog-id="${blog.BlogId}">
                <img class="w-full h-64 object-cover" src="${blog.BlogImage ? blog.BlogImage : '/static/images/default-image.png'}" alt="${blog.Title}">
                <div class="p-6">
                    <h2 class="text-3xl font-bold mb-4">${blog.Title}</h2>
                    <p class="text-gray-700 mb-4">${blog.Description.substring(0, 150)}...</p>
                    <a href="/detail-blog/${blog.BlogId}" class="text-indigo-500 hover:underline font-semibold">Read more</a>
                    <div class="flex items-center mt-4 space-x-3">
                        <a href="/edit-blog/${blog.BlogId}" class="text-blue-500 hover:text-blue-700">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="/delete-blog/${blog.BlogId}" class="text-blue-500 hover:text-blue-700">
                            <i class="fas fa-trash-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        blogList.innerHTML += recentBlogCard;  // Insert the recent blog at the top
    }

    // Render other blogs
    function renderOtherBlogs(blogs) {
        blogs.forEach(blog => {
            const blogCard = `
                <div class="bg-white shadow-md rounded-lg overflow-hidden" data-blog-id="${blog.BlogId}">
                    <img class="w-full h-48 object-cover" src="${blog.BlogImage ? blog.BlogImage : '/static/images/default-image.png'}" alt="${blog.Title}">
                    <div class="p-4">
                        <h2 class="text-2xl font-bold mb-2">${blog.Title}</h2>
                        <p class="text-gray-700 mb-4">${blog.Description.substring(0, 100)}...</p>
                        <a href="/detail-blog/${blog.BlogId}" class="text-indigo-500 hover:underline font-medium">Read more</a>
                        <div class="flex items-center mt-4 space-x-3">
                            <a href="/edit-blog/${blog.BlogId}" class="text-blue-500 hover:text-blue-700">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="/delete-blog/${blog.BlogId}" class="text-blue-500 hover:text-blue-700">
                                <i class="fas fa-trash-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            blogList.innerHTML += blogCard;
        });
    }

    // Pagination controls (next and previous buttons)
    function updatePaginationControls() {
        paginationControls.innerHTML = '';  // Clear the pagination controls

        if (previousUrl) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.classList.add('bg-indigo-500', 'text-white', 'p-2', 'rounded');
            prevButton.onclick = () => fetchBlogs(previousUrl);
            paginationControls.appendChild(prevButton);
        }

        if (nextUrl) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.classList.add('bg-indigo-500', 'text-white', 'p-2', 'rounded');
            nextButton.onclick = () => fetchBlogs(nextUrl);
            paginationControls.appendChild(nextButton);
        }
    }
});
