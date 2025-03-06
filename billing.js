// Payment method selection
function selectPaymentMethod(method) {
    // Remove selected class from all options
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add selected class to clicked option
    const selectedOption = document.querySelector(`.payment-option[onclick*="'${method}'`)
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }

    // Show/hide card details based on payment method
    const cardDetails = document.getElementById('cardDetails');
    if (method === 'credit' || method === 'debit') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
}

// Handle payment submission
function handlePayment(event) {
    event.preventDefault();
    
    // Basic form validation
    const amount = document.getElementById('amount').value;
    if (!amount || amount <= 0) {
        alert('Please enter a valid payment amount');
        return false;
    }

    const selectedMethod = document.querySelector('.payment-option.selected');
    if (!selectedMethod) {
        alert('Please select a payment method');
        return false;
    }

    // If credit/debit card is selected, validate card details
    if (selectedMethod.querySelector('p').textContent.includes('Card')) {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        if (!validateCardDetails(cardNumber, expiryDate, cvv)) {
            return false;
        }
    }

    // Simulate payment processing
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none';

    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;

    setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Show success message
        successMessage.style.display = 'block';

        // Reset form
        event.target.reset();
        document.querySelectorAll('.payment-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.getElementById('cardDetails').style.display = 'none';

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }, 2000);

    return false;
}

// Card details validation
function validateCardDetails(cardNumber, expiryDate, cvv) {
    // Remove spaces and dashes from card number
    cardNumber = cardNumber.replace(/[\s-]/g, '');

    // Validate card number (simple Luhn algorithm)
    if (!/^\d{16}$/.test(cardNumber) || !luhnCheck(cardNumber)) {
        alert('Please enter a valid card number');
        return false;
    }

    // Validate expiry date format (MM/YY)
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }

    // Validate expiry date is not in the past
    const [month, year] = expiryDate.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const today = new Date();
    if (expiry < today) {
        alert('Card has expired');
        return false;
    }

    // Validate CVV
    if (!/^\d{3,4}$/.test(cvv)) {
        alert('Please enter a valid CVV');
        return false;
    }

    return true;
}

// Luhn algorithm for card number validation
function luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;

    // Loop through values starting from the rightmost one
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return (sum % 10) === 0;
}

// Format card number as user types
document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue.slice(0, 19); // Limit to 16 digits + 3 spaces
});

// Format expiry date as user types
document.getElementById('expiryDate').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    e.target.value = value.slice(0, 5); // Limit to MM/YY format
});

// Limit CVV to 3-4 digits
document.getElementById('cvv').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value.slice(0, 4);
});