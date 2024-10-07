document.addEventListener('DOMContentLoaded', async function () {
   
    function getBlogIdFromPath() {
        const pathParts = window.location.pathname.split('/');
        return pathParts[pathParts.length - 1];  
    }

    
    const blogId = getBlogIdFromPath();
    
    try {
        const response = await fetch(`http://127.0.0.1:8000/api-blog/BlogApiById/${blogId}`);
        const blogData = await response.json();
        
    } catch (error) {
        console.error('Error fetching blog data:', error);
    }

    const deleteButton = document.getElementById('deleteBlogBtn');

    deleteButton.addEventListener('click', async function () {
        const confirmDelete = confirm('Are you sure you want to delete this blog?');
        
        if (confirmDelete) {
            try {
                const deleteResponse = await fetch(`http://127.0.0.1:8000/api-blog/BlogApiById/${blogId}`, {
                    method: 'DELETE',
                });

                if (deleteResponse.ok) {
                    alert('Blog deleted successfully');
                    window.location.href = '/blogs';  // Adjust the path as necessary
                } else {
                    const errorData = await deleteResponse.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                alert('An error occurred while trying to delete the blog.');
                console.error('Error deleting blog:', error);
            }
        }
    });
});
