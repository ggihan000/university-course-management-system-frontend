import { useState } from 'react';
import './AdminPage.css';


const AddStudent = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
      name: '',
      nic: ''
    });
  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);


  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.nic) {
      newErrors.nic = 'NIC is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // ✅ stop page refresh
    
    if (!validateForm()) return;
    setApiResponse(null);
    
    try { 
      const token = "Bearer "+ localStorage.getItem("authToken");
      console.log(token);
      const response = await fetch(API_BASE_URL + '/api/v1/admin/add_students', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          name: formData.name,
          nic: formData.nic
        })
      });

      const data = await response.json();
      
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed');
      }

      setApiResponse({
  success: true,
  message: `Student Added successful! \n
      Student ID: ${data.student.user_id}  \n
      Email: ${data.student.email}  \n
      Password: ${data.student.email}`
      });
      
    } catch (error) {
      console.log("adminpage line 36"+error)
      setApiResponse({ 
        success: false, 
        message: error.message
      });
    } finally {
      
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  return(
    <form onSubmit={handleSubmit} className="auth-form">
          {/* Name Field */}
          {apiResponse && (
          <div className={`alert ${apiResponse.success ? 'success' : 'error'}`}
          style={{ whiteSpace: "pre-line" }}>
            {apiResponse.message}
          </div>
        )}
            <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label>National Identity Number</label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  placeholder="Enter student NIC"
                />
                {errors.name && <span className="error">{errors.nic}</span>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-btn"
            >
              Add
            </button>
          </form>
  );
}

const AddCourse = () => {
  const [formData, setFormData] = useState({
      course_title: '',
      course_description: '',
      year: '',
      semester:'',
      subject:''
    });
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [errors, setErrors] = useState({});
    const [apiResponse, setApiResponse] = useState(null);


    const validateForm = () => {
    const newErrors = {};
    
    if (!formData.course_title) {
      newErrors.course_title = 'Course Title is required';
    }
    
    if (!formData.course_description) {
      newErrors.course_description = 'Course Description is required';
    }

    if (!formData.year){
      newErrors.year = 'Select a Year';
    }
    if (!formData.semester){
      newErrors.semester = 'Select a semester';
    }
    if (!formData.subject){
      newErrors.subject = 'Select a subject';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // ✅ stop page refresh

    if (!validateForm()) return;
    setApiResponse(null);
    
    try { 
      const token = "Bearer "+ localStorage.getItem("authToken");
      console.log(token);
      const response = await fetch(API_BASE_URL + '/api/v1/admin/add_courses', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          course_title: formData.course_title,
          course_description: formData.course_description,
          year: formData.year,
          semester: formData.semester,
          subject: formData.subject
        })
      });

      const data = await response.json();
      
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed');
      }

      setApiResponse({ success: true, message: data.message});
      
    } catch (error) {
      console.log("adminpage line 36"+error)
      setApiResponse({ 
        success: false, 
        message: error.message
      });
    } finally {
      
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  return(
    <form onSubmit={handleSubmit} className="auth-form">
          {/* Name Field */}
          {apiResponse && (
          <div className={`alert ${apiResponse.success ? 'success' : 'error'}`}>
            {apiResponse.message}
          </div>
        )}
            <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  name="course_title"
                  value={formData.course_title}
                  onChange={handleChange}
                  placeholder="Enterprise Application Development"
                />
                {errors.course_title && <span className="error">{errors.course_title}</span>}
            </div>

            <div className="form-group">
                <label>Course Description</label>
                <input
                  type="text"
                  name="course_description"
                  value={formData.course_description}
                  onChange={handleChange}
                  placeholder="About Enterprise systems and development"
                />
                {errors.course_description && <span className="error">{errors.course_description}</span>}
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
          
              <div className="form-group" style={{ flex: 2 }}>
                <label>Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option> 
                </select>
                {errors.year && <span className="error">{errors.year}</span>}
              </div>

              <div className="form-group" style={{ flex: 2 }}>
                <label>Semester</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Semester
                  </option>
                  <option value="1">First Semester</option>
                  <option value="2">Second Semester</option>
                </select>
                {errors.semester && <span className="error">{errors.semester}</span>}
              </div>

              <div className="form-group" style={{ flex: 3 }}>
                <label>Subject Code</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter Subject Code"
                />
                {errors.subject && <span className="error">{errors.subject}</span>}
              </div>
            </div>


            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-btn"
            >
              Add
            </button>
          </form>
  );
}

const AddResult = () => {
  const [formData, setFormData] = useState({
      student_id: '',
      course_id: '',
      grade: ''
    });
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [errors, setErrors] = useState({});
    const [apiResponse, setApiResponse] = useState(null);


    const validateForm = () => {
    const newErrors = {};
    
    if (!formData.student_id) {
      newErrors.student_id = 'Student ID is required';
    }
    
    if (!formData.course_id) {
      newErrors.course_id = 'Course ID is required';
    }

    if (!formData.grade){
      newErrors.grade = 'Select a Grade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // ✅ stop page refresh

    if (!validateForm()) return;
    setApiResponse(null);
    
    try { 
      const token = "Bearer "+ localStorage.getItem("authToken");
      console.log(token);
      const response = await fetch(API_BASE_URL + '/api/v1/admin/add_results', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          userId: formData.student_id,
          courseCode: formData.course_id,
          grade: formData.grade
        })
      });

      const data = await response.json();
      
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed');
      }

      setApiResponse({ success: true, message: 'Result Added successfully!'});
      
    } catch (error) {
      console.log("adminpage line 36"+error)
      setApiResponse({ 
        success: false, 
        message: error.message
      });
    } finally {
      
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  return(
    <form onSubmit={handleSubmit} className="auth-form">
          {/* Name Field */}
          {/* Name Field */}
          {apiResponse && (
          <div className={`alert ${apiResponse.success ? 'success' : 'error'}`}>
            {apiResponse.message}
          </div>
        )}
            <div className="form-group">
                <label>Student Id</label>
                <input
                  type="text"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  placeholder="Example - gihan007"
                />
                {errors.student_id && <span className="error">{errors.student_id}</span>}
            </div>

            <div className="form-group">
                <label>Course Id</label>
                <input
                  type="text"
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleChange}
                  placeholder="Example - 44092"
                />
                {errors.course_id && <span className="error">{errors.course_id}</span>}
            </div>

            <div className="form-group">
                <label>Grade</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
              
                >
                  <option value="" disabled>
                    Select grade
                  </option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
                {errors.grade && <span className="error">{errors.grade}</span>}
                </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-btn"
            >
              Add
            </button>
          </form>
  );
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="admin-container">
      {/* Tab Bar */}
      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => setActiveTab("tab1")}
        >
          Add Student
        </button>
        <button
          className={`tab-btn ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => setActiveTab("tab2")}
        >
          Add Course
        </button>
        <button
          className={`tab-btn ${activeTab === "tab3" ? "active" : ""}`}
          onClick={() => setActiveTab("tab3")}
        >
          Add Result
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "tab1" && <div><AddStudent/></div>}
        {activeTab === "tab2" && <div><AddCourse/></div>}
        {activeTab === "tab3" && <div><AddResult/></div>}
      </div>
    </div>
  );
};

export default Admin;
