export default class Api {
    async register(email, password, firstName, lastName, degree) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, firstName, lastName, degree })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            showAlert(result.message, 'success');
            localStorage.setItem('user', JSON.stringify(result.data))
    
            return true;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return false;
        }
    }
    
    async login(email, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            showAlert(result.message, 'success');
            localStorage.setItem('user', JSON.stringify(result.data))
    
            return true;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return false;
        }
    }
}