let token = "";

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
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
            localStorage.setItem('user', JSON.stringify(result.data.userResponse));
            localStorage.setItem('token', result.data.token);
            token = localStorage.getItem('token');
    
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
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
            localStorage.setItem('user', JSON.stringify(result.data.userResponse));
            localStorage.setItem('token', result.data.token);
            token = localStorage.getItem('token');
    
            return true;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return false;
        }
    }

    async tokenLogin(_token) {
        try {
            const response = await fetch('/api/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${_token}`
                },
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) return false;
    
            // showAlert(result.message, 'success');
            localStorage.setItem('user', JSON.stringify(result.data.userResponse));
            localStorage.setItem('token', result.data.token);
            token = localStorage.getItem('token');
    
            return true;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return false;
        }
    }
    
    async createPost(content, image, video, voice, event) {
        try {
            const response = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: content,
                    image: image,
                    video: video,
                    voice: voice,
                    event: event
                }) // Bookmark
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
    
            return true;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return false;
        }
    }

    async fetchPosts(firstFetch, postIdAnchor, postFilter) {
        try {
            const response = await fetch(`/api/post/fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstFetch: firstFetch,
                    postIdAnchor: postIdAnchor,
                    postFilter: postFilter,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
    
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return null;
        }
    }

    async fetchPost(postId) {
        try {
            const response = await fetch(`/api/post/fetchSingular`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
            
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return null;
        }
    }

    async likePost(postId) {
        try {
            const response = await fetch(`/api/post/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            showAlert(result.message, 'success');

            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return;
        }
    }

    async removeLikePost(postId) {
        try {
            const response = await fetch(`/api/post/removeLike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
            
            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
            
            return;
        }
    }

    async savePost(postId) {
        try {
            const response = await fetch(`/api/post/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            showAlert(result.message, 'success');

            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return;
        }
    }

    async removeSavePost(postId) {
        try {
            const response = await fetch(`/api/post/removeSave`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
            
            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
            
            return;
        }
    }

    async attendEvent(eventId) {
        try {
            const response = await fetch(`/api/post/attendEvent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    eventId: eventId,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');

            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return;
        }
    }

    async removeAttendEvent(eventId) {
        try {
            const response = await fetch(`/api/post/removeAttendEvent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    eventId: eventId,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');

            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return;
        }
    }

    async addComment(postId, content, parentCommentId = null) {
        try {
            const response = await fetch(`/api/post/addComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    postId: postId,
                    content: content,
                    parentCommentId, parentCommentId,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');

            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return null;
        }
    }

    async fetchComments(firstFetch, postId, commentIdAnchor, parentCommentId = null) {
        try {
            const response = await fetch(`/api/post/fetchComments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstFetch: firstFetch,
                    postId: postId,
                    commentIdAnchor: commentIdAnchor,
                    parentCommentId: parentCommentId,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
    
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return null;
        }
    }

    async uploadImage(file) {
        const formData = new FormData();
        formData.append('request', file);

        try {
            const response = await fetch(`/api/upload/image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
    
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
            console.error(error?.message);
    
            return null;
        }
    }

    async uploadVideo(file) {
        const formData = new FormData();
        formData.append('request', file);

        try {
            const response = await fetch(`/api/upload/video`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
    
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
            console.error(error?.message);
    
            return null;
        }
    }

    async updateProfile(username, degree, profileImageURL) {
        try {
            const response = await fetch(`/api/profile/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: username,
                    degree: degree,
                    profileImageURL: profileImageURL,
                })
            });
    
            if (!response.ok) throw new Error('Server restarting. Please try again after 5 minutes.');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
    
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return null;
        }
    }
}