import Api from './Api.js';
import Utilities from './Utilities.js';

// Session variables
let loggedIn = false;
let userData = null;

// New
const api = new Api();
const utilities = new Utilities();

// Alert
const alertTimeoutDuration = 3000;
let alertTimeout;

window.showAlert = function showAlert(message, type = 'info') {
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');

    // Clear existing alert timeout
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }

    // Set icon and colour based on alert type
    let iconClass = '';
    let iconColor = '';

    switch (type) {
        case 'success':
            iconClass = 'fa-check-circle';
            iconColor = 'text-green-600';
            break;
        case 'error':
            iconClass = 'fa-exclamation-circle';
            iconColor = 'text-red-600';
            break;
        case 'warning':
            iconClass = 'fa-exclamation-triangle';
            iconColor = 'text-yellow-600';
            break;
        default:
            iconClass = 'fa-info-circle';
            iconColor = 'text-blue-600';
            break;
    }

    alertIcon.innerHTML = `<i class="fas ${iconClass} ${iconColor} text-xl"></i>`;
    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');

    // Auto-hide after 5 seconds
    alertTimeout = setTimeout(hideAlert, alertTimeoutDuration);
}

window.hideAlert = function hideAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.classList.add('hidden');
}

// Set active UI tab to feed
function updateActiveTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });
}

// Display feed function
window.displayFeed = async function displayFeed() {
    postFilter = 'Feed';

    hideAll();
    await displayPosts();
    updateActiveTab('feed');

    pauseScrollLoading = false;
}

// Update side bar profile function
window.updateSideBarProfile = function updateSideBarProfile() {
    const sideBarProfileImage = document.getElementById('sideBarProfileImage');
    const sideBarProfileName = document.getElementById('sideBarProfileName');
    const sideBarProfileUsername = document.getElementById('sideBarProfileUsername');
    const sideBarProfileDegree = document.getElementById('sideBarProfileDegree');

    sideBarProfileImage.src = (userData.profileImageURL && userData.profileImageURL != "") ? userData.profileImageURL : placeHolderPfp;
    sideBarProfileName.textContent = userData.firstName + " " + userData.lastName;
    sideBarProfileUsername.textContent = "@" + userData.username;
    sideBarProfileDegree.textContent = userData.degree;
}

// Update UI function
function updateUI() {
    const mainContent = document.getElementById('mainContent');
    const loginContent = document.getElementById('loginContent');
    const registerContent = document.getElementById('registerContent');
    const forgotPasswordContent = document.getElementById('forgotPasswordContent');
    const navButtons = document.getElementById('navButtons');
    // const downloadLinks = document.getElementById('downloadLinks');

    if (loggedIn) {
        // Show main social media content
        loginContent.classList.add('hidden');
        registerContent.classList.add('hidden');
        forgotPasswordContent.classList.add('hidden');
        // downloadLinks.classList.add('hidden');
        mainContent.classList.remove('hidden');

        // Render posts
        refreshFirstPostsFetch('Feed');
        displayFeed();

        navButtons.innerHTML = `
            <button onclick="refreshFirstPostsFetch('Profile'); showProfile(); hideCreatePostModal(); updateSideBarProfile()" class="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50">Profile</button>
            <button class="border border-white px-4 py-2 rounded-full hover:bg-blue-700" onclick="logout()">Logout</button>
        `;
    } else {
        // Hide main content and show login page
        mainContent.classList.add('hidden');

        navButtons.innerHTML = `
            <button class="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50" onclick="showLoginForm()">Sign In</button>
            <button class="border border-white px-4 py-2 rounded-full hover:bg-blue-700" onclick="showRegisterForm()">Sign Up</button>
        `;

        showLoginForm();
    }
}

