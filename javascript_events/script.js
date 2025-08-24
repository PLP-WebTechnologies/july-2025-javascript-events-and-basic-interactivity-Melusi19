document.addEventListener('DOMContentLoaded', function() {
    initializeEventHandlers();
    initializeInteractiveFeatures();
    initializeFormValidation();
    initializeKeyboardEvents();
});

function initializeEventHandlers() {
    const themeToggle = document.getElementById('theme-toggle');
    let isDarkMode = false;

    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-theme', isDarkMode);

        themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
       
        console.log('Theme changed to:', isDarkMode ? 'Dark' : 'Light');
    });

    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

function initializeInteractiveFeatures() {
    setupCounterGame();
    setupCollapsibleFAQ();
    setupTabbedInterface();
    setupHoverEffects();
}

function setupCounterGame() {
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    const highScoreElement = document.getElementById('high-score');
    
    let count = 0;
    let highScore = 0;

    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();

        this.style.transform = 'scale(0.95)';
        setTimeout(() => this.style.transform = 'scale(1)', 100);
    });

    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();

        this.style.transform = 'scale(0.95)';
        setTimeout(() => this.style.transform = 'scale(1)', 100);
    });

    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();

        counterValue.style.color = '#e74c3c';
        setTimeout(() => counterValue.style.color = '', 500);
    });

    function updateCounter() {
        counterValue.textContent = count;

        if (count > highScore) {
            highScore = count;
            highScoreElement.textContent = highScore;

            highScoreElement.style.color = '#f39c12';
            setTimeout(() => highScoreElement.style.color = '', 1000);
        }

        if (count > 10) {
            counterValue.style.color = '#27ae60';
        } else if (count < 0) {
            counterValue.style.color = '#e74c3c';
        } else {
            counterValue.style.color = '';
        }
    }
}

function setupCollapsibleFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.parentElement;
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            if (isActive) {
                faqItem.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });

        question.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });

        question.addEventListener('mouseleave', function() {
            if (!this.parentElement.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

function setupTabbedInterface() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
            
            this.style.transform = 'translateY(-2px)';
            setTimeout(() => this.style.transform = '', 200);
        });
    });
}

function setupHoverEffects() {
    const hoverCards = document.querySelectorAll('.hover-card');
    
    hoverCards.forEach(card => {
        const info = card.querySelector('.card-info');
        
        card.addEventListener('mouseenter', function() {
            info.style.opacity = '1';
            info.style.transform = 'translateY(0)';
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            info.style.opacity = '0';
            info.style.transform = 'translateY(10px)';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeFormValidation() {
    const form = document.getElementById('registration-form');
    const clearBtn = document.getElementById('clear-form');

    form.addEventListener('submit', handleFormSubmission);
    
    clearBtn.addEventListener('click', clearForm);
    
    setupRealTimeValidation();
}

function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission
    
    const isValid = validateForm();
    
    if (isValid) {
        showSuccessMessage();
        console.log('Form submitted successfully!');
    } else {
        console.log('Form validation failed');
        const firstError = document.querySelector('.form-group.error input');
        if (firstError) {
            firstError.focus();
        }
    }
}

function validateForm() {
    let isValid = true;
    
    clearAllErrors();

    isValid &= validateFullName();
    isValid &= validateEmail();
    isValid &= validatePhone();
    isValid &= validatePassword();
    isValid &= validateConfirmPassword();
    isValid &= validateAge();
    isValid &= validateWebsite();
    isValid &= validateTerms();
    
    return Boolean(isValid);
}

function validateFullName() {
    const fullname = document.getElementById('fullname');
    const value = fullname.value.trim();
    
    if (!value) {
        showError('fullname', 'Full name is required');
        return false;
    }
    
    if (value.length < 2) {
        showError('fullname', 'Full name must be at least 2 characters long');
        return false;
    }
    
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        showError('fullname', 'Full name can only contain letters, spaces, hyphens, and apostrophes');
        return false;
    }
    
    showSuccess('fullname');
    return true;
}

function validateEmail() {
    const email = document.getElementById('email');
    const value = email.value.trim();
    
    if (!value) {
        showError('email', 'Email address is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        showError('email', 'Please enter a valid email address');
        return false;
    }
    
    showSuccess('email');
    return true;
}

function validatePhone() {
    const phone = document.getElementById('phone');
    const value = phone.value.trim();
    
    if (value) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showError('phone', 'Please enter a valid phone number');
            return false;
        }
    }
    
    showSuccess('phone');
    return true;
}

function validatePassword() {
    const password = document.getElementById('password');
    const value = password.value;
    
    if (!value) {
        showError('password', 'Password is required');
        updatePasswordStrength('', 0);
        return false;
    }
    
    if (value.length < 8) {
        showError('password', 'Password must be at least 8 characters long');
        updatePasswordStrength(value, 1);
        return false;
    }
    
    let strength = 0;
    const checks = [
        /[a-z]/.test(value), // lowercase
        /[A-Z]/.test(value), // uppercase
        /[0-9]/.test(value), // numbers
        /[^A-Za-z0-9]/.test(value), // special characters
        value.length >= 12 // long password
    ];
    
    strength = checks.reduce((acc, check) => acc + (check ? 1 : 0), 0);
    
    if (strength < 3) {
        showError('password', 'Password is too weak. Include uppercase, lowercase, numbers, and special characters.');
        updatePasswordStrength(value, strength);
        return false;
    }
    
    showSuccess('password');
    updatePasswordStrength(value, strength);
    return true;
}

function validateConfirmPassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const value = confirmPassword.value;
    
    if (!value) {
        showError('confirm-password', 'Please confirm your password');
        return false;
    }
    
    if (value !== password.value) {
        showError('confirm-password', 'Passwords do not match');
        return false;
    }
    
    showSuccess('confirm-password');
    return true;
}

function validateAge() {
    const age = document.getElementById('age');
    const value = age.value;
    
    if (value) {
        const ageNum = parseInt(value);
        if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
            showError('age', 'Age must be between 13 and 120');
            return false;
        }
    }
    
    showSuccess('age');
    return true;
}

function validateWebsite() {
    const website = document.getElementById('website');
    const value = website.value.trim();
    
    if (value) {
        const urlRegex = /^https?:\/\/.+\..+/;
        if (!urlRegex.test(value)) {
            showError('website', 'Please enter a valid website URL (include http:// or https://)');
            return false;
        }
    }
    
    showSuccess('website');
    return true;
}

function validateTerms() {
    const terms = document.getElementById('terms');
    
    if (!terms.checked) {
        showError('terms', 'You must agree to the Terms and Conditions');
        return false;
    }
    
    showSuccess('terms');
    return true;
}

function setupRealTimeValidation() {
    document.getElementById('fullname').addEventListener('blur', validateFullName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('confirm-password').addEventListener('blur', validateConfirmPassword);
    document.getElementById('age').addEventListener('blur', validateAge);
    document.getElementById('website').addEventListener('blur', validateWebsite);
    document.getElementById('terms').addEventListener('change', validateTerms);
    
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            clearError(this.name || this.id);
        });
    });
}

function updatePasswordStrength(password, strength) {
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    const strengthLevels = [
        { width: '0%', color: '#e74c3c', text: 'No password' },
        { width: '20%', color: '#e74c3c', text: 'Very weak' },
        { width: '40%', color: '#f39c12', text: 'Weak' },
        { width: '60%', color: '#f39c12', text: 'Fair' },
        { width: '80%', color: '#27ae60', text: 'Strong' },
        { width: '100%', color: '#27ae60', text: 'Very strong' }
    ];
    
    const level = strengthLevels[strength] || strengthLevels[0];
    
    strengthBar.style.width = level.width;
    strengthBar.style.backgroundColor = level.color;
    strengthText.textContent = `Password strength: ${level.text}`;
    strengthText.style.color = level.color;
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');
    const formGroup = field.closest('.form-group');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
}

function showSuccess(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');
    const formGroup = field.closest('.form-group');
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
}

function clearError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');
    const formGroup = field.closest('.form-group');
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    formGroup.classList.remove('error', 'success');
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const formGroups = document.querySelectorAll('.form-group');
    
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
    
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
    });
}

function clearForm() {
    const form = document.getElementById('registration-form');
    form.reset();
    clearAllErrors();
    updatePasswordStrength('', 0);
    document.getElementById('form-success').style.display = 'none';
}

function showSuccessMessage() {
    const form = document.getElementById('registration-form');
    const successMessage = document.getElementById('form-success');
    
    form.style.display = 'none';
    successMessage.style.display = 'block';

    setTimeout(() => {
        successMessage.style.display = 'none';
        form.style.display = 'block';
        clearForm();
    }, 5000);
}

function initializeKeyboardEvents() {
    const typingArea = document.getElementById('typing-area');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');
    const lastKey = document.getElementById('last-key');

    typingArea.addEventListener('input', function(event) {
        const text = this.value;

        charCount.textContent = text.length;

        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        wordCount.textContent = words.length;
    });

    typingArea.addEventListener('keydown', function(event) {
        let keyName = event.key;

        if (keyName === ' ') keyName = 'Space';
        else if (keyName === 'Enter') keyName = 'Enter';
        else if (keyName === 'Backspace') keyName = 'Backspace';
        else if (keyName === 'Tab') keyName = 'Tab';
        
        lastKey.textContent = keyName;
        
        lastKey.style.color = '#3498db';
        setTimeout(() => lastKey.style.color = '', 300);
    });

    typingArea.addEventListener('focus', function() {
        this.style.borderColor = '#3498db';
        this.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.3)';
    });
    
    typingArea.addEventListener('blur', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });
}

document.addEventListener('click', function(event) {
    if (event.target.matches('a[href^="#"]')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

document.addEventListener('submit', function(event) {
    const submitButton = event.target.querySelector('button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;

        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    }
});

console.log('Interactive Web Application initialized successfully!');