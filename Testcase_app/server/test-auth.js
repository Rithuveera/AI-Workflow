

const API_URL = 'http://localhost:3001/api/auth';

async function testAuth() {
    try {
        console.log('Testing Registration...');
        const regRes = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'testuser', password: 'password123' })
        });

        const regData = await regRes.json();
        console.log('Registration Status:', regRes.status);
        console.log('Registration Response:', regData);

        if (regRes.status === 201 || regData.error === 'Username already exists') {
            console.log('\nTesting Login...');
            const loginRes = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'testuser', password: 'password123' })
            });

            const loginData = await loginRes.json();
            console.log('Login Status:', loginRes.status);
            if (loginRes.ok) {
                console.log('Login Success! Token received.');
            } else {
                console.log('Login Failed:', loginData);
            }
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testAuth();
