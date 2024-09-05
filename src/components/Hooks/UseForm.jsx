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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      // Handle file input
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files[0], // Store the file object
      }));
    } else {
      // Handle text input
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files[0],
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
    handleInputChange,
    loading,
  };
}
