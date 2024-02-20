const form = document.getElementById('registrationForm');
    const errorContainer = document.getElementById('errorContainer');
    const successContainer = document.getElementById('successContainer');
    

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const verifyPassword = document.getElementById('verifyPassword').value.trim();
        
        let errors = [];
        
        if (firstName.length < 2) {
            errors.push("First name must be at least 2 characters long.");
        }
        if (lastName.length < 2) {
            errors.push("Last name must be at least 2 characters long.");
        }
        if (!validateEmail(email)) {
            errors.push("Email must be a valid email address.");
        }
        if (password.length < 6 || password.length > 12) {
            errors.push("Password must be between 6 and 12 characters long.");
        }
        if (!containsSpecialCharacter(password) || !containsNumber(password) || !containsUpperCase(password) || !containsLowerCase(password)) {
            errors.push("Password must contain at least one special character, one number, one uppercase letter, and one lowercase letter.");
        }
        if (password !== verifyPassword) {
            errors.push("Passwords do not match.");
        }

        if (errors.length > 0) {
            errorContainer.innerHTML = '<p class="error">' + errors.join('<br>') + '</p>';
        } else {
            successContainer.innerHTML = '<p class="success">Registration successful!</p>';
        }
    });

    function validateEmail(email) {
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');
        return atIndex > 0 && dotIndex > atIndex;
    }

    function containsSpecialCharacter(text) {
        const specialCharacters = "!@#$%^&*()_+{}:<>?";
        for (let i = 0; i < text.length; i++) {
            if (specialCharacters.includes(text[i])) {
                return true;
            }
        }
        return false;
    }

    function containsNumber(text) {
        return /\d/.test(text);
    }

    function containsUpperCase(text) {
        return /[A-Z]/.test(text);
    }

    function containsLowerCase(text) {
        return /[a-z]/.test(text);
    }