// Show login form function
window.showLoginForm = async function showLoginForm() {
    clearAllErrors();
    const registerContent = document.getElementById('registerContent');
    const forgotPasswordContent = document.getElementById('forgotPasswordContent');
    const loginContent = document.getElementById('loginContent');
    // const downloadLinks = document.getElementById('downloadLinks');

    registerContent.classList.add('hidden');
    forgotPasswordContent.classList.add('hidden');
    loginContent.classList.remove('hidden');
    // downloadLinks.classList.remove('hidden');

    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
        document.getElementById('loginEmail').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

async function tokenLogin() {
    if (await api.tokenLogin(localStorage.getItem('token'))) {
        loggedIn = true;
        userData = JSON.parse(localStorage.getItem('user'));
        updateUI();
        updateActiveTab('feed');
        showCreatePostModal();
        updateSideBarProfile();

        return true;
    }

    return false;
}

// Login function
window.login = async function login() {
    clearAllErrors();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMeChecked = document.getElementById('rememberMe').checked;
    const loginButton = document.getElementById('loginButton');
    const loginLoading = document.getElementById('loginLoading');
    let invalidInput = false;

    // Input validation
    if (!email) {
        setInputError('loginEmail', 'loginEmailError', 'Please enter your email address');
        invalidInput = true;
    }

    if (!password) {
        setInputError('loginPassword', 'loginPasswordError', 'Please enter your password');
        invalidInput = true;
    }

    if (invalidInput) return;

    // Show loading animation
    loginButton.classList.add('hidden');
    loginLoading.classList.remove('hidden');

    if (await api.login(email, password)) {
        loggedIn = true;
        userData = JSON.parse(localStorage.getItem('user'));
        updateUI();
        updateActiveTab('feed');
        showCreatePostModal();
        updateSideBarProfile();

        if (rememberMeChecked) {
            localStorage.setItem("rememberedEmail", email);
        } else {
            localStorage.removeItem("rememberedEmail");
        }
    }

    // Hide loading animation
    loginButton.classList.remove('hidden');
    loginLoading.classList.add('hidden');
}

// Logout function
window.logout = function logout() {
    loggedIn = false;

    localStorage.setItem('token', "");

    // showAlert('Successfully logged out', 'info');

    updateUI();

    showLoginForm();
}

// Show forgot password form function
window.showForgotPasswordForm = function showForgotPasswordForm() {
    clearAllErrors();
    const loginContent = document.getElementById('loginContent');
    const forgotPasswordContent = document.getElementById('forgotPasswordContent');

    loginContent.classList.add('hidden');
    forgotPasswordContent.classList.remove('hidden');
}

// Send reset password email function
window.sendResetPasswordEmail = function sendResetPasswordEmail() {
    clearAllErrors();
    const email = document.getElementById('resetEmail').value;

    // Basic validation
    if (!email) {
        setInputError('resetEmail', 'resetEmailError', 'Please enter your email address');
        return;
    }

    if (!isValidEmail(email)) {
        setInputError('resetEmail', 'resetEmailError', 'Please enter a valid email address');
        return;
    }

    // Here you would typically make an API call to send the reset email
    showAlert('Password reset instructions have been sent to your email address.', 'success');
    showLoginForm();
}

// Show register form function
window.showRegisterForm = function showRegisterForm() {
    clearAllErrors();
    const loginContent = document.getElementById('loginContent');
    const forgotPasswordContent = document.getElementById('forgotPasswordContent');
    const registerContent = document.getElementById('registerContent');

    loginContent.classList.add('hidden');
    forgotPasswordContent.classList.add('hidden');
    registerContent.classList.remove('hidden');
}

// Valid email check function
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidName(str) {
    return /^[A-Za-z\s]+$/.test(str);
}

function isValidUsername(str) {
    return /^[A-Za-z0-9._]+$/.test(str);
}

function isValidDegree(str) {
    return /^[A-Za-z0-9() ]+$/.test(str);
}

// Register function
window.register = async function register() {
    clearAllErrors();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const degree = document.getElementById('degree').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const tosChecked = document.getElementById('tosCheckbox').checked;
    const registerButton = document.getElementById('registerButton');
    const registerLoading = document.getElementById('registerLoading');

    let invalidInput = false;

    // Basic validation
    if (!firstName) {
        setInputError('firstName', 'firstNameError', 'Please enter your first name');
        invalidInput = true;
    }

    if (!lastName) {
        setInputError('lastName', 'lastNameError', 'Please enter your last name');
        invalidInput = true;
    }

    if (!isValidName(firstName)) {
        setInputError('firstName', 'firstNameError', 'First name includes invalid characters');
        invalidInput = true;
    }

    if (!isValidName(lastName)) {
        setInputError('lastName', 'lastNameError', 'Last name includes invalid characters');
        invalidInput = true;
    }

    const emailExtension = email.split('@')[1];

    if (!email) {
        setInputError('registerEmail', 'registerEmailError', 'Please enter your email address');
        invalidInput = true;
    } else if (!isValidEmail(email)) {
        setInputError('registerEmail', 'registerEmailError', 'Please enter a valid email address');
        invalidInput = true;
    } else if (emailExtension && !emailExtension.includes('.edu.') && !emailExtension.endsWith('.edu')) {
        setInputError('registerEmail', 'registerEmailError', 'Please use your uni email address');
        invalidInput = true;
    }

    if (!degree) {
        setInputError('degree', 'degreeError', 'Please enter your degree');
        invalidInput = true;
    }

    if (!isValidDegree(degree)) {
        setInputError('degree', 'degreeError', 'Degree must only contain letters and numbers');
        invalidInput = true;
    }

    if (!password) {
        setInputError('registerPassword', 'registerPasswordError', 'Please enter a password');
        invalidInput = true;
    }

    if (!confirmPassword) {
        setInputError('confirmPassword', 'confirmPasswordError', 'Please confirm your password');
        invalidInput = true;
    } else if (password !== confirmPassword) {
        setInputError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
        invalidInput = true;
    }

    // Add a check to create a strong password

    // Check Terms of Service checkbox
    if (!tosChecked) {
        setInputError('tosCheckbox', 'tosError', 'You must agree to the Terms of Service and Privacy Policy');
        invalidInput = true;
    }

    if (invalidInput) return;

    registerLoading.classList.remove('hidden');
    registerButton.classList.add('hidden');

    if (await api.register(email, password, firstName, lastName, degree)) {
        loggedIn = true;
        userData = JSON.parse(localStorage.getItem('user'));
        updateUI();
        updateActiveTab('feed');
        updateSideBarProfile();
        showCreatePostModal();
    }

    registerLoading.classList.add('hidden');
    registerButton.classList.remove('hidden');
}

// Error handling functions
function setInputError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.add('input-error');
    error.textContent = message;
    error.classList.add('show');
}

function clearAllErrors() {
    // Clear all input errors
    const inputs = document.querySelectorAll('input');
    const errors = document.querySelectorAll('.error-message');

    inputs.forEach(input => {
        input.classList.remove('input-error');
    });

    errors.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
}

// Format timestamp function
function formatTimestamp(date) {
    if (!date.endsWith("Z")) {
        date = date + "Z";
    }
    const utcDate = new Date(date);
    const now = new Date();
    const diff = now - utcDate;

    // Convert to hours
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        return utcDate.toLocaleDateString(); // Show local date for posts older than 24h
    }
}

// Show create post modal 
window.showCreatePostModal = function showCreatePostModal() {
    document.getElementById('createPostProfileImage').src = (userData.profileImageURL && userData.profileImageURL != "") ? userData.profileImageURL : placeHolderPfp;
    document.getElementById('createPostModal').classList.remove('hidden'); // Show the create post modal
}

// Hide create post modal
window.hideCreatePostModal = function hideCreatePostModal() {
    document.getElementById('createPostModal').classList.add('hidden'); // Hide the create post modal
}

let adIndex = 0;
let adFrequency = Math.floor(Math.random() * 4) + 2; // How often to show ads

function newAdFrequencyValue() {
    adFrequency = Math.floor(Math.random() * 4) + 2;
    adIndex = 0;
}

let postFilter = '';
let postIdAnchor = 0;
let firstPostsFetch = true;
let isPostsLoading = false;
let allPostsLoaded = false;

let pauseScrollLoading = false;

window.addEventListener('scroll', async () => {
    if (allPostsLoaded || isPostsLoading || pauseScrollLoading) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;

    if (scrollPosition >= threshold) {
        isPostsLoading = true;

        await displayPosts();
    }

    isPostsLoading = false;
})

