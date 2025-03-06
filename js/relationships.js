// Data structure for departments
const departments = {
    cardiology: {
        name: 'Cardiology',
        services: ['Emergency Care', 'Diagnostic Services', 'Specialty Consultations'],
        description: 'Expert care for heart-related conditions'
    },
    neurology: {
        name: 'Neurology',
        services: ['Diagnostic Services', 'Specialty Consultations', 'Rehabilitation Services'],
        description: 'Specialized care for neurological disorders'
    },
    dermatology: {
        name: 'Dermatology',
        services: ['Specialty Consultations', 'Surgical Services', 'Preventive Care'],
        description: 'Expert skin care and treatments'
    },
    oncology: {
        name: 'Oncology',
        services: ['Surgical Services', 'Diagnostic Services', 'Specialty Consultations'],
        description: 'Comprehensive cancer care'
    },
    endocrinology: {
        name: 'Endocrinology',
        services: ['Diagnostic Services', 'Specialty Consultations', 'Preventive Care'],
        description: 'Hormone and metabolic care'
    },
    psychiatry: {
        name: 'Psychiatry',
        services: ['Specialty Consultations', 'Preventive Care'],
        description: 'Mental health care and support'
    },
    pediatrics: {
        name: 'Pediatrics',
        services: ['Emergency Care', 'Preventive Care', 'Specialty Consultations'],
        description: 'Comprehensive care for children'
    }
};

// Data structure for doctors
const doctors = {
    'Dr. Sarah Johnson': {
        specialty: 'Cardiology',
        credentials: 'MD, FACC',
        description: 'Specializing in advanced cardiac care, heart surgery, and cardiac rehabilitation with over 15 years of experience.'
    },
    'Dr. Michael Chen': {
        specialty: 'Neurology',
        credentials: 'MD, PhD',
        description: 'Expert in neurological disorders, stroke treatment, and innovative brain mapping approaches.'
    },
    'Dr. Lisa Thompson': {
        specialty: 'Dermatology',
        credentials: 'MD, FAAD',
        description: 'Expert in medical and cosmetic dermatology, laser treatments, and skin cancer surgery.'
    },
    'Dr. Robert Martinez': {
        specialty: 'Oncology',
        credentials: 'MD, PhD',
        description: 'Leading expert in cancer treatment, immunotherapy, and personalized chemotherapy protocols.'
    },
    'Dr. Amanda Lee': {
        specialty: 'Endocrinology',
        credentials: 'MD, FACE',
        description: 'Specialized in hormone disorders, diabetes management, and thyroid treatments.'
    },
    'Dr. David Kim': {
        specialty: 'Psychiatry',
        credentials: 'MD, FAPA',
        description: 'Experienced in anxiety, depression treatment, and cognitive behavioral therapy.'
    },
    'Dr. Emily Parker': {
        specialty: 'Pediatrics',
        credentials: 'MD, FAAP',
        description: 'Dedicated to child healthcare, vaccinations, and developmental assessments.'
    }
};

// Function to get related services for a department
function getDepartmentServices(departmentName) {
    const dept = departments[departmentName.toLowerCase()];
    return dept ? dept.services : [];
}

// Function to get doctors by department
function getDoctorsByDepartment(departmentName) {
    return Object.entries(doctors).filter(([_, doctor]) => 
        doctor.specialty.toLowerCase() === departmentName.toLowerCase()
    ).map(([name]) => name);
}

// Function to get department by doctor
function getDoctorDepartment(doctorName) {
    return doctors[doctorName]?.specialty || null;
}

// Function to get services by doctor
function getDoctorServices(doctorName) {
    const dept = getDoctorDepartment(doctorName);
    return dept ? getDepartmentServices(dept) : [];
}
