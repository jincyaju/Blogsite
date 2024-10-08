document.addEventListener('DOMContentLoaded', async function () {
    function getBlogIdFromPath() {
        const pathParts = window.location.pathname.split('/');
        return pathParts[pathParts.length - 1];  // Get the last part of the URL
    }
    
    // Get the BlogId from the path
    const blogId = getBlogIdFromPath();
    
    // Fetch the blog data and prefill the form
    try {
        const response = await fetch(`http://15.206.89.205/api-blog/BlogApiById/${blogId}`);
        const blogData = await response.json();

        if (response.ok) {
            document.getElementById('Title').value = blogData.Title;
            document.getElementById('Description').value = blogData.Description;
            document.getElementById('Tags').value = blogData.Tags;
        } else {
            document.getElementById('message').textContent = 'Failed to load blog data';
        }
    } catch (error) {
        console.error('Error loading blog data:', error);
        document.getElementById('message').textContent = 'Error loading blog data';
    }

    // Handle form submission for blog update
    document.getElementById('blogEditForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('Title').value;
        const content = document.getElementById('Description').value;
        const tags = document.getElementById('Tags').value;
        const image = document.getElementById('BlogImage').files[0];

        const userId = localStorage.getItem('user_id');
        console.log('User ID:', userId);
        
        const formData = new FormData();
        formData.append('BlogId', blogId);
        formData.append('Title', title);
        formData.append('Description', content);
        formData.append('Tags', tags);
        formData.append('UserId', userId);

        // Only append the image if a new one is selected
        if (image) {
            formData.append('BlogImage', image);
        }

        try {
            const response = await fetch(`http://15.206.89.205/api-blog/BlogApi/`, {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();
           
            if (response.ok) {
                document.getElementById('message').textContent = 'Blog updated successfully!';
                setTimeout(() => {
                    window.location.href = '/list-blog';
                }, 2000);
            } else {
                document.getElementById('message').textContent = data.error || 'Failed to update post';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Error occurred. Please try again.';
        }
    });
});
