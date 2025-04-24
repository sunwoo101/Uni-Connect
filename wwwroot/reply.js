window.submitComment = async function submitComment(postId) {
    const commentInput = document.getElementById(`commentInput${postId}`);
    if (!commentInput) return;

    const textarea = commentInput.querySelector('textarea');
    const content = textarea.value.trim();

    if (!content) {
        showAlert('Please enter a reply', 'error');
        return;
    }

    const newComment = await api.addComment(userData.id, postId, content, null);

    textarea.value = '';

    // Update the existing modal
    if (newComment) {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.prepend(createCommentElement(newComment, postId));

        const commentCount = document.getElementById(`comment-count-id-${postId}`);
        commentCount.textContent = (parseInt(commentCount.textContent) + 1).toString();
    }
}