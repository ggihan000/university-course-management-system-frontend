import { useState } from 'react';
import './AuthPages.css';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  // State for form data
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    email: '',
    npassword: '',
    cpassword: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.cpassword) {
      newErrors.cpassword = 'Password is required';
    }

    if (!formData.npassword) {
      newErrors.npassword = 'Password is required';
    }else if (formData.npassword.length < 6) {
      newErrors.npassword = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setApiResponse(null);

    try { 
      const response = await fetch(API_BASE_URL + '/api/v1/auth/change_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          cpassword:formData.cpassword,
          npassword:formData.npassword
        })
      });

      const data = await response.json();

      console.log(data.message)
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

    
        navigate('/login');
    
      
      
    } catch (error) {
      setApiResponse({ 
        success: false, 
        message: 'An error occurred during login'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {apiResponse && (
          <div className={`alert ${apiResponse.success ? 'success' : 'error'}`}>
            {apiResponse.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Field */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>Current Password</label>
            <div>
              <input
              type="password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.cpassword ? 'input-error' : ''}
              />
        
            </div>
            {errors.cpassword && <span className="error">{errors.cpassword}</span>}
          </div>

          <div className="form-group">
            <label>New Password</label>
            <div>
              <input
              type="password"
                name="npassword"
                value={formData.npassword}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.npassword ? 'input-error' : ''}
              />
        
            </div>
            {errors.npassword && <span className="error">{errors.npassword}</span>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn"
          >
            Change Password
          </button>
        </form>

      </div>
    </div>
  );
};

export default ChangePassword;