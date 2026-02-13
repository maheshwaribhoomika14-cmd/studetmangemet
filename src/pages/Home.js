import React from 'react';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to EcoTrack 🌿</h1>
      <p>Apne daily carbon footprint ko track karein aur dharti ko bachayein.</p>
      <button onClick={() => window.location.href='/dashboard'}>Go to Dashboard</button>
    </div>
  );
}

export default Home;