// Display posts function
async function displayPosts() { // Add a parameter so this function decides which group posts should be displayed
    const postsContainer = document.getElementById('postsContainer');
    const postsLoading = document.getElementById('postsLoading');

    postsLoading.classList.remove('hidden');

    // Sort posts by timestamp (newest first)
    const feedPosts = await api.fetchPosts(firstPostsFetch, postIdAnchor, postFilter);

    postsLoading.classList.add('hidden');

    if (!feedPosts || feedPosts.length === 0) {
        allPostsLoaded = true;
    }

    if ((!feedPosts || feedPosts.length === 0) && firstPostsFetch) {
        if (postFilter === 'Feed') {
            postsContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow p-6 text-center">
                <i class="fas fa-home text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
                <p class="text-gray-500">Be the first person to post</p>
            </div>
            `;
        } else if (postFilter === 'Saved') {
            postsContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow p-6 text-center">
                <i class="fas fa-bookmark text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No Saved Posts Yet</h3>
                <p class="text-gray-500">Posts you save will appear here</p>
            </div>
            `;
        } else if (postFilter === 'Profile') {
            postsContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow p-6 text-center">
                <i class="fas fa-user text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
                <p class="text-gray-500">Create your first post</p>
            </div>
            `;
        }

        return;
    } else {
        for (const post of feedPosts) {
            if (adIndex === adFrequency) {
                postsContainer.appendChild(createAdElement());
                // await embedAd(adId);
                adId++;
                newAdFrequencyValue();
                adIndex = 0;
            }

            postsContainer.appendChild(createPostElement(post));
            adIndex++;

            postIdAnchor = post.id;
            firstPostsFetch = false;
        }
    }

    while (!allPostsLoaded && document.body.scrollHeight <= window.innerHeight) {
        await displayPosts();
    }
}

// Function to display saved postss
window.displaySaved = async function displaySaved() {
    postFilter = 'Saved';
    hideAll();

    updateActiveTab('saved');

    // Display saved posts
    await displayPosts();

    pauseScrollLoading = false;
}

const placeHolderPfp = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNFMkUyRTIiLz48cGF0aCBkPSJNMjUgMjVjMy40NSAwIDYuMjUtMi44IDYuMjUtNi4yNVMyOC40NSAxMi41IDI1IDEyLjVzLTYuMjUgMi44LTYuMjUgNi4yNSAyLjggNi4yNSA2LjI1IDYuMjV6bTAgMTAuNWMtNC40IDAtMTMgMi4yLTEzIDYuNjNWNDVoMjZ2LTIuMzVjMC00LjQtOC42LTYuNjMtMTMtNi42M3oiIGZpbGw9IiM5OTk5OTkiLz48L3N2Zz4=';

// Create post element function
function createPostElement(post) {
    const _event = post.event;
    if (_event) _event.dateAndTime = new Date(_event.dateAndTime + 'Z');
    const user = post.user;
    const postElement = document.createElement('div');
    postElement.className = 'bg-white rounded-lg shadow p-4 break-words';
    postElement.innerHTML = `
        <div class="flex items-center space-x-4 mb-4">
            <img src="${(user.profileImageURL && user.profileImageURL != "") ? user.profileImageURL : placeHolderPfp}" alt="Profile" class="rounded-full w-12 h-12">
            <div>
                <h3 class="font-semibold">${user.firstName} ${user.lastName}</h3>
                <p class="text-gray-500 text-sm">${formatTimestamp(post.creationDate)}</p>
                <p class="text-gray-600 text-sm">${user.degree}</p>
            </div>
        </div>
        <p class="mb-4">${utilities.sanitiseString(post.content)}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image" class="max-h-[76vh] rounded-lg mb-4 w-full">` : ''}
        ${post.video ? `<video src="${post.video}" alt="Post Video" class="bg-gray-200 max-h-[76vh] rounded-lg mb-4 w-full" controls></video>` : ''}
        ${_event ? `
            <div class="bg-blue-50 rounded-lg p-4 mb-4">
                <div class="flex items-center space-x-3 mb-2">
                    <div class="bg-blue-100 p-2 rounded-lg">
                        <i class="fas fa-calendar text-blue-600"></i>
                    </div>
                    <div class="min-w-0">
                        <h4 class="font-semibold">${utilities.sanitiseString(_event.title)}</h4>
                        <p class="text-sm text-gray-600">${_event.dateAndTime.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })} at ${_event.dateAndTime.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })}</p>
                        <p class="text-sm text-gray-600">📍 ${utilities.sanitiseString(_event.location)}</p>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span id="attendee-count-id-${_event.id}" class="text-sm text-gray-600">${_event.attendeeCount} attending</span>
                    </div>
                    <button id="attend-id-${_event.id}" onclick="toggleEventAttendance(${_event.id})" 
                            class="text-sm px-3 py-1 rounded-full ${_event.isAttendee ? 'bg-blue-100 text-blue-600' : 'bg-white text-blue-600 border border-blue-600'} hover:bg-blue-100 transition-colors flex items-center space-x-1">
                        ${_event.isAttendee ? '<i class="fas fa-check"></i>' : 'Going'}
                    </button>
                </div>
            </div>
        ` : ''}
        <div class="flex justify-between items-center text-gray-500">
            <div class="flex space-x-4">
                <button class="hover:text-blue-600" onclick="toggleLike(${post.id})">
                    <i id="like-id-${post.id}" class="far fa-heart ${post.likedByYou ? 'fas text-red-600' : ''}"></i> 
                    <span id="like-count-id-${post.id}">${post.likeCount}</span> Like
                </button>
                <button class="hover:text-blue-600" onclick="showPostModal(${post.id})">
                    <i class="far fa-comment"></i> 
                    <span id="comment-count-id-${post.id}">${post.commentCount}</span> Comment
                </button>
            </div>
            <button class="hover:text-blue-600" onclick="toggleSave(${post.id})">
                <i id="save-id-${post.id}" class="far fa-bookmark ${post.savedByYou ? 'fas' : ''}"></i>
                <span id="save-count-id-${post.id}">${post.saveCount}</span> Save
            </button>
        </div>
    `;
    return postElement;
}

let adId = 0;

// Create ad element function
function createAdElement() {
    const adElement = document.createElement('div');
    adElement.className = 'bg-white rounded-lg shadow p-4';
    adElement.innerHTML = `
        <div class="flex items-center space-x-4 mb-4">
            <div>
                <h3 class="font-semibold">Sponsor</h3>
            </div>
        </div>
        <div id="ad-container-id-${adId}" class="bg-gray-200 cursor-pointer text-center flex items-center justify-center">
            <!-- Add a function that replaces the inner HTML with the ad API -->
            <h3 class="text-xl font-semibold text-gray-700 mb-2 py-10">This is a placeholder</h3>
        </div>
    `;

    return adElement;
}

async function embedAd(_adId) {
    const adContainerId = document.getElementById(`ad-container-id-${_adId}`);

    // Sample ad
    adContainerId.innerHTML = `<img src="https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-aws.jpg" alt="Post Image" class="rounded-lg w-full">`;
}

window.refreshFirstPostsFetch = async function refreshFirstPostsFetch(_postFilter) {
    postFilter = _postFilter;
    postIdAnchor = 0;
    firstPostsFetch = true;
    allPostsLoaded = false;
    pauseScrollLoading = true;

    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Clear existing posts
}

let freezeLikeButton = false;

// Toggle like function
window.toggleLike = async function toggleLike(postId) {
    if (freezeLikeButton) return;

    freezeLikeButton = true;
    const likeIcon = document.getElementById(`like-id-${postId}`);
    likeIcon.classList.toggle('fas');
    const liked = likeIcon.classList.toggle('text-red-600');

    if (liked) {
        await api.likePost(postId);

        const likeCount = document.getElementById(`like-count-id-${postId}`);
        likeCount.textContent = (parseInt(likeCount.textContent) + 1).toString();

        freezeLikeButton = false;
    } else {
        await api.removeLikePost(postId);

        const likeCount = document.getElementById(`like-count-id-${postId}`);
        likeCount.textContent = (parseInt(likeCount.textContent) - 1).toString();

        freezeLikeButton = false;
    }
}

let freezeSaveButton = false;

// Toggle save function
window.toggleSave = async function toggleSave(postId) {
    if (freezeSaveButton) return;

    freezeSaveButton = true;
    const saveIcon = document.getElementById(`save-id-${postId}`);
    const saved = saveIcon.classList.toggle('fas');

    if (saved) {
        await api.savePost(postId);

        const saveCount = document.getElementById(`save-count-id-${postId}`);
        saveCount.textContent = (parseInt(saveCount.textContent) + 1).toString();

        freezeSaveButton = false;
    } else {
        await api.removeSavePost(postId);

        const saveCount = document.getElementById(`save-count-id-${postId}`);
        saveCount.textContent = (parseInt(saveCount.textContent) - 1).toString();

        freezeSaveButton = false;
    }
}

let freezeGoingButton = false;

// Toggle event attendance function
window.toggleEventAttendance = async function toggleEventAttendance(eventId) {
    if (freezeGoingButton) return;

    freezeGoingButton = true;
    const attendButton = document.getElementById(`attend-id-${eventId}`);
    attendButton.classList.toggle('bg-white');
    attendButton.classList.toggle('border');
    attendButton.classList.toggle('border-blue-600');

    if (attendButton.innerHTML.includes('Going')) {
        attendButton.innerHTML = `<i class="fas fa-check"></i>`;
    } else {
        attendButton.innerHTML = `Going`;
    }

    const attending = attendButton.classList.toggle('bg-blue-100');

    if (attending) {
        await api.attendEvent(eventId);

        const attendeeCount = document.getElementById(`attendee-count-id-${eventId}`);
        attendeeCount.textContent = (parseInt(attendeeCount.textContent) + 1).toString() + ' attending';

        freezeGoingButton = false;
    } else {
        await api.removeAttendEvent(eventId);

        const attendeeCount = document.getElementById(`attendee-count-id-${eventId}`);
        attendeeCount.textContent = (parseInt(attendeeCount.textContent) - 1).toString() + ' attending';

        freezeGoingButton = false;
    }
}

async function showPostModalAsync(postId) {
    const postModalLoading = document.getElementById('postModalLoading');
    postModalLoading.classList.remove('hidden');

    const post = await api.fetchPost(postId);
    const user = post.user;

    const postModalContainer = document.getElementById('postModalContainer');
    postModalContainer.innerHTML = ''; // Clear existing posts
    postModalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40';

    // Add click event listener to the modal overlay
    postModalContainer.addEventListener('click', (event) => {
        if (event.target === postModalContainer) {
            closePostModal();
        }
    });

    postModalContainer.innerHTML = `
        <div id="postModalContent" class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto break-words">
            <div class="p-4 border-b">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <img src="${(user.profileImageURL && user.profileImageURL != "") ? user.profileImageURL : placeHolderPfp}" alt="Profile" class="rounded-full w-12 h-12">
                        <div>
                            <h3 class="font-semibold">${user.firstName} ${user.lastName}</h3>
                            <p class="text-gray-500 text-sm">${formatTimestamp(post.creationDate)}</p>
                            <p class="text-gray-600 text-sm">${user.degree}</p>
                        </div>
                    </div>
                    <button onclick="closePostModal()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="p-4">
                <p class="mb-4">${utilities.sanitiseString(post.content)}</p>
                <div class="border-t pt-4">
                    <div class="space-y-4">
                        <div id="commentInput${post.id}" class="flex space-x-4">
                            <img src="${(user.profileImageURL && user.profileImageURL != "") ? user.profileImageURL : placeHolderPfp}" alt="Profile" class="rounded-full w-8 h-8">
                            <div class="flex-1">
                                <textarea class="w-full border rounded-lg p-2 resize-none" placeholder="Write a comment..."></textarea>
                                <button onclick="submitComment(${post.id})" class="mt-2 text-blue-600 hover:text-blue-800">
                                    Post
                                </button>
                            </div>
                        </div>
                        <div id="comments-container" class="space-y-4">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    postModalLoading.classList.add('hidden');

    document.body.style.overflow = 'hidden';
}

let commentIdAnchor = 0;
let firstCommentsFetch = true;
let isCommentsLoading = false;
let allCommentsLoaded = false;
let currentPostModalId = 0;

async function loadComments(postId) {
    const commentsContainer = document.getElementById('comments-container');
    const comments = await api.fetchComments(firstCommentsFetch, postId, commentIdAnchor);

    if (!comments || comments.length === 0) {
        allCommentsLoaded = true;
    }

    if ((!comments || comments.length === 0) && firstCommentsFetch) {
        commentsContainer.innerHTML = '<p class="text-gray-500 text-center">No comments yet</p>';
    } else {
        for (const comment of comments) {
            commentsContainer.appendChild(createCommentElement(comment, postId));

            commentIdAnchor = comment.id;
            firstCommentsFetch = false;
        }
    }

    const postModalContent = document.getElementById('postModalContent');

    while (!allCommentsLoaded && postModalContent.scrollHeight <= postModalContent.clientHeight) {
        await loadComments(postId);
    }
}

let replyIdAnchor = {};
let firstReplyFetch = {};

window.loadCommentReplies = async function loadCommentReplies(postId, parentCommentId) {
    const replyContainer = document.getElementById(`comment-reply-container-id-${parentCommentId}`);
    const replies = await api.fetchComments(firstReplyFetch[`$parent-id-${parentCommentId}`] ?? true, postId, replyIdAnchor[`$parent-id-${parentCommentId}`] ?? 0, parentCommentId);

    if (!replies || replies.length === 0) {
        const loadRepliesButton = document.getElementById(`load-replies-id-${parentCommentId}`);
        loadRepliesButton.classList.add('hidden');

        showAlert('No more replies to load.', 'success');

        return;
    }

    for (const reply of replies) {
        replyContainer.appendChild(createCommentReplyElement(reply));

        replyIdAnchor[`$parent-id-${parentCommentId}`] = reply.id;
        firstReplyFetch[`$parent-id-${parentCommentId}`] = false;
    }
}

function createCommentElement(comment, postId) {
    const commentUser = comment.user;
    const commentElement = document.createElement('div');
    commentElement.className = 'flex space-x-3';
    commentElement.innerHTML = `
        <img src="${(commentUser.profileImageURL && commentUser.profileImageURL != "") ? commentUser.profileImageURL : placeHolderPfp}" alt="Profile" class="rounded-full w-8 h-8">
        <div class="flex-1 min-w-0">
            <div class="bg-gray-100 rounded-lg p-3">
                <div class="flex items-center space-x-2">
                    <span class="font-semibold">${commentUser.firstName} ${commentUser.lastName}</span>
                    <span class="text-gray-500 text-sm">${formatTimestamp(comment.creationDate)}</span>
                </div>
                <p class="mt-1">${utilities.sanitiseString(comment.content)}</p>
                <button onclick="showReplyInput(${comment.id})" class="text-sm text-blue-600 hover:text-blue-800 mt-2">
                    Reply
                </button>
            </div>
            <div id="replyInput${comment.id}" class="hidden ml-8 mt-2">
                <div class="flex space-x-2">
                    <img src="${(commentUser.profileImageURL && commentUser.profileImageURL != "") ? commentUser.profileImageURL : placeHolderPfp}" alt="Profile" class="rounded-full w-6 h-6">
                    <div class="flex-1">
                        <textarea class="w-full border rounded-lg p-2 text-sm resize-none" placeholder="Write a reply..."></textarea>
                        <div class="flex justify-end space-x-2 mt-1">
                            <button onclick="hideReplyInput(${comment.id})" class="text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                            <button onclick="submitReply(${postId}, ${comment.id})" class="text-sm text-blue-600 hover:text-blue-800">Reply</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="comment-reply-container-id-${comment.id}" class="ml-8 mt-2 space-y-2">
                <!-- Replies go here -->
            </div>
            ${comment.containsReplies ? `
                <button id="load-replies-id-${comment.id}" onclick="loadCommentReplies(${postId}, ${comment.id})" class="text-sm text-blue-600 hover:text-blue-800 mt-2">
                    Load Replies
                </button>` : ''}
        </div>
    `;

    return commentElement;
}


function createCommentReplyElement(reply) {
    const replyUser = reply.user;
    const replyElement = document.createElement('div');
    replyElement.className = 'flex space-x-3';
    replyElement.innerHTML = `
        <img src="${(replyUser.profileImageURL && replyUser.profileImageURL != "") ? replyUser.profileImageURL : placeHolderPfp}" alt="Profile" class="rounded-full w-6 h-6">
        <div class="flex-1 min-w-0">
            <div class="bg-gray-50 rounded-lg p-2">
                <div class="flex items-center space-x-2">
                    <span class="font-semibold text-sm">${replyUser.firstName} ${replyUser.lastName}</span>
                    <span class="text-gray-500 text-xs">${formatTimestamp(reply.creationDate)}</span>
                </div>
                <p class="text-sm mt-1">${utilities.sanitiseString(reply.content)}</p>
            </div>
        </div>
    `;

    return replyElement;
}

async function refreshFirstCommentsFetch() {
    commentIdAnchor = 0;
    firstCommentsFetch = true;
    allCommentsLoaded = false;
}

// Show post modal function
window.showPostModal = async function showPostModal(postId) {
    refreshFirstCommentsFetch();
    currentPostModalId = postId;
    await showPostModalAsync(postId);
    await loadComments(postId);

    const postModalContent = document.getElementById('postModalContent');

    postModalContent.addEventListener('scroll', async () => {
        if (allCommentsLoaded || isCommentsLoading) return;

        const scrollPosition = postModalContent.scrollTop + postModalContent.clientHeight;
        const threshold = postModalContent.scrollHeight - 200;

        if (scrollPosition >= threshold) {
            isCommentsLoading = true;

            await loadComments(currentPostModalId);
        }

        isCommentsLoading = false;
    })
}

// Show reply input
window.showReplyInput = function showReplyInput(commentId) {
    const replyInput = document.getElementById(`replyInput${commentId}`);
    if (replyInput) {
        replyInput.classList.remove('hidden');
    }
}

window.hideReplyInput = function hideReplyInput(commentId) {
    const replyInput = document.getElementById(`replyInput${commentId}`);
    if (replyInput) {
        replyInput.classList.add('hidden');
    }
}

// Submit reply
window.submitReply = async function submitReply(postId, commentId) {
    const replyInput = document.getElementById(`replyInput${commentId}`);
    if (!replyInput) return;

    const textarea = replyInput.querySelector('textarea');
    const content = textarea.value.trim();

    if (!content) {
        showAlert('Please enter a reply', 'error');
        return;
    }

    const newReply = await api.addComment(postId, content, commentId);

    textarea.value = '';

    // Update the existing modal
    if (newReply) {
        const commentsContainer = document.getElementById(`comment-reply-container-id-${commentId}`);
        commentsContainer.prepend(createCommentReplyElement(newReply));

        const commentCount = document.getElementById(`comment-count-id-${postId}`);
        commentCount.textContent = (parseInt(commentCount.textContent) + 1).toString();
    }
}

window.submitComment = async function submitComment(postId) {
    const commentInput = document.getElementById(`commentInput${postId}`);
    if (!commentInput) return;

    const textarea = commentInput.querySelector('textarea');
    const content = textarea.value.trim();

    if (!content) {
        showAlert('Please enter a reply', 'error');
        return;
    }

    const newComment = await api.addComment(postId, content, null);

    textarea.value = '';

    // Update the existing modal
    if (newComment) {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.prepend(createCommentElement(newComment, postId));

        const commentCount = document.getElementById(`comment-count-id-${postId}`);
        commentCount.textContent = (parseInt(commentCount.textContent) + 1).toString();
    }
}

// Close post modal function
window.closePostModal = function closePostModal() {
    const postModalContainer = document.getElementById('postModalContainer');
    postModalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 hidden';
    postModalContainer.innerHTML = ''; // Hide the post modal

    document.body.style.overflow = '';
}

// Post creation state
let currentImage = null;
let currentVideo = null;
let currentEvent = null;

let imageUploading = false;
let videoUploading = false;

// Image upload handler function
window.handleImageUpload = async function handleImageUpload(event) { // Bookmark: Check file size then upload to the backend directly
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB
        showAlert('Image size exceeds the maximum limit of 5MB.', 'error');
        return;
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('postImagePreview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);

        const uploadImageButton = document.getElementById('uploadImageButton');
        const imageUploadLoading = document.getElementById('imageUploadLoading');
        const removeImageButton = document.getElementById('removeImageButton');
        imageUploading = true;

        imageUploadLoading.classList.remove('hidden');
        uploadImageButton.classList.add('hidden');
        removeImageButton.classList.add('hidden');

        const image = await api.uploadImage(file);

        imageUploadLoading.classList.add('hidden');
        removeImageButton.classList.remove('hidden');
        imageUploading = false;

        if (image == null || image == '') {
            hideImagePreview();
            showAlert('Image upload failed', 'error');
            uploadImageButton.classList.remove('hidden');
            return;
        }

        currentImage = image;
    }
}

// Hide image preview function
window.hideImagePreview = function hideImagePreview() {
    currentImage = null;
    document.getElementById('previewImage').src = "";
    document.getElementById('postImagePreview').classList.add('hidden');
    document.getElementById('postImageInput').value = '';
    document.getElementById('uploadImageButton').classList.remove('hidden');
}

// Video upload handler function
window.handleVideoUpload = async function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (file && file.size > 50 * 1024 * 1024) { // 50MB
        showAlert('Video size exceeds the maximum limit of 50MB.', 'error');
        return;
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('previewVideo').src = e.target.result;
            document.getElementById('postVideoPreview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);

        const uploadVideoButton = document.getElementById('uploadVideoButton');
        const videoUploadLoading = document.getElementById('videoUploadLoading');
        const removeVideoButton = document.getElementById('removeVideoButton');
        videoUploading = true;

        videoUploadLoading.classList.remove('hidden');
        uploadVideoButton.classList.add('hidden');
        removeVideoButton.classList.add('hidden');

        const video = await api.uploadVideo(file);

        videoUploadLoading.classList.add('hidden');
        removeVideoButton.classList.remove('hidden');
        videoUploading = false;

        if (video == null || video == '') {
            hideVideoPreview();
            showAlert('Video upload failed', 'error');
            uploadVideoButton.classList.remove('hidden');
            return;
        }

        currentVideo = video;
    }
}

// Hide video preview function
window.hideVideoPreview = function hideVideoPreview() {
    currentVideo = null;
    document.getElementById('previewVideo').src = "";
    document.getElementById('postVideoPreview').classList.add('hidden');
    document.getElementById('videoInput').value = '';
    document.getElementById('uploadVideoButton').classList.remove('hidden');
}

// Show event form function
window.showEventForm = function showEventForm() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Hide event form function
window.hideEventForm = function hideEventForm() {
    const modal = document.getElementById('eventModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = ''; // Restore scrolling
}

// Embed event function
window.embedPostEvent = function embedPostEvent() {
    const title = document.getElementById('eventTitleInput').value;
    const dateTime = document.getElementById('eventDateTime').value;
    const location = document.getElementById('eventLocationInput').value;

    if (!title || !dateTime || !location) {
        showAlert('Please fill in all event fields', 'error');
        return;
    }

    // Create new event
    currentEvent = {
        title: title,
        dateAndTime: new Date(dateTime),
        location: location,
    };

    // Update preview
    const eventTitle = document.getElementById('eventTitle');
    const eventDate = document.getElementById('eventDate');
    const eventLocation = document.getElementById('eventLocation');
    const postEventPreview = document.getElementById('postEventPreview');

    if (eventTitle && eventDate && eventLocation && postEventPreview) {
        eventTitle.textContent = title;
        eventDate.textContent = currentEvent.dateAndTime.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });
        eventLocation.textContent = location;
        postEventPreview.classList.remove('hidden');
    }

    // Clear form
    document.getElementById('eventTitleInput').value = '';
    document.getElementById('eventDateTime').value = '';
    document.getElementById('eventLocationInput').value = '';

    document.getElementById('createEventButton').classList.add('hidden');

    // Hide modal
    hideEventForm();
    // showAlert('Event added to your post!', 'success');
}

// Hide event preview function
window.hideEventPreview = function hideEventPreview() {
    currentEvent = null;
    document.getElementById('postEventPreview').classList.add('hidden');
    document.getElementById('createEventButton').classList.remove('hidden');
}

let freezePostButton = false;

// Create post function
window.createPost = async function createPost() {
    if (freezePostButton) return;

    if (imageUploading) {
        showAlert('Please wait for the image to upload', 'error');
        return;
    }

    if (videoUploading) {
        showAlert('Please wait for the video to upload', 'error');
        return;
    }

    freezePostButton = true;

    const content = document.getElementById('postContent').value.trim();
    if (!content) {
        showAlert('Please enter some content for your post', 'error');
        freezePostButton = false;
        return;
    }

    /*
    // Add image if exists
    const postImagePreview = document.getElementById('postImagePreview');
    if (!postImagePreview.classList.contains('hidden')) {
        newPost.image = currentImage;
    }

    // Add video if exists
    const postVideoPreview = document.getElementById('postVideoPreview');
    if (!postVideoPreview.classList.contains('hidden')) {
        newPost.video = currentVideo;
    }
    */

    // Add event if exists
    const postEventPreview = document.getElementById('postEventPreview');
    let newEvent;
    if (!postEventPreview.classList.contains('hidden')) {
        // Add event to database
        newEvent = {
            title: currentEvent.title,
            dateAndTime: currentEvent.dateAndTime.toISOString(),
            location: currentEvent.location,
        };
    }
    
    await api.createPost(content, currentImage, currentVideo, null, newEvent)

    document.getElementById('postContent').value = ''; // Clear input
    hideImagePreview();
    hideVideoPreview();
    hideEventPreview();

    refreshFirstPostsFetch("Feed");
    displayFeed();

    freezePostButton = false;
}

// Show profile function
window.showProfile = async function showProfile() {
    postFilter = 'Profile';

    // Update active tab
    updateActiveTab('profile');

    // Show profile content
    const profileContent = document.getElementById('profileContent');
    profileContent.classList.remove('hidden');

    // Update profile information
    const profileHeaderProfileImage = document.getElementById('profileHeaderProfileImage');
    const profileHeaderName = document.getElementById('profileHeaderName');
    const profileHeaderUsername = document.getElementById('profileHeaderUsername');
    const profileHeaderDegree = document.getElementById('profileHeaderDegree');
    const profilePostsCount = document.getElementById('profilePostsCount');
    // const profileFriendsCount = document.getElementById('profileFriendsCount');

    profileHeaderProfileImage.src = (userData.profileImageURL && userData.profileImageURL != "") ? userData.profileImageURL : placeHolderPfp;
    profileHeaderName.textContent = userData.firstName + " " + userData.lastName;
    profileHeaderUsername.textContent = "@" + userData.username;
    profileHeaderDegree.textContent = userData.degree;
    profilePostsCount.textContent = userData.postCount;
    // profileFriendsCount.textContent = userData.friendCount;

    // Display user's posts
    await displayPosts();

    pauseScrollLoading = false;
}

// Hide all function
function hideAll() {
    // Hide profile content
    document.getElementById('profileContent').classList.add('hidden');
}

// Edit profile function
window.editProfile = function editProfile() {
    // Create and show edit profile modal
    const modal = document.createElement('div');
    modal.id = 'editProfileModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40';

    // Add click event listener to close modal when clicking outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });

    currentProfileImage = userData.profileImageURL;

    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Edit Profile</h2>
                <button onclick="this.closest('#editProfileModal').remove(); document.body.style.overflow = '';" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="editFirstName">
                        First Name
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100" 
                           id="editFirstName" type="text" value="${userData.firstName}" readonly>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="editLastName">
                        Last Name
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100" 
                           id="editLastName" type="text" value="${userData.lastName}" readonly>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="editUsername">
                        Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                           id="editUsername" type="text" value="${userData.username}" placeholder="Enter username">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="editDegree">
                        Degree
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                           id="editDegree" type="text" value="${userData.degree}">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Profile Image
                    </label>
                    <div class="flex flex-col items-center">
                        <div id="profileImagePreview" class="mt-2">
                            <img src="${(userData.profileImageURL && userData.profileImageURL != "") ? userData.profileImageURL : placeHolderPfp}" alt="Profile Preview" class="w-20 h-20 rounded-full">
                        </div>
                        <div id="editProfileImage" class="mt-4">
                            <input type="file" id="profileImageInput" accept="image/*" class="hidden" onchange="uploadProfileImage(event)">
                            <label for="profileImageInput" class="cursor-pointer inline-block bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded hover:bg-blue-700 transition">
                                Choose Image
                            </label>
                        </div>
                        <div id="pfpUploadLoading" class="hidden mt-4">
                            <div class="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6 flex justify-end space-x-4">
                <button onclick="this.closest('#editProfileModal').remove(); document.body.style.overflow = '';" 
                        class="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Cancel
                </button>
                <button onclick="saveProfileChanges()" 
                        class="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                    Save Changes
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

let currentProfileImage = null;

window.uploadProfileImage = async function uploadProfileImage(event) {
    const buttonParent = document.getElementById('editProfileImage');
    const profileImageInput = document.getElementById('profileImageInput');
    const profileImagePreview = document.getElementById('profileImagePreview');
    const pfpUploadLoading = document.getElementById('pfpUploadLoading');

    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB
        showAlert('Image size exceeds the maximum limit of 5MB.', 'error');
        return;
    }
    
    if (file) {
        buttonParent.classList.add('hidden');
        pfpUploadLoading.classList.remove('hidden');
        const pfpURL = await api.uploadImage(file);
        buttonParent.classList.remove('hidden');
        pfpUploadLoading.classList.add('hidden');
        if (pfpURL != null && pfpURL != '') {
            currentProfileImage = pfpURL;
            profileImagePreview.innerHTML = `<img src="${pfpURL}" alt="Profile Preview" class="w-20 h-20 rounded-full">`;
        }
    }
}

// Save profile changes
window.saveProfileChanges = async function saveProfileChanges() {
    const username = document.getElementById('editUsername').value.trim();
    const degree = document.getElementById('editDegree').value;

    // Validate username
    if (!username) {
        showAlert('Username cannot be empty', 'error');
        return;
    }

    if (!isValidUsername(username)) {
        showAlert('Username is invalid', 'error');
        return;
    }

    // Validate degree
    if (!degree) {
        showAlert('Degree cannot be empty', 'error');
        return;
    }

    if (!isValidDegree(degree)) {
        showAlert('Degree is invalid', 'error');
        return;
    }

    // Check for changes
    if (username === userData.username && degree === userData.degree && currentProfileImage === userData.profileImageURL) {
        showAlert('No changes have been made', 'info');
        return;
    }

    // Update user information
    const newUserData = await api.updateProfile(username, degree, currentProfileImage);
    if (newUserData == null) {
        // showAlert('Unexpected error occurred', 'info');
        return;
    }
    userData = newUserData;

    // Update UI
    showProfile();
    updateSideBarProfile();

    // Close modal
    const modal = document.getElementById('editProfileModal');
    modal.remove();
    document.body.style.overflow = '';

    showAlert('Profile updated successfully!', 'success');
}

/*
// Show manage friends modal
window.showManageFriends = function showManageFriends() {
    // Create and show manage friends modal
    const modal = document.getElementById('manageFriendsModal') || document.createElement('div');
    modal.id = 'manageFriendsModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40';

    // Add click event listener to close modal when clicking outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });

    let friendsHTML = "";
    database.users[sessionUserId - 1].friends.forEach(userId => {
        const user = database.users[userId - 1];
        friendsHTML += `
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-4">
                    <img src="${user.profileImage}" alt="Profile" class="w-12 h-12 rounded-full">
                    <div>
                        <h3 class="name font-semibold">${user.firstName} ${user.lastName}</h3>
                        <p class="degree text-gray-500 text-sm">${user.degree}</p>
                    </div>
                </div>
                <button class="text-red-600 hover:text-red-800" onclick="removeFriend(${user.id})">
                    <i class="fas fa-user-minus"></i>
                </button>
            </div>
        `;
    });

    let incommingFriendsHTML = "";
    database.users[sessionUserId - 1].incommingFriendRequests.forEach(userId => {
        const user = database.users[userId - 1];
        incommingFriendsHTML += `
            <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div class="flex items-center space-x-4">
                    <img src="${user.profileImage}" alt="Profile" class="w-12 h-12 rounded-full">
                    <div>
                        <h3 class="name font-semibold">${user.firstName} ${user.lastName}</h3>
                        <p class="degree text-gray-500 text-sm">${user.degree}</p>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button class="text-green-600 hover:text-green-800" onclick="acceptFriendRequest(4)">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="text-red-600 hover:text-red-800" onclick="rejectFriendRequest(4)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    });

    if (incommingFriendsHTML === "") {
        incommingFriendsHTML += `
            <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <p class="degree text-gray-500 text-sm">Incomming friend requests will show here.</p>
            </div>
        `;
    }

    let outgoingFriendsHTML = "";
    database.users[sessionUserId - 1].outgoingFriendRequests.forEach(userId => {
        const user = database.users[userId - 1];
        outgoingFriendsHTML += `
            <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div class="flex items-center space-x-4">
                    <img src="${user.profileImage}" alt="Profile" class="w-12 h-12 rounded-full">
                    <div>
                        <h3 class="name font-semibold">${user.firstName} ${user.lastName}</h3>
                        <p class="degree text-gray-500 text-sm">${user.degree}</p>
                    </div>
                </div>
                <button class="text-red-600 hover:text-red-800" onclick="rejectFriendRequest(4)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });

    if (outgoingFriendsHTML === "") {
        outgoingFriendsHTML += `
            <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <p class="degree text-gray-500 text-sm">Outgoing friend requests will show here.</p>
            </div>
        `;
    }

    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Manage Friends</h2>
                <button onclick="this.closest('#manageFriendsModal').remove(); document.body.style.overflow = '';" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Search Friends -->
            <div class="mb-6">
                <div class="relative">
                    <input type="text" 
                           class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="Search friends..."
                           onkeyup="filterFriends(this.value)">
                    <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>
            </div>

            <!-- Add friends -->
            <div class="mt-8">
                <div class="space-y-4">
                <!-- This must be done dynamically -->
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-center space-x-4">
                            <img src="${database.users[3].profileImage}" alt="Profile" class="w-12 h-12 rounded-full">
                            <div>
                                <h3 class="name font-semibold">${database.users[3].firstName} ${database.users[3].lastName}</h3>
                                <p class="degree text-gray-500 text-sm">${database.users[3].degree}</p>
                            </div>
                        </div>
                        <button class="text-green-600 hover:text-green-800" onclick="requestFriend(${database.users[3].id})">
                            <i class="fas fa-user-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Incomming Friend Requests -->
            <div class="mt-8">
                <h3 class="text-lg font-semibold mb-4">Incomming Requests</h3>
                <div class="space-y-4">
                <!-- This must be done dynamically -->
                    ${incommingFriendsHTML}
                </div>
            </div>

            <!-- Outgoing Friend Requests -->
            <div class="mt-8">
                <h3 class="text-lg font-semibold mb-4">Outgoing Requests</h3>
                <div class="space-y-4">
                <!-- This must be done dynamically -->
                    ${outgoingFriendsHTML}
                </div>
            </div>
            
            <!-- Friends List -->
            <div class="mt-8">
                <div class="space-y-4 max-h-[60vh] overflow-y-auto">
                    <h3 class="text-lg font-semibold mb-4">Friends</h3>
                    ${friendsHTML}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Function to filter friends
window.filterFriends = function filterFriends(query) {
    const friendsList = document.querySelector('#manageFriendsModal .space-y-4');
    const friends = friendsList.querySelectorAll('.flex.items-center');

    friends.forEach(friend => {
        const name = friend.querySelector('.name.font-semibold').textContent.toLowerCase();
        const degree = friend.querySelector('.degree.text-gray-500').textContent.toLowerCase();

        if (name.includes(query.toLowerCase()) || degree.includes(query.toLowerCase())) {
            friend.style.display = 'flex';
        } else {
            friend.style.display = 'none';
        }
    });
}

// Remove friend function
window.removeFriend = function removeFriend(userId) {
    showAlert('Friend removed successfully', 'success');
    // Here you would typically make an API call to remove the friend

    const sessionUser = database.users.find(u => u.id === sessionUserId);
    const otherUser = database.users.find(u => u.id === userId);

    sessionUser.friends.splice(sessionUser.friends.indexOf(otherUser.id), 1);
    otherUser.friends.splice(otherUser.friends.indexOf(sessionUser.id), 1);

    showManageFriends();
}

// Request friend function
window.requestFriend = function requestFriend(userId) {
    showAlert('Friend request sent', 'success');
    // Here you would typically make an API call to accept the friend request

    const sessionUser = database.users.find(u => u.id === sessionUserId);
    const otherUser = database.users.find(u => u.id === userId);

    if (!sessionUser.outgoingFriendRequests.includes(otherUser.id)) {
        otherUser.incommingFriendRequests.push(sessionUser.id);
        sessionUser.outgoingFriendRequests.push(otherUser.id);
    }

    showManageFriends();
}

// Accept friend function
window.acceptFriendRequest = function acceptFriendRequest(userId) {
    showAlert('Friend request accepted', 'success');
    // Here you would typically make an API call to accept the friend request

    const sessionUser = database.users.find(u => u.id === sessionUserId);
    const otherUser = database.users.find(u => u.id === userId);

    sessionUser.incommingFriendRequests.splice(sessionUser.incommingFriendRequests.indexOf(otherUser.id), 1);
    otherUser.outgoingFriendRequests.splice(otherUser.outgoingFriendRequests.indexOf(sessionUser.id), 1);

    sessionUser.friends.push(otherUser.id);
    otherUser.friends.push(sessionUser.id);

    showManageFriends();
}

// Reject friend function
window.rejectFriendRequest = function rejectFriendRequest(userId) {
    showAlert('Friend request rejected', 'info');
    // Here you would typically make an API call to reject the friend request

    const sessionUser = database.users.find(u => u.id === sessionUserId);
    const otherUser = database.users.find(u => u.id === userId);

    sessionUser.incommingFriendRequests.splice(sessionUser.incommingFriendRequests.indexOf(otherUser.id), 1);
    otherUser.outgoingFriendRequests.splice(otherUser.outgoingFriendRequests.indexOf(sessionUser.id), 1);

    showManageFriends();
}
*/

// Mobile browser detection and download page handling
function isMobileBrowser() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function showDownloadPage() {
    if (isMobileBrowser()) {
        document.getElementById('mobilePage').classList.remove('hidden');
        document.getElementById('loginContent').classList.add('hidden');
        document.getElementById('registerContent').classList.add('hidden');
        document.getElementById('forgotPasswordContent').classList.add('hidden');
        document.getElementById('mainContent').classList.add('hidden');
        document.getElementById('navButtons').classList.add('hidden');
        // document.getElementById('downloadLinks').classList.add('hidden');
    }
}

// Check for mobile browser on page load
document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');

    if (token) {
        const loggedinWithToken = await tokenLogin();
        
        if (!loggedinWithToken) {
            showLoginForm();
        }
    } else {
        showLoginForm();
    }

    document.getElementById('tokenLoginLoading').classList.add('hidden');
    // showDownloadPage();
});

// Test calls
// document.addEventListener('DOMContentLoaded', showAlert('Hello World!', 'warning'));



/*///////////////////////////////
//       Error handling        //
*////////////////////////////////
// Catch regular JavaScript errors
window.onerror = async function (message, source, lineno, colno, error) {
    document.getElementById('errorModal').classList.remove('hidden');
    document.getElementById('errorMessage').textContent = `${message} at ${source}:${lineno}:${colno}`;

    // Get response from chatgpt
    const errorSolution = document.getElementById('errorSolution');
    errorSolution.textContent = "Generating response...";
    const solution = await chatgpt(`${message} at ${source}:${lineno}:${colno}`);
    errorSolution.textContent = solution;

};

window.closeErrorModal = function closeErrorModal() {
    document.getElementById('errorModal').classList.add('hidden');
}

async function chatgpt(input) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${KEYS.CHAT_GPT}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini', // Specify the model
            messages: [
                { role: 'system', content: 'You are a coding assistant, and your job is to help with debugging JavaScript errors.' }, // Optional system message
                { role: 'user', content: input } // User's input
            ],
            max_tokens: 150, // Max tokens for the response
        })
    });

    // Handle the response
    if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content.trim(); // Extract the text response
    } else {
        return `Error: ${response.status}, ${response.statusText}`;
    }
}