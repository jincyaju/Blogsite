document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 
    

    try {
        const response = await fetch('http://15.206.89.205/api-blog/UserLogin/', {
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

       
        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Fetch error:', errorData);
            document.getElementById('message').textContent = errorData.error || 'Login failed';
            return; 
        }

        const data = await response.json(); 
        console.log('Response:', data);         
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('user_id', data.user.user_id);

        
        document.getElementById('message').textContent = 'Login successful';
        
        window.location.href = 'http://15.206.89.205/list-blog' ;
    } catch (error) {
        console.error('Error:', error); 
        document.getElementById('message').textContent = 'Error occurred. Please check the console for more details.';
    }
});
