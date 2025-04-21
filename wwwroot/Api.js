export default class Api {
    async register(email, password, firstName, lastName, degree) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    degree: degree
                })
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
                body: JSON.stringify({
                    email: email,
                    password: password
                })
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
    
    async createPost(userId, content, image, video, voice, event) {
        try {
            const response = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    content: content,
                    image: null,
                    video: null,
                    voice: null,
                    event: null
                }) // Bookmark
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            showAlert(result.message, 'success');
    
            return true;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return false;
        }
    }

    async fetchPosts(firstFetch, userId, postIdAnchor) {
        try {
            const response = await fetch(`/api/post/fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstFetch: firstFetch,
                    userId: userId,
                    postIdAnchor: postIdAnchor,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            showAlert(result.message, 'success');
    
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return null;
        }
    }
}