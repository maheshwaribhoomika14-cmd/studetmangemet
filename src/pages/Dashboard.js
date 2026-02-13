import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  // States
  const [activityType, setActivityType] = useState('Cycling'); // Default selection
  const [kgSaved, setKgSaved] = useState('');
  const [activities, setActivities] = useState([]);

  // 1. Backend se saara data fetch karne ka function
  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/activities');
      setActivities(response.data);
    } catch (error) {
      console.error("Data fetch karne mein error:", error);
    }
  };

  // Component load hote hi data lekar aao
  useEffect(() => {
    fetchActivities();
  }, []);

  // 2. Data insert karne ka function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kgSaved) return alert("Please enter kg amount!");

    try {
      // Backend schema ke hisaab se object (title aur carbonSaved)
      const newEntry = { 
        title: activityType, 
        carbonSaved: Number(kgSaved) 
      };
      
      await axios.post('http://localhost:5000/api/activities', newEntry);
      
      // Success: Form clear karo aur list update karo
      setKgSaved(''); 
      fetchActivities(); 
      alert("Activity Recorded in MongoDB! 🌿");
    } catch (error) {
      console.error("Data save karne mein error:", error);
      alert("Server error! Kya aapka Node.js server chal raha hai?");
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#2d6a4f', textAlign: 'center' }}>Eco-Track Dashboard</h1>

      {/* --- FORM SECTION (Input) --- */}
      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '30px', border: '1px solid #e0f2f1' }}>
        <h3 style={{ marginTop: 0, color: '#1b4332' }}>Track New Activity 🚀</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          
          <div style={{ flex: '2', minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Activity Type:</label>
            <select 
              value={activityType} 
              onChange={(e) => setActivityType(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
            >
              <option value="Cycling">Cycling instead of Car 🚲</option>
              <option value="Planting">Planting a Tree 🌳</option>
              <option value="Recycling">Recycling Plastic ♻️</option>
              <option value="Public Transport">Using Bus/Train 🚌</option>
              <option value="No Plastic Bag">Refusing Plastic Bags 🛍️</option>
              <option value="Solar Energy">Using Solar Energy ☀️</option>
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount (kg):</label>
            <input 
              type="number" 
              placeholder="e.g. 5" 
              value={kgSaved}
              onChange={(e) => setKgSaved(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" style={{ padding: '10px 25px', backgroundColor: '#2d6a4f', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            Save Activity
          </button>
        </form>
      </div>

      {/* --- LIST SECTION (1, 2, 3 Line Format) --- */}
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #ddd' }}>
        <h3 style={{ borderBottom: '2px solid #2d6a4f', paddingBottom: '10px', color: '#2d6a4f' }}>Your Impact History</h3>
        
        {activities.length > 0 ? (
          <ol style={{ paddingLeft: '25px', lineHeight: '2' }}>
            {activities.map((item) => (
              <li key={item._id} style={{ marginBottom: '15px', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}>
                <div style={{ display: 'inline-block' }}>
                  <strong style={{ fontSize: '18px' }}>{item.title}</strong>
                  <span style={{ marginLeft: '15px', backgroundColor: '#e8f5e9', color: '#2d6a4f', padding: '2px 10px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
                    {item.carbonSaved} kg CO2 Saved
                  </span>
                  <div style={{ color: '#888', fontSize: '12px' }}>
                    Date: {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p style={{ textAlign: 'center', color: '#999' }}>No data found. Start by adding an activity above!</p>
        )}
      </div>

      {/* --- DAILY TIPS --- */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '10px', border: '1px dashed #2d6a4f' }}>
        <h2 style={{ marginTop: 0 }}>Daily Green Tips 🌿</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Unplug electronics when not in use.</li>
          <li>Carry your own cloth bag for shopping.</li>
          <li>Use cold water for laundry to save energy.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;