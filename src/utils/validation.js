export const loginData = (form) => {
  const formLogin = {
    user_number: form.user_number,
    password: form.password,
  };
  return formLogin;
};

// export const validateLogin = (form, setError) => {
//   let valid = true;
//   const emailRegex = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//   const newErrors = {
//     email: "",
//     password: "",
//   };
//   if (!form.email) {
//     newErrors.email = "Email wajib diisi";
//     valid = false;
//   } else if (!emailRegex(form.email)) {
//     newErrors.email = "Masukkan email yang valid";
//   }

//   if (!form.password) {
//     newErrors.password = "Password wajib diisi";
//     valid = false;
//   }
//   setError(newErrors);
//   return valid;
// };
export const validateLogin = (form, setError) => {
  let valid = true;
  const newErrors = {
    user_number: "",
    password: "",
  };
  if (!form.user_number) {
    newErrors.user_number = "Email wajib diisi";
    valid = false;
  }
  if (!form.password) {
    newErrors.password = "Password wajib diisi";
    valid = false;
  }
  setError(newErrors);
  return valid;
};

export const validateStudentData = (form, setErrors) => {
  let valid = true;
  const newErrors = {
    student_name: "",
    family_card_number: "",
    student_gender: "",
    place_birth: "",
    date_birth: "",
    student_address: "",
    student_address_now: "",
    student_distance: "",
    student_religion: "",
    student_blood_type: "",
    student_height: "",
    student_weight: "",
    student_child: "",
    student_kps: "",
    student_hobby: "",

    father_name: "",
    father_job: "",
    father_income: "",
    place_birth_father: "",
    father_birth: "",
    mother_name: "",
    mother_job: "",
    mother_income: "",
    place_birth_mother: "",
    mother_birth: "",
    phoneNumber_house: "",

    guardian_name: "",
    guardian_address: "",
    guardian_phone: "",
    guardian_job: "",

    school_name: "",
    school_status: "",
    school_address: "",
    ijazah_number: "",
    major_choice1: "",
    major_choice2: "",
    nisn: "",

    mathematics1: "",
    mathematics2: "",
    mathematics3: "",
    mathematics4: "",
    mathematics5: "",

    science1: "",
    science2: "",
    science3: "",
    science4: "",
    science5: "",

    indonesian1: "",
    indonesian2: "",
    indonesian3: "",
    indonesian4: "",
    indonesian5: "",

    english1: "",
    english2: "",
    english3: "",
    english4: "",
    english5: "",
  };
};

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const dataStudent = (form) => {
  const formData = {
  
    student_name: form.student_name,
    family_card_number: form.family_card_number,
    student_gender: form.student_gender,
    place_birth: form.place_birth,
    date_birth: formatDate.date_birth,
    student_address: form.student_address,
    student_address_now: form.student_address_now,
    student_distance: form.student_distance,
    student_religion: form.student_religion,
    student_blood_type: form.student_blood_type,
    student_height: form.student_height,
    student_weight: form.student_weight,
    student_child: form.student_child,
    student_kps: form.student_kps,
    student_hobby: form.student_hobby,
    father_name: form.father_name,
    place_birth_father: form.place_birth_father,
    father_birth: formatDate.father_birth,
    father_job: form.father_job,
    father_income: form.father_income,
    mother_name: form.mother_name,
    place_birth_mother: form.place_birth_mother,
    mother_birth: formatDate.mother_birth,
    mother_job: form.mother_job,
    mother_income: form.mother_income,
    phoneNumber_house: form.phoneNumber_house,

    guardian_name: form.guardian_name,
    guardian_address: form.guardian_address,
    guardian_phone: form.guardian_phone,
    guardian_job: form.guardian_job,

    school_name: form.school_name,
    school_status: form.school_status,
    school_address: form.school_address,
    ijazah_number: form.ijazah_number,
    major_choice1: form.major_choice1,
    major_choice2: form.major_choice2,
    nisn: form.nisn,

    mathematics1: form.mathematics1,
    mathematics2: form.mathematics2,
    mathematics3: form.mathematics3,
    mathematics4: form.mathematics4,
    mathematics5: form.mathematics5,

    science1: form.science1,
    science2: form.science2,
    science3: form.science3,
    science4: form.science4,
    science5: form.science5,

    indonesian1: form.indonesian1,
    indonesian2: form.indonesian2,
    indonesian3: form.indonesian3,
    indonesian4: form.indonesian4,
    indonesian5: form.indonesian5,

    english1: form.english1,
    english2: form.english2,
    english3: form.english3,
    english4: form.english4,
    english5: form.english5,


  };
   return formData;
};

export const validateScoreIsChanges = (form, data) => {
  let valid = false;

  if (form?.health_score !== data?.health_score) {
    valid = true;
  }
  if (form?.interview_score !== data?.interview_score) {
    valid = true;
  }
  if (form?.major_result !== data?.major_result) {
    valid = true;
  }
  if (form?.result_description !== data?.result_description) {
    valid = true;
  }

  return valid;
};
export const validateScoreForm = (form, setErrors) => {
  let valid = true;
  const isNumber = (value) => /^\d+(\.\d+)?$/.test(value);
  const newErrors = {
    health_score: "",
    interview_score: "",
    major_result: "",
    result_description: "",
  };

  if (!form.health_score) {
    newErrors.health_score = "Nilai Kesehatan wajib diisi!";
    valid = false;
  } else if (!isNumber(form.health_score)) {
    newErrors.health_score = "Nilai Kesehatan harus berupa angka!";
    valid = false;
  }

  if (!form.interview_score) {
    newErrors.interview_score = "Nilai Interview wajib diisi!";
    valid = false;
  } else if (!isNumber(form.interview_score)) {
    newErrors.interview_score = "Nilai Interview harus berupa angka!";
    valid = false;
  }
  if (!form.major_result) {
    newErrors.major_result = "Nilai Interview wajib diisi!";
    valid = false;
  }
  if (!form.result_description) {
    newErrors.result_description = "Nilai Interview wajib diisi!";
    valid = false;
  }


  setErrors(newErrors);
  return valid;
};
export const dataScore = (form) => {
  const formData = {
    user_id: form.id,
    health_score: form.health_score,
    interview_score: form.interview_score,
    major_result: form.major_result,
    result_description: form.result_description
  };
  return formData;
};

export const dataMajor = (form) => {
  const formData ={
    major_name: form.major_name,
    major_description: form.major_description,
    major_picture: form.major_picture,
  }
  return formData;
};

export const validateMajor = (form, setErrors) => {
  let valid = true;

  const newErrors = {
    major_name: "",
    major_description: "",
    major_picture: "",
  };

  if (!form.major_name) {
    newErrors.major_name = "Nama Bidang Keahlian wajib diisi!";
    valid = false;
  }
  if (!form.major_description) {
    newErrors.major_description = "Deskripsi Bidang Keahlian wajib diisi!";
    valid = false;
  }
  if (!form.major_picture) {
    newErrors.major_picture = "GambarBidang Keahlian wajib diisi!";
    valid = false;
  }
   setErrors(newErrors);
  return valid;

};

export const validateMajorIsChanges = (form, data) => {
  let valid = false;

  if (form?.major_name !== data?.major_name) {
    valid = true;
  }
  if (form?.major_description !== data?.major_description) {
    valid = true;
  }
  if (form?.major_picture !== data?.major_picture) {
    valid = true;
  }

  return valid;
};