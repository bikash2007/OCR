import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Avatar, Input } from '@mui/material';
import axios from 'axios';

const SignUpForm = ({ setIsLogin}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    first_name: '',
    last_name: '',
    contact: '',
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [signUpError, setSignUpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, photo: file }));
    setPhotoPreview(URL.createObjectURL(file));  // Create preview for photo
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    if (!formData.first_name) {
      newErrors.first_name = 'First name is required';
      isValid = false;
    }
    if (!formData.last_name) {
      newErrors.last_name = 'Last name is required';
      isValid = false;
    }
    if (!formData.contact) {
      newErrors.contact = 'Contact is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUpError("");
    if (validate()) {
      setIsLoading(true);
      const payload = new FormData();

      // Exclude `confirmPassword` from the payload
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "confirmPassword") {
          payload.append(key, value);
        }
      });

      try {
        const response = await axios.post('http://192.168.1.68:8000/api/users/', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('User signed up successfully , check the email to confirm');
  
         window.location.reload()
      } catch (error) {
        setSignUpError("Sign-up failed. Please try again.");
        console.error('Error signing up:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, textAlign: 'center' }}>
      <Avatar
        src={photoPreview}
        sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}
      />
      <Typography variant="body1" color="textSecondary" sx={{ mb: 1 }}>
        Upload Profile Picture
      </Typography>
      <Input fullWidth type="file" name="photo" onChange={handleFileChange} sx={{ mb: 2 }} />

      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        margin="normal"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        required
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        margin="normal"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        required
      />
      <TextField
        fullWidth
        label="Confirm Password"
        variant="outlined"
        margin="normal"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        required
      />
      <TextField
        fullWidth
        label="First Name"
        variant="outlined"
        margin="normal"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        error={!!errors.first_name}
        helperText={errors.first_name}
        required
      />
      <TextField
        fullWidth
        label="Last Name"
        variant="outlined"
        margin="normal"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        error={!!errors.last_name}
        helperText={errors.last_name}
        required
      />
      <TextField
        fullWidth
        label="Contact"
        variant="outlined"
        margin="normal"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        error={!!errors.contact}
        helperText={errors.contact}
        required
      />
      
      {signUpError && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {signUpError}
        </Typography>
      )}
      
      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2, py: 1.2 }}
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
    </Box>
  );
};

export default SignUpForm;
