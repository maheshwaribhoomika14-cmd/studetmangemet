import React from 'react';

function About() {
  return (
    <div style={{ padding: '40px', lineHeight: '1.6' }}>
      <h2>About EcoTrack</h2>
      <p>
        EcoTrack ek simple tool hai jo aapko ye samajhne mein madad karta hai ki aapka 
        har ek action (jaise cycling ya recycling) paryavaran (environment) par kya asar dalta hai.
      </p>
      <ul>
        <li><b>Goal:</b> Carbon footprint kam karna.</li>
        <li><b>Technology:</b> MERN Stack (React, Node, Express, MongoDB).</li>
      </ul>
    </div>
  );
}

export default About;