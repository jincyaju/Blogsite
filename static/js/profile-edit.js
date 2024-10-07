document.addEventListener('DOMContentLoaded', async function () {
    // Get user ID from localStorage
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');
    // Ensure userId exists
    if (!userId) {
        document.getElementById('message').textContent = 'User ID not found. Please login again.';
        return;
    }

    try {
        // Fetch customer data by userId
        const response = await fetch(`http://127.0.0.1:8000/api-blog/CustomerApiById/${userId}`);
        const customerData = await response.json();

        if (response.ok) {
            // Fill the form fields with the fetched customer data
            document.getElementById('username').value = customerData.username || '';
            document.getElementById('email').value = customerData.email || '';
        } else {
            document.getElementById('message').textContent = 'Failed to load customer data';
        }
    } catch (error) {
        console.error('Error loading customer data:', error);
        document.getElementById('message').textContent = 'Error loading customer data';
    }

    // Handle form submission for customer update
    document.getElementById('profileEditForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form field values
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const image = document.getElementById('profile_photo').files[0];

        const formData = new FormData();
        formData.append('id', userId);  // Assuming 'id' is used to identify the customer
        formData.append('username', username);
        formData.append('email', email);

        // Only append the image if a new one is selected
        if (image) {
            formData.append('profile_photo', image);
        }

        try {
            // Update the customer profile with PUT request
            const response = await fetch(`http://127.0.0.1:8000/api-blog/CustomerApi/`, {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('message').textContent = 'Profile updated successfully!';
                setTimeout(() => {
                    window.location.href = '/list-blog';
                }, 2000);
            } else {
                document.getElementById('message').textContent = data.error || 'Failed to update profile';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Error occurred. Please try again.';
        }
    });
});
