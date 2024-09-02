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

export const validateStudentData = (form, setError) => {
  let valid = true;
  const newErrors = {
    student_name: "",
    family_card_number: "",
    student_card_number: "",
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

    interview_score: "",
    health_score: "",
  };
  if (!form.student_name) {
    newErrors.student_name = "wajib diisi";
    valid = false;
  }
  if (!form.student_card_number) {
    newErrors.student_card_number = "wajib diisi";
    valid = false;
  }
  if (!form.family_card_number) {
    newErrors.family_card_number = "wajib diisi";
    valid = false;
  }
  if (!form.student_gender) {
    newErrors.student_gender = "wajib diisi";
    valid = false;
  }
  if (!form.place_birth) {
    newErrors.place_birth = "wajib diisi";
    valid = false;
  }
  if (!form.date_birth) {
    newErrors.date_birth = "wajib diisi";
    valid = false;
  }
  if (!form.student_address) {
    newErrors.student_address = "wajib diisi";
    valid = false;
  }
  if (!form.student_address_now) {
    newErrors.student_address_now = "wajib diisi";
    valid = false;
  }
  if (!form.student_distance) {
    newErrors.student_distance = "wajib diisi";
    valid = false;
  }
  if (!form.student_religion) {
    newErrors.student_religion = "wajib diisi";
    valid = false;
  }
  if (!form.student_blood_type) {
    newErrors.student_blood_type = "wajib diisi";
    valid = false;
  }
  if (!form.student_weight) {
    newErrors.student_weight = "wajib diisi";
    valid = false;
  }
  if (!form.student_height) {
    newErrors.student_height = "wajib diisi";
    valid = false;
  }
  if (!form.student_child) {
    newErrors.student_child = "wajib diisi";
    valid = false;
  }
  if (!form.student_kps) {
    newErrors.student_kps = "wajib diisi";
    valid = false;
  }
  if (!form.student_hobby) {
    newErrors.student_hobby = "wajib diisi";
    valid = false;
  }

  if (!form.father_name) {
    newErrors.father_name = "wajib diisi";
    valid = false;
  }
  if (!form.father_job) {
    newErrors.father_job = "wajib diisi";
    valid = false;
  }
  if (!form.father_income) {
    newErrors.father_income = "wajib diisi";
    valid = false;
  }
  if (!form.place_birth_father) {
    newErrors.place_birth_father = "wajib diisi";
    valid = false;
  }
  if (!form.mother_name) {
    newErrors.mother_name = "wajib diisi";
    valid = false;
  }
  if (!form.mother_job) {
    newErrors.mother_job = "wajib diisi";
    valid = false;
  }
  if (!form.mother_income) {
    newErrors.mother_income = "wajib diisi";
    valid = false;
  }
  if (!form.place_birth_mother) {
    newErrors.place_birth_mother = "wajib diisi";
    valid = false;
  }
  if (!form.mother_birth) {
    newErrors.mother_birth = "wajib diisi";
    valid = false;
  }
  if (!form.phoneNumber_house) {
    newErrors.phoneNumber_house = "wajib diisi";
    valid = false;
  }
  if (!form.school_name) {
    newErrors.school_name = "wajib diisi";
    valid = false;
  }
  if (!form.school_status) {
    newErrors.school_status = "wajib diisi";
    valid = false;
  }
  if (!form.school_address) {
    newErrors.school_address = "wajib diisi";
    valid = false;
  }
  if (!form.ijazah_number) {
    newErrors.ijazah_number = "wajib diisi";
    valid = false;
  }
  if (!form.major_choice1) {
    newErrors.major_choice1 = "wajib diisi";
    valid = false;
  }
  if (!form.major_choice2) {
    newErrors.major_choice2 = "wajib diisi";
    valid = false;
  }
  if (!form.nisn) {
    newErrors.nisn = "wajib diisi";
    valid = false;
  }

  if (!form.mathematics1) {
    newErrors.mathematics1 = "wajib diisi";
    valid = false;
  }
  if (!form.mathematics2) {
    newErrors.mathematics2 = "wajib diisi";
    valid = false;
  }
  if (!form.mathematics3) {
    newErrors.mathematics3 = "wajib diisi";
    valid = false;
  }
  if (!form.mathematics4) {
    newErrors.mathematics4 = "wajib diisi";
    valid = false;
  }
  if (!form.mathematics5) {
    newErrors.mathematics5 = "wajib diisi";
    valid = false;
  }
  if (!form.science1) {
    newErrors.science1 = "wajib diisi";
    valid = false;
  }
  if (!form.science2) {
    newErrors.science2 = "wajib diisi";
    valid = false;
  }
  if (!form.science3) {
    newErrors.science3 = "wajib diisi";
    valid = false;
  }
  if (!form.science3) {
    newErrors.science3 = "wajib diisi";
    valid = false;
  }
  if (!form.science4) {
    newErrors.science4 = "wajib diisi";
    valid = false;
  }
  if (!form.science5) {
    newErrors.science5 = "wajib diisi";
    valid = false;
  }
  if (!form.student_kps) {
    newErrors.student_kps = "wajib diisi";
    valid = false;
  }
  if (!form.indonesian1) {
    newErrors.indonesian1 = "wajib diisi";
    valid = false;
  }
  if (!form.indonesian2) {
    newErrors.indonesian2 = "wajib diisi";
    valid = false;
  }
  if (!form.indonesian3) {
    newErrors.indonesian3 = "wajib diisi";
    valid = false;
  }
  if (!form.indonesian4) {
    newErrors.indonesian4 = "wajib diisi";
    valid = false;
  }
  if (!form.indonesian5) {
    newErrors.indonesian5 = "wajib diisi";
    valid = false;
  }
  if (!form.english1) {
    newErrors.english1 = "wajib diisi";
    valid = false;
  }
  if (!form.english2) {
    newErrors.english2 = "wajib diisi";
    valid = false;
  }
  if (!form.english3) {
    newErrors.english3 = "wajib diisi";
    valid = false;
  }
  if (!form.english4) {
    newErrors.english4 = "wajib diisi";
    valid = false;
  }
  if (!form.english5) {
    newErrors.english5 = "wajib diisi";
    valid = false;
  }
  if (!form.student_kps) {
    newErrors.student_kps = "wajib diisi";
    valid = false;
  }

  if (!form.studentDocument) {
    newErrors.studentDocument = "wajib diisi";
    valid = false;
  }

  setError(newErrors);
  return valid;
};

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const isoString = "2024-09-12T00:00:00.000Z";
const formattedDate = formatDate(isoString);
console.log(formattedDate); // Output: 12-09-2024


export const dataStudent = (form) => {
  const formData = {
    student_name: form.student_name,
    student_card_number: form.student_card_number,
    family_card_number: form.family_card_number,
    student_gender: form.student_gender,
    place_birth: form.place_birth,
    date_birth: form.date_birth,
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
    father_birth: form.father_birth,
    father_job: form.father_job,
    father_income: form.father_income,
    mother_name: form.mother_name,
    place_birth_mother: form.place_birth_mother,
    mother_birth: form.mother_birth,
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

    health_score: Number(form.health_score) || 3,
    interview_score: Number(form.interview_score) || 3,
  };
   console.log(formData);
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
  
  if (form?.final_result !== data?.final_result) {
    valid = true;
  }
  if (form?.major_result !== data?.major_result) {
    valid = true;
  }
  // if (form?.result_description !== data?.result_description) {
  //   valid = true;
  // }

  return valid;
};
export const validateScoreForm = (form, setError) => {
  let valid = true;
  const isNumber = (value) => /^\d+(\.\d+)?$/.test(value);
  const newErrors = {
    health_score: "",
    interview_score: "",
    final_result: "",
    major_result: "",
    result_description: "",
  };

  if (!form.health_score) {
    newErrors.health_score = "Nilai Kesehatan wajib diisi!";
    valid = false;
  } else if (!isNumber(form.health_score)) {
    newErrors.health_score = "Nilai Kesehatan harus berupa angka!";
    valid = false;
  } else if (Number(form.health_score) > 50) {
    newErrors.health_score = "Nilai maksimal untuk nilai kesehatan adalah 50.";
    valid = false;
  }

  // Validasi interview_score
  if (!form.interview_score) {
    newErrors.interview_score = "Nilai Interview wajib diisi!";
    valid = false;
  } else if (!isNumber(form.interview_score)) {
    newErrors.interview_score = "Nilai Interview harus berupa angka!";
    valid = false;
  } else if (Number(form.interview_score) > 50) {
    newErrors.interview_score = "Nilai maksimal untuk nilai wawancara adalah 50.";
    valid = false;
  }

  if (!form.final_result) {
    newErrors.final_result = "Nilai Interview wajib diisi!";
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

  setError(newErrors);
  return valid;
};
export const dataScore = (form) => {
  const formData = {
    id: form.id,
    health_score: form.health_score,
    interview_score: form.interview_score,
    final_result: form.final_result,
    major_result: form.major_result,
    result_description: form.result_description,
  };
  return formData;
};

export const dataArticle = (form) => {
  return {
    article_name: form.article_name,
    article_description: form.article_description,
  };
};

export const validateArticle = (form) => {
  let valid = true;

  const newErrors = {
    article_name: "",
    article_description: "",
  };

  if (!form.article_name) {
    newErrors.article_name = "Judul Keahlian wajib diisi!";
    valid = false;
  }

  if (!form.article_description) {
    newErrors.article_description = "Deskripsi wajib diisi!";
    valid = false;
  } else if (form.article_description.length > 1000) {
    newErrors.article_description =
      "Deskripsi tidak boleh lebih dari 1000 karakter!";
    valid = false;
  }

  return { valid, newErrors };
};

export const validateArticleIsChanges = (form, data) => {
  return (
    form?.article_name !== data?.article_name ||
    form?.article_description !== data?.article_description
  );
};

export const dataMajor = (form, setError) => {
  const formData = {
    major_name: form.major_name,
    major_description: form.major_description,
    major_picture: form.major_picture,
  };
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
