import React, { useState } from "react";

const initState = {
  offset: null,
  loadingEdit: false,
};

export default function useForm(initialState, initialError) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialError);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const [key, criteria_name] = id.split(".");

    setForm((prevForm) => ({
      ...prevForm,
      criteriaValues: {
        ...prevForm.criteriaValues,
        [criteria_name]: {
          ...prevForm.criteriaValues[criteria_name],
          calculation: value,
        },
      },
    }));
  };

  const handleInputScore = (criteriaName, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      criteria_values: {
        ...prevForm.criteria_values,
        [criteriaName]: value,
      },
    }));
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    handleInput,
    setLoading,
    handleChange,
    handleInputScore,
    handleInputChange,
    loading,
  };
}
