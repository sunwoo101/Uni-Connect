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
    
            // showAlert(result.message, 'success');
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
    
            // showAlert(result.message, 'success');
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
                    image: image,
                    video: video,
                    voice: voice,
                    event: event
                }) // Bookmark
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
    
            return true;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return false;
        }
    }

    async fetchPosts(firstFetch, userId, postIdAnchor, postFilter) {
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
                    postFilter: postFilter,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
    
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return null;
        }
    }

    async fetchPost(userId, postId) {
        try {
            const response = await fetch(`/api/post/fetchSingular`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
            
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return null;
        }
    }

    async likePost(userId, postId) {
        try {
            const response = await fetch(`/api/post/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');

            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return;
        }
    }

    async removeLikePost(userId, postId) {
        try {
            const response = await fetch(`/api/post/removeLike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
            
            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
            
            return;
        }
    }

    async savePost(userId, postId) {
        try {
            const response = await fetch(`/api/post/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');

            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return;
        }
    }

    async removeSavePost(userId, postId) {
        try {
            const response = await fetch(`/api/post/removeSave`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
            
            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
            
            return;
        }
    }

    async attendEvent(userId, eventId) {
        try {
            const response = await fetch(`/api/post/attendEvent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    eventId: eventId,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');

            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return;
        }
    }

    async removeAttendEvent(userId, eventId) {
        try {
            const response = await fetch(`/api/post/removeAttendEvent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    eventId: eventId,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');

            return;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return;
        }
    }

    async addComment(userId, postId, content, parentCommentId = null) {
        try {
            const response = await fetch(`/api/post/addComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                    content: content,
                    parentCommentId, parentCommentId,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');

            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');

            return null;
        }
    }

    async fetchComments(firstFetch, userId, postId, commentIdAnchor, parentCommentId = null) {
        try {
            const response = await fetch(`/api/post/fetchComments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstFetch: firstFetch,
                    userId: userId,
                    postId: postId,
                    commentIdAnchor: commentIdAnchor,
                    parentCommentId: parentCommentId,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
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
                body: formData,
            });
    
            if (!response.ok) throw new Error('Network error');
    
            const result = await response.json();
    
            if (!result.success) throw new Error(result.message);
    
            // showAlert(result.message, 'success');
    
            return result.data;
        } catch (error) {
            showAlert(error?.message || 'Something went wrong', 'error');
    
            return null;
        }
    }

    async updateProfile(userId, username, degree, profileImageURL) {
        try {
            const response = await fetch(`/api/profile/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    username: username,
                    degree: degree,
                    profileImageURL: profileImageURL,
                })
            });
    
            if (!response.ok) throw new Error('Network error');
    
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