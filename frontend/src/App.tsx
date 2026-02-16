import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState<string>('Connecting...');
  const [prediction, setPrediction] = useState<number | string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus(data.status || '✅ LIVE!'))
      .catch(err => setBackendStatus('❌ Backend Error'));
  }, []);

  const handlePredict = async () => {
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: [0.5, 0.3, 0.8] })
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      setPrediction('❌ Prediction failed');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 GovTT ML Dashboard</h1>
        <p>Backend: {backendStatus}</p>
        <button onClick={handlePredict}>🔮 Run ML Prediction</button>
        {prediction !== null && <p>Prediction: {String(prediction)}</p>}
      </header>
    </div>
  );
}

export default App;
