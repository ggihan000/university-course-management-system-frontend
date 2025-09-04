import { useState } from 'react';
import './AuthPages.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State for form data
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePassword = (e) => {
    e.preventDefault();
    console.log("changepass")
    navigate("/change_password")
  }

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
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const response = await fetch(API_BASE_URL + '/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      localStorage.setItem('authToken', data.token);
      setApiResponse({ success: true, message: 'Login successful! Redirecting...' });

      if(data.role){
        if(data.role==="ADMIN"){
          navigate('/admin');
        }else{
          navigate('/student');
        }
      }
      
      
    } catch (error) {
      setApiResponse({ 
        success: false, 
        message: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Use Email:admin@kln.ac.lk Password:admin123</p>
        </div>
        
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
            <label>Password</label>
            <div>
              <input
              type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'input-error' : ''}
              />
        
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-header">
          <p className='change-password' onClick={changePassword}>Change Password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;