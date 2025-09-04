import { useState } from 'react';
import './AuthPages.css';
import { useNavigate } from 'react-router-dom';

const CourseList = ({ data,type }) => {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [apiPoint] = useState(type==="tab1"?"unenroll":"enroll")
  const handleSelect = async (item) => {
    console.log("Selected item:", item);
    try { 
      const token = "Bearer "+ localStorage.getItem("authToken");
     
      
      const response = await fetch(API_BASE_URL + '/api/v1/student/'+apiPoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          course_id: item.courseCode,
        })
      });

      const data = await response.json();
      

      if (!response.ok) {
        if(response.status===401){
          navigate("/login")
        }
        throw new Error(data.message || 'Failed');
      }

      navigate(0); 
      
    } catch (error) {
     
    } finally {
      
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding:"20px"}}>
      {data.map((item) => (
        <div 
          key={item.courseCode} 
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          <h3>{item.courseCode}-{item.courseName}</h3>
          <p>{item.courseDescription}</p>
          {item.grade? 
          <div className='result-box'>Result : {item.grade}</div>
            :
          <div>
          {type === "tab2" ? <button 
                onClick={() => handleSelect(item)} 
                className='submit-btn'
              >
                Enroll
              </button> : <button 
                onClick={() => handleSelect(item)} 
                className='unenroll-btn'
              >
                Unenroll
              </button>}
              </div>
          }
      
        </div>
      ))}
    </div>
  );
};

const Student = () => {
  const [enData,setEnData] = useState([]);
  const [unData,setUnData] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

     async function fetchData() {
      try { 
        const token = "Bearer "+ localStorage.getItem("authToken");
        const response = await fetch(API_BASE_URL + '/api/v1/student/get_course_details', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed');
        }

        setEnData(data.message.enrolledCourses)
        setUnData(data.message.unEnrolledCourses)
        console.log(unData)

      }catch{

      }
    
    }
    fetchData();



  const [activeTab, setActiveTab] = useState("tab1");
    
      return (
        <div className="admin-container">
          {/* Tab Bar */}
          <div className="tab-bar">
            <button
              className={`tab-btn ${activeTab === "tab1" ? "active" : ""}`}
              onClick={() => setActiveTab("tab1")}
            >
              Enrolled Courses
            </button>
            <button
              className={`tab-btn ${activeTab === "tab2" ? "active" : ""}`}
              onClick={() => setActiveTab("tab2")}
            >
              Unenrolled Courses
            </button>
          </div>
    
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "tab1" && <div><CourseList data={enData} type={activeTab}/></div>}
            {activeTab === "tab2" && <div><CourseList data={unData} type={activeTab}/></div>}
          </div>
        </div>
      );
};

export default Student;