document.getElementById('blogCreateForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const title = document.getElementById('Title').value;
    const content = document.getElementById('Description').value;
    const tags = document.getElementById('Tags').value;
    const image = document.getElementById('BlogImage').files[0];

    const userId = localStorage.getItem('user_id');
    console.log('User ID:', userId);
    
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', content);
    formData.append('Tags', tags);
    formData.append('UserId', userId);
    if (image) {
        formData.append('BlogImage', image);
    }
    console.log(formData);

    try {
        const response = await fetch(`http://127.0.0.1:8000/api-blog/BlogApi/`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
       
        if (response.ok) {
            document.getElementById('message').textContent = 'Blog created successfully!';
            setTimeout(() => {
                window.location.href = '/list-blog';
            }, 2000);
        } else {
            document.getElementById('message').textContent = data.error || 'Failed to create post';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error occurred. Please try again.';
    }
});
