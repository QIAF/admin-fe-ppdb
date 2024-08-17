export const validateScoreIsChanges = (form, data) => {
    let valid = false;
    
    if (form?.health_score !== data?.health_score) {
        valid = true;
    }
    if (form?.interview_score !== data?.interview_score) {
        valid = true;
    }

    return valid;
}


export const validateScoreForm = (form, setErrors) => {
    let valid = true;
    const isNumber = (value) => /^\d+(\.\d+)?$/.test(value);
    const newErrors = { 
        health_score: "",
        interview_score: "",
    };

    if (!form.health_score) {
        newErrors.health_score = 'Nilai Kesehatan wajib diisi!';
        valid = false;
    } else if (!isNumber(form.health_score)) {
        newErrors.health_score = 'Nilai Kesehatan harus berupa angka!';
        valid = false;
    }

    if (!form.interview_score) {
        newErrors.interview_score = 'Nilai Interview wajib diisi!';
        valid = false;
    } else if (!isNumber(form.interview_score)) {
        newErrors.interview_score = 'Nilai Interview harus berupa angka!';
        valid = false;
    }

    setErrors(newErrors);
    return valid;

}

export const dataScore = (form) => {
    const formData = {
        user_id: form.id,
        health_score: form.health_score,
        interview_score: form.interview_score,
    }
    return formData;
};