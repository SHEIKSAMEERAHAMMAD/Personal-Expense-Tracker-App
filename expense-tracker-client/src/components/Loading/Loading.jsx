import React, { useState, useEffect } from "react";

function LoadingComponent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return <div>Content loaded!</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
  },
  loader: {
    border: "16px solid #f3f3f3", 
    borderTop: "16px solid #3498db", 
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 2s linear infinite",
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  }
};

export default LoadingComponent;
