// Alert functions
const alertTimeoutDuration = 5000;
let alertTimeout;

function showAlert(message, type = 'info') {
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
            iconColor = 'fa-blue-600';
            break;
    }

    alertIcon.innerHTML = `<i class="fas ${iconClass} ${iconColor} text-xl"></i>`;
    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    alertTimeout = setTimeout(hideAlert, alertTimeoutDuration);
}

function hideAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.classList.add('hidden');
}




// Test calls
document.addEventListener('DOMContentLoaded', showAlert('Hello World!', 'warning')); 