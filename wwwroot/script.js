import Api from './Api.js'

// Sample database
const database = {
    users: [
        {
            id: 1,
            firstName: 'Sun Woo',
            lastName: 'Kim',
            email: 'sunwoo.kim@student.uts.edu.au',
            degree: 'Diploma of Information Technology',
            profileImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNFMkUyRTIiLz48cGF0aCBkPSJNMjUgMjVjMy40NSAwIDYuMjUtMi44IDYuMjUtNi4yNVMyOC40NSAxMi41IDI1IDEyLjVzLTYuMjUgMi44LTYuMjUgNi4yNSAyLjggNi4yNSA2LjI1IDYuMjV6bTAgMTAuNWMtNC40IDAtMTMgMi4yLTEzIDYuNjNWNDVoMjZ2LTIuMzVjMC00LjQtOC42LTYuNjMtMTMtNi42M3oiIGZpbGw9IiM5OTk5OTkiLz48L3N2Zz4=',
            username: 'sunwoo.kim',
            friends: [2, 3], // Array of friend's user id
            incommingFriendRequests: [],
            outgoingFriendRequests: []
        },
        {
            id: 2,
            firstName: 'Daniel',
            lastName: 'Liu',
            email: 'daniel.liu@student.uts.edu.au',
            degree: 'Bachelor of Computer Science',
            profileImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNFMkUyRTIiLz48cGF0aCBkPSJNMjUgMjVjMy40NSAwIDYuMjUtMi44IDYuMjUtNi4yNVMyOC40NSAxMi41IDI1IDEyLjVzLTYuMjUgMi44LTYuMjUgNi4yNSAyLjggNi4yNSA2LjI1IDYuMjV6bTAgMTAuNWMtNC40IDAtMTMgMi4yLTEzIDYuNjNWNDVoMjZ2LTIuMzVjMC00LjQtOC42LTYuNjMtMTMtNi42M3oiIGZpbGw9IiM5OTk5OTkiLz48L3N2Zz4=',
            username: 'daniel.liu',
            friends: [],
            incommingFriendRequests: [],
            outgoingFriendRequests: []
        },
        {
            id: 3,
            firstName: 'Evan',
            lastName: 'Liang',
            email: 'evan.liang@student.uts.edu.au',
            degree: 'Bachelor of Business and International Studies',
            profileImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNFMkUyRTIiLz48cGF0aCBkPSJNMjUgMjVjMy40NSAwIDYuMjUtMi44IDYuMjUtNi4yNVMyOC40NSAxMi41IDI1IDEyLjVzLTYuMjUgMi44LTYuMjUgNi4yNSAyLjggNi4yNSA2LjI1IDYuMjV6bTAgMTAuNWMtNC40IDAtMTMgMi4yLTEzIDYuNjNWNDVoMjZ2LTIuMzVjMC00LjQtOC42LTYuNjMtMTMtNi42M3oiIGZpbGw9IiM5OTk5OTkiLz48L3N2Zz4=',
            username: 'evan.liang',
            friends: [],
            incommingFriendRequests: [],
            outgoingFriendRequests: []
        },
        {
            id: 4,
            firstName: 'Danny',
            lastName: 'Li',
            email: 'danny.li@student.uts.edu.au',
            degree: 'Bachelor of Computer Science',
            profileImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNFMkUyRTIiLz48cGF0aCBkPSJNMjUgMjVjMy40NSAwIDYuMjUtMi44IDYuMjUtNi4yNVMyOC40NSAxMi41IDI1IDEyLjVzLTYuMjUgMi44LTYuMjUgNi4yNSAyLjggNi4yNSA2LjI1IDYuMjV6bTAgMTAuNWMtNC40IDAtMTMgMi4yLTEzIDYuNjNWNDVoMjZ2LTIuMzVjMC00LjQtOC42LTYuNjMtMTMtNi42M3oiIGZpbGw9IiM5OTk5OTkiLz48L3N2Zz4=',
            username: 'danny.li',
            friends: [],
            incommingFriendRequests: [],
            outgoingFriendRequests: []
        },
    ],
    posts: [
        {
            id: 1,
            userId: 1,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque purus risus, pharetra ut ipsum nec, accumsan fermentum lacus. Cras volutpat sed nulla sed ullamcorper. Duis a nunc nulla.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg',
            video: null,
            voice: null,
            creationDate: new Date('2024-03-20T10:00:00'),
            likes: [1, 2], // Array of user IDs who liked the post
            comments: [1], // Array of comment IDs
            saves: [1, 2, 3], // Array of user IDs who saved the post
            eventId: 1
        }
    ],
    events: [ // Events that are embedded into posts
        {
            id: 1,
            title: 'Sample Event',
            date: new Date('2024-03-20T10:15:00'),
            location: 'UTS',
            attendees: [] // Array of user IDs who are attending
        }
    ],
    comments: [ // Comments on posts
        {
            id: 1,
            postId: 1,
            userId: 3,
            content: 'Lorem ipsum dolor sit amet',
            creationDate: new Date('2024-03-20T10:15:00')
        },
        {
            id: 2,
            postId: 1,
            userId: 2,
            content: 'by9 56by03 506w7905',
            creationDate: new Date('2024-03-20T10:15:00')
        },
    ],
    replies: [ // Replies to comments
        {
            id: 1,
            commentId: 1,
            userId: 2,
            content: 'consectetur adipiscing elit',
            creationDate: new Date('2024-03-20T10:17:00')
        },
        {
            id: 2,
            commentId: 1,
            userId: 2,
            content: 'otaotyb40 5y6b0a30 0bu60a',
            creationDate: new Date('2024-03-20T10:17:00')
        }
    ]
}


// Session variables
// Old
let loggedIn = false;
let rememberMe = false;
let sessionUserId = 1;

// New
const api = new Api();
let userData = null;


// Alert functions
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
window.displayFeed = function displayFeed() {
    currentPage = 'Feed';

    hideAll();
    displayPosts();
    updateActiveTab('feed');
}

// Update side bar profile function
window.updateSideBarProfile = function updateSideBarProfile() {
    const sideBarProfileImage = document.getElementById('sideBarProfileImage');
    const sideBarProfileName = document.getElementById('sideBarProfileName');
    const sideBarProfileUsername = document.getElementById('sideBarProfileUsername');
    const sideBarProfileDegree = document.getElementById('sideBarProfileDegree');

    sideBarProfileImage.src = userData.profileImage ? userData.profileImage : placeHolderPfp;
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
    const downloadLinks = document.getElementById('downloadLinks');

    if (loggedIn) {
        // Show main social media content
        loginContent.classList.add('hidden');
        registerContent.classList.add('hidden');
        forgotPasswordContent.classList.add('hidden');
        downloadLinks.classList.add('hidden');
        mainContent.classList.remove('hidden');

        // Render posts
        refreshFirstFetch();
        displayFeed();

        navButtons.innerHTML = `
            <button onclick="showProfile(); hideCreatePostModal(); updateSideBarProfile()" class="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50">Profile</button>
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
window.showLoginForm = function showLoginForm() {
    clearAllErrors();
    const registerContent = document.getElementById('registerContent');
    const forgotPasswordContent = document.getElementById('forgotPasswordContent');
    const loginContent = document.getElementById('loginContent');
    const downloadLinks = document.getElementById('downloadLinks');

    registerContent.classList.add('hidden');
    forgotPasswordContent.classList.add('hidden');
    loginContent.classList.remove('hidden');
    downloadLinks.classList.remove('hidden');

    const rememberedEmail = localStorage.getItem("rememberedEmail");

    if (rememberedEmail) {
        document.getElementById('loginEmail').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

// Login function
window.login = async function login() {
    clearAllErrors();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMeChecked = document.getElementById('rememberMe').checked;
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

    // Use API here in the future
    if (await api.login(email, password)) {
        loggedIn = true;
        userData = JSON.parse(localStorage.getItem('user'));
        updateUI();
        feedUiTabActive();
        updateSideBarProfile();

        if (rememberMeChecked) {
            localStorage.setItem("rememberedEmail", email);
        } else {
            localStorage.removeItem("rememberedEmail");
        }
    }
}

// Logout function
window.logout = function logout() {
    loggedIn = false;

    showAlert('Successfully logged out', 'info');

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

    const emailExtension = email.split('@')[1];

    if (!email) {
        setInputError('registerEmail', 'registerEmailError', 'Please enter your email address');
        invalidInput = true;
    } else if (!isValidEmail(email)) {
        setInputError('registerEmail', 'registerEmailError', 'Please enter a valid email address');
        invalidInput = true;
    } else if (emailExtension && !emailExtension.includes('.edu.')) {
        setInputError('registerEmail', 'registerEmailError', 'Please use your uni email address');
        invalidInput = true;
    }

    if (!degree) {
        setInputError('degree', 'degreeError', 'Please enter your degree');
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

    // Here you would typically make an API call to create the account

    if (await api.register(email, password, firstName, lastName, degree)) {
        loggedIn = true;
        userData = JSON.parse(localStorage.getItem('user'));
        updateUI();
        feedUiTabActive();
        updateSideBarProfile();
    }
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
    const now = new Date();
    const diff = now - date;

    // Convert to hours
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Show create post modal 
window.showCreatePostModal = function showCreatePostModal() {
    document.getElementById('createPostProfileImage').src = userData.profileImage ? userData.profileImage : placeHolderPfp;
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

let postIdAnchor = 0;
let firstFetch = true;
let currentPage = "";
let isLoading = false;
let allPostsLoaded = false;

window.addEventListener('scroll', async () => {
    if (allPostsLoaded || isLoading) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;

    if (scrollPosition >= threshold) {
        isLoading = true;

        await displayPosts(currentPage);
    }

    isLoading = false;
})

// Display posts function
async function displayPosts(filter) { // Add a parameter so this function decides which group posts should be displayed
    const postsContainer = document.getElementById('postsContainer');

    // Sort posts by timestamp (newest first)
    const feedPosts = await api.fetchPosts(firstFetch, userData.id, postIdAnchor, filter);

    if (!feedPosts || feedPosts.length === 0) {
        allPostsLoaded = true;
    }

    if ((!feedPosts || feedPosts.length === 0) && firstFetch) {
        if (currentPage === 'Feed') {
            postsContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow p-6 text-center">
                <i class="fas fa-home text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
                <p class="text-gray-500">Be the first person to post</p>
            </div>
            `;
        } else if (currentPage === 'Saved') {
            postsContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow p-6 text-center">
                <i class="fas fa-bookmark text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No Saved Posts Yet</h3>
                <p class="text-gray-500">Posts you save will appear here</p>
            </div>
            `;
        } else if (currentPage === 'Profile') {
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
        feedPosts.forEach(post => {
            post.creationDate = new Date(post.creationDate); // Convert date data type from string to date

            if (adIndex === adFrequency) {
                postsContainer.appendChild(createAdElement());
                newAdFrequencyValue()
            }

            postsContainer.appendChild(createPostElement(post));
            adIndex++;

            postIdAnchor = post.id;
            firstFetch = false;
        });
    }
}

// Function to display saved postss
window.displaySaved = async function displaySaved() {
    currentPage = 'Saved';
    hideAll();

    updateActiveTab('saved');

    // Display saved posts
    displayPosts('Saved');
}

const placeHolderPfp = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNFMkUyRTIiLz48cGF0aCBkPSJNMjUgMjVjMy40NSAwIDYuMjUtMi44IDYuMjUtNi4yNVMyOC40NSAxMi41IDI1IDEyLjVzLTYuMjUgMi44LTYuMjUgNi4yNSAyLjggNi4yNSA2LjI1IDYuMjV6bTAgMTAuNWMtNC40IDAtMTMgMi4yLTEzIDYuNjNWNDVoMjZ2LTIuMzVjMC00LjQtOC42LTYuNjMtMTMtNi42M3oiIGZpbGw9IiM5OTk5OTkiLz48L3N2Zz4=';

// Create post element function
function createPostElement(post) {
    const _event = post.event;
    const user = post.user;
    const postElement = document.createElement('div');
    postElement.className = 'hover-effect bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow';
    postElement.onclick = () => showPostModal(post.id); // Bookmark
    postElement.innerHTML = `
        <div class="flex items-center space-x-4 mb-4">
            <img src="${user.profileImageURL ? user.profileImageURL : placeHolderPfp}" alt="Profile" class="rounded-full w-12 h-12">
            <div>
                <h3 class="font-semibold">${user.firstName} ${user.lastName}</h3>
                <p class="text-gray-500 text-sm">${formatTimestamp(post.creationDate)}</p>
                <p class="text-gray-600 text-sm">${user.degree}</p>
            </div>
        </div>
        <p class="mb-4">${post.content}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image" class="rounded-lg mb-4 w-full">` : ''}
        ${_event ? `
            <div class="bg-blue-50 rounded-lg p-4 mb-4">
                <div class="flex items-center space-x-3 mb-2">
                    <div class="bg-blue-100 p-2 rounded-lg">
                        <i class="fas fa-calendar text-blue-600"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold">${_event.title}</h4>
                        <p class="text-sm text-gray-600">${_event.dateAndTime.toLocaleDateString()} at ${_event.dateAndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                        <p class="text-sm text-gray-600">📍 ${_event.location}</p>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        ${_event.attendees.map(attendee => {
        return `<img src="${attendee.user.profileImageURL}" alt="Attendee" class="w-6 h-6 rounded-full border-2 border-white">`;
    }).join('')}
                        <span class="text-sm text-gray-600">${_event.attendees.length} attending</span>
                    </div>
                    <button onclick="event.stopPropagation(); toggleEventAttendance(${post.id})" 
                            class="text-sm px-3 py-1 rounded-full ${_event.attendees.some(attendee => attendee.userId == userData.id) ? 'bg-blue-100 text-blue-600' : 'bg-white text-blue-600 border border-blue-600'} hover:bg-blue-100 transition-colors flex items-center space-x-1">
                        ${_event.attendees.some(attendee => attendee.userId == userData.id) ? '<i class="fas fa-check"></i>' : 'Going'}
                    </button>
                </div>
            </div>
        ` : ''}
        <div class="flex justify-between items-center text-gray-500">
            <div class="flex space-x-4">
                <button class="hover:text-blue-600" onclick="event.stopPropagation(); toggleLike(${post.id})">
                    <i id="like-id-${post.id}" class="far fa-heart ${post.likedByYou ? 'fas text-red-600' : ''}"></i> 
                    <span id="like-count-id-${post.id}">${post.likeCount}</span> Like
                </button>
                <button class="hover:text-blue-600" onclick="event.stopPropagation(); showPostModal(${post.id})">
                    <i class="far fa-comment"></i> 
                    <span id="comment-count-id-${post.id}">${post.commentCount}</span> Comment
                </button>
            </div>
            <button class="hover:text-blue-600" onclick="event.stopPropagation(); toggleSave(${post.id})">
                <i id="save-id-${post.id}" class="far fa-bookmark ${post.savedByYou ? 'fas' : ''}"></i>
                <span id="save-count-id-${post.id}">${post.saveCount}</span> Save
            </button>
        </div>
    `;
    return postElement;
} // Bookmark: add ID to like and save to change colour on toggle

// Create ad element function
function createAdElement() {
    const postElement = document.createElement('div');
    postElement.className = 'bg-white rounded-lg shadow p-4';
    postElement.onclick = () => showPostModal(postId);
    postElement.innerHTML = `
        <div class="flex items-center space-x-4 mb-4">
            <div>
                <h3 class="font-semibold">Sponsor</h3>
            </div>
        </div>
        <div class="rounded-lg hover-effect hover:shadow-md transition-shadow cursor-pointer">
            <img src="https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-aws.jpg" alt="Post Image" class="rounded-lg w-full">
        </div>
    `;
    return postElement;
}

window.refreshFirstFetch = async function refreshFirstFetch() {
    postIdAnchor = 0;
    firstFetch = true;
    allPostsLoaded = false;

    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Clear existing posts
}

// Refresh UI after a toggle interaction
function refreshUI() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.classList.contains('active')) {
            if (tab.getAttribute('data-tab') === 'profile') {
                showProfile();
            } else if (tab.getAttribute('data-tab') === 'saved') {
                displaySaved();
            } else if (tab.getAttribute('data-tab') === 'feed') {
                displayPosts(); // Refresh posts to update UI
            }
        }
    });
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
        await api.likePost(userData.id, postId);

        const likeCount = document.getElementById(`like-count-id-${postId}`);
        likeCount.textContent = (parseInt(likeCount.textContent) + 1).toString();

        freezeLikeButton = false;
    } else {
        await api.removeLikePost(userData.id, postId);

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
        await api.savePost(userData.id, postId);

        const saveCount = document.getElementById(`save-count-id-${postId}`);
        saveCount.textContent = (parseInt(saveCount.textContent) + 1).toString();

        freezeSaveButton = false;
    } else {
        await api.removeSavePost(userData.id, postId);

        const saveCount = document.getElementById(`save-count-id-${postId}`);
        saveCount.textContent = (parseInt(saveCount.textContent) - 1).toString();

        freezeSaveButton = false;
    }
}

// Toggle event attendance function
window.toggleEventAttendance = function toggleEventAttendance(postId) {
    const post = database.posts.find(p => p.id === postId);
    const _event = database.events.find(e => e.id === post.eventId);
    if (!post || !_event) return;

    const currentUserId = sessionUserId; // Current user's ID (hardcoded for demo)
    const isAttending = _event.attendees.includes(currentUserId);

    if (isAttending) {
        _event.attendees = _event.attendees.filter(id => id !== currentUserId);
    } else {
        _event.attendees.push(currentUserId);
    }

    refreshUI();

    showAlert(isAttending ? 'You are no longer attending this event' : 'You are now attending this event', 'success');
}

async function showPostModalAsync(postId) {
    const post = await api.fetchPost(userData.id, postId);
    post.creationDate = new Date(post.creationDate); // Convert date data type from string to date
    const user = post.user;
    const comments = {}; // Bookmark

    const postModalContainer = document.getElementById('postModalContainer');
    postModalContainer.innerHTML = ''; // Clear existing posts
    postModalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    // Add click event listener to the modal overlay
    postModalContainer.addEventListener('click', (event) => {
        if (event.target === postModalContainer) {
            closePostModal();
        }
    });

    postModalContainer.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="p-4 border-b">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <img src="${user.profileImage ? user.profileImage : placeHolderPfp}" alt="Profile" class="rounded-full w-12 h-12">
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
                <p class="mb-4">${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="Post Image" class="rounded-lg mb-4 w-full">` : ''}
                <div class="border-t pt-4">
                    <div class="space-y-4">
                        <div id="commentInput${post.id}" class="flex space-x-4">
                            <img src="${user.profileImage ? user.profileImage : placeHolderPfp}" alt="Profile" class="rounded-full w-8 h-8">
                            <div class="flex-1">
                                <textarea class="w-full border rounded-lg p-2 resize-none" placeholder="Write a comment..."></textarea>
                                <button onclick="submitComment(${post.id})" class="mt-2 text-blue-600 hover:text-blue-800">
                                    Post
                                </button>
                            </div>
                        </div>
                        <div class="space-y-4">
                            ${comments.length > 0 ? comments.map(comment => {
        const commentUser = database.users.find(u => u.id === comment.userId);
        const replies = database.replies.filter(r => r.commentId === comment.id);
        return `
                                    <div class="flex space-x-3">
                                        <img src="${commentUser.profileImage ? commentUser.profileImage : placeHolderPfp}" alt="Profile" class="rounded-full w-8 h-8">
                                        <div class="flex-1">
                                            <div class="bg-gray-100 rounded-lg p-3">
                                                <div class="flex items-center space-x-2">
                                                    <span class="font-semibold">${commentUser.firstName} ${commentUser.lastName}</span>
                                                    <span class="text-gray-500 text-sm">${formatTimestamp(comment.creationDate)}</span>
                                                </div>
                                                <p class="mt-1">${comment.content}</p>
                                                <button onclick="showReplyInput(${comment.id})" class="text-sm text-blue-600 hover:text-blue-800 mt-2">
                                                    Reply
                                                </button>
                                            </div>
                                            ${replies.length > 0 ? `
                                                <div class="ml-8 mt-2 space-y-2">
                                                    ${replies.map(reply => {
            const replyUser = database.users.find(u => u.id === reply.userId);
            return `
                                                            <div class="flex space-x-3">
                                                                <img src="${replyUser.profileImage ? replyUser.profileImage : placeHolderPfp}" alt="Profile" class="rounded-full w-6 h-6">
                                                                <div class="flex-1">
                                                                    <div class="bg-gray-50 rounded-lg p-2">
                                                                        <div class="flex items-center space-x-2">
                                                                            <span class="font-semibold text-sm">${replyUser.firstName} ${replyUser.lastName}</span>
                                                                            <span class="text-gray-500 text-xs">${formatTimestamp(reply.creationDate)}</span>
                                                                        </div>
                                                                        <p class="text-sm mt-1">${reply.content}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        `;
        }).join('')}
                                                </div>
                                            ` : ''}
                                            <div id="replyInput${comment.id}" class="hidden ml-8 mt-2">
                                                <div class="flex space-x-2">
                                                    <img src="${user.profileImage ? user.profileImage : placeHolderPfp}" alt="Profile" class="rounded-full w-6 h-6">
                                                    <div class="flex-1">
                                                        <textarea class="w-full border rounded-lg p-2 text-sm resize-none" placeholder="Write a reply..."></textarea>
                                                        <div class="flex justify-end space-x-2 mt-1">
                                                            <button onclick="hideReplyInput(${comment.id})" class="text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                                                            <button onclick="submitReply(${comment.id})" class="text-sm text-blue-600 hover:text-blue-800">Reply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
    }).join('') : '<p class="text-gray-500 text-center">No comments yet</p>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.style.overflow = 'hidden';
}

// Show post modal function
window.showPostModal = async function showPostModal(postId) {
    await showPostModalAsync(postId);
}

// Show reply input
window.showReplyInput = function showReplyInput(commentId) {
    const replyInput = document.getElementById(`replyInput${commentId}`);
    if (replyInput) {
        replyInput.classList.remove('hidden');
    }
}

// Submit reply
window.submitReply = function submitReply(commentId) {
    const replyInput = document.getElementById(`replyInput${commentId}`);
    if (!replyInput) return;

    const textarea = replyInput.querySelector('textarea');
    const content = textarea.value.trim();

    if (!content) {
        showAlert('Please enter a reply', 'error');
        return;
    }

    // Create new reply
    const newReply = {
        id: database.replies.length + 1,
        commentId: commentId,
        userId: 1, // Current user's ID (hardcoded for demo)
        content: content,
        creationDate: new Date()
    };

    database.replies.push(newReply);

    // Find the post associated with this comment
    const comment = database.comments.find(c => c.id === commentId);

    // Update the existing modal
    showPostModal(comment.postId);
    showAlert('Reply posted successfully!', 'success');
}

window.submitComment = function submitComment(postId) {
    const commentInput = document.getElementById(`commentInput${postId}`);
    if (!commentInput) return;

    const textarea = commentInput.querySelector('textarea');
    const content = textarea.value.trim();

    if (!content) {
        showAlert('Please enter a reply', 'error');
        return;
    }

    // Create new reply
    const newComment = {
        id: database.comments.length + 1,
        postId: postId,
        userId: 1, // Current user's ID (hardcoded for demo)
        content: content,
        creationDate: new Date()
    };

    database.comments.push(newComment);

    // Update the existing modal
    showPostModal(postId);
    showAlert('Reply posted successfully!', 'success');
}

// Close post modal function
window.closePostModal = function closePostModal() {
    const postModalContainer = document.getElementById('postModalContainer');
    postModalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    postModalContainer.innerHTML = ''; // Hide the post modal

    document.body.style.overflow = '';
}

// Post creation state
let currentImage = null;
let currentVideo = null;
let currentEvent = null;

// Image upload handler function
window.handleImageUpload = function handleImageUpload(event) { // Bookmark: Check file size then upload to the backend directly
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            currentImage = e.target.result;
            document.getElementById('previewImage').src = currentImage;
            document.getElementById('imagePreview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

// Hide image preview function
function hideImagePreview() {
    currentImage = null;
    document.getElementById('imagePreview').classList.add('hidden');
    document.getElementById('imageInput').value = '';
}

// Video upload handler function
window.handleVideoUpload = function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            currentVideo = e.target.result;
            document.getElementById('previewVideo').src = currentVideo;
            document.getElementById('videoPreview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

// Hide video preview function
function hideVideoPreview() {
    currentVideo = null;
    document.getElementById('videoPreview').classList.add('hidden');
    document.getElementById('videoInput').value = '';
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
        date: new Date(dateTime),
        location: location,
    };

    // Update preview
    const eventTitle = document.getElementById('eventTitle');
    const eventDate = document.getElementById('eventDate');
    const eventLocation = document.getElementById('eventLocation');
    const eventPreview = document.getElementById('eventPreview');

    if (eventTitle && eventDate && eventLocation && eventPreview) {
        eventTitle.textContent = title;
        eventDate.textContent = currentEvent.date.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });
        eventLocation.textContent = location;
        eventPreview.classList.remove('hidden');
    }

    // Clear form
    document.getElementById('eventTitleInput').value = '';
    document.getElementById('eventDateTime').value = '';
    document.getElementById('eventLocationInput').value = '';

    // Hide modal
    hideEventForm();
    showAlert('Event added to your post!', 'success');
}

// Hide event preview function
function hideEventPreview() {
    currentEvent = null;
    document.getElementById('eventPreview').classList.add('hidden');
}

let freezePostButton = false;

// Create post function
window.createPost = async function createPost() {
    if (freezePostButton) return;

    freezePostButton = true;

    const content = document.getElementById('postContent').value.trim();
    if (!content) {
        showAlert('Please enter some content for your post', 'error');
        freezePostButton = false;
        return;
    }

    const newPost = {
        id: database.posts.length + 1,
        userId: sessionUserId, // Current user's ID (hardcoded for demo)
        content: content,
        creationDate: new Date(),
        likes: [],
        comments: [],
        saves: [],
    };

    /*
    // Add image if exists
    const imagePreview = document.getElementById('imagePreview');
    if (!imagePreview.classList.contains('hidden')) {
        newPost.image = currentImage;
    }

    // Add video if exists
    const videoPreview = document.getElementById('videoPreview');
    if (!videoPreview.classList.contains('hidden')) {
        newPost.video = currentVideo;
    }
    */

    // Add event if exists
    const eventPreview = document.getElementById('eventPreview');
    if (!eventPreview.classList.contains('hidden')) {
        newPost.eventId = database.events.length + 1;

        // Add event to database
        const newEvent = {
            id: newPost.eventId,
            title: currentEvent.title,
            date: currentEvent.date,
            location: currentEvent.location,
            attendees: []
        };
        database.events.push(newEvent);
    }

    document.getElementById('postContent').value = ''; // Clear input
    // hideImagePreview();
    // hideVideoPreview();
    hideEventPreview();

    await api.createPost(userData.id, content)

    refreshFirstFetch();
    displayFeed();

    freezePostButton = false;
}

// Show profile function
window.showProfile = async function showProfile() {
    currentPage = 'Profile';

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
    const profileFriendsCount = document.getElementById('profileFriendsCount');

    profileHeaderProfileImage.src = userData.profileImage ? userData.profileImage : placeHolderPfp;
    profileHeaderName.textContent = userData.firstName + " " + userData.lastName;
    profileHeaderUsername.textContent = "@" + userData.username;
    profileHeaderDegree.textContent = userData.degree;
    profilePostsCount.textContent = userData.postCount;
    profileFriendsCount.textContent = userData.friendCount;

    // Display user's posts
    displayPosts('User');
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
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    // Add click event listener to close modal when clicking outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });

    const currentUser = database.users.find(u => u.id === sessionUserId);
    if (!currentUser) return;

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
                    <p class="text-sm text-gray-500 mt-1">Username will be displayed with @ symbol</p>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="editDegree">
                        Degree
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                           id="editDegree" type="text" value="${userData.degree}">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="editProfileImage">
                        Profile Image
                    </label>
                    <input type="file" id="editProfileImage" accept="image/*" class="w-full">
                    <div id="profileImagePreview" class="mt-2">
                        <img src="${userData.profileImage ? userData.profileImage : placeHolderPfp}" alt="Profile Preview" class="w-20 h-20 rounded-full">
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

    // Add image preview functionality
    const imageInput = document.getElementById('editProfileImage');
    const imagePreview = document.getElementById('profileImagePreview');

    imageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview" class="w-20 h-20 rounded-full">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Save profile changes
window.saveProfileChanges = function saveProfileChanges() {
    const currentUser = database.users.find(u => u.id === sessionUserId);
    if (!currentUser) return;

    const username = document.getElementById('editUsername').value.trim();
    const degree = document.getElementById('editDegree').value;
    const imagePreview = document.getElementById('profileImagePreview').querySelector('img');

    // Validate username
    if (!username) {
        showAlert('Username cannot be empty', 'error');
        return;
    }

    // Update user information
    currentUser.username = username;
    currentUser.degree = degree;
    currentUser.profileImage = imagePreview.src;

    // Update UI
    showProfile();
    updateSideBarProfile();

    // Close modal
    const modal = document.getElementById('editProfileModal');
    modal.remove();
    document.body.style.overflow = '';

    showAlert('Profile updated successfully!', 'success');
}

// Show manage friends modal
window.showManageFriends = function showManageFriends() {
    // Create and show manage friends modal
    const modal = document.getElementById('manageFriendsModal') || document.createElement('div');
    modal.id = 'manageFriendsModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

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
        document.getElementById('downloadLinks').classList.add('hidden');
    }
}

// Check for mobile browser on page load
document.addEventListener('DOMContentLoaded', function () {
    showLoginForm();
    showDownloadPage();
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