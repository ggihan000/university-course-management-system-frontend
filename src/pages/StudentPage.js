import { useState } from 'react';
import './AuthPages.css';
import { useNavigate } from 'react-router-dom';

const CourseList = ({ data,type }) => {
  const handleSelect = (item) => {
    console.log("Selected item:", item);
    // your function logic here
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding:"20px"}}>
      {data.map((item) => (
        <div 
          key={item.id} 
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          <h3>{item.id}-{item.title}</h3>
          <p>{item.description}</p>
          {item.result? 
          <div className='result-box'>Result : {item.result}</div>
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
  const data = [
  { id: 1, title: "Item 1", description: "This is the first item.", result: "A+" },
  { id: 2, title: "Item 2", description: "This is the second item." },
  { id: 3, title: "Item 3", description: "This is the third item." },
  { id: 1, title: "Item 1", description: "This is the first item." },
  { id: 2, title: "Item 2", description: "This is the second item." },
  { id: 3, title: "Item 3", description: "This is the third item." }
]
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
            {activeTab === "tab1" && <div><CourseList data={data} type={activeTab}/></div>}
            {activeTab === "tab2" && <div><CourseList data={data} type={activeTab}/></div>}
          </div>
        </div>
      );
};

export default Student;