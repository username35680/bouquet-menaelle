import { useState, useEffect } from 'react';
import DetailedFlower from './DetailedFlower';
import Butterfly from './Butterfly';
import FloatingMessage from './FloatingMessage';

function App() {
  // 1. TOUS les Hooks en premier
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [flowers, setFlowers] = useState([]);
  const [butterflies, setButterflies] = useState([]);

  const messages = [
    "Sois fière de toi",
    "Dofus",
    "Blue Lock",
    "Ménaelle ✨",
    "Le Sylvestre",
    "Teckel",
    "Tandem"
  ];

  useEffect(() => {
    // On ne génère le bouquet que si nécessaire ou au montage
    const isMobile = window.innerWidth < 600;
    const bouquet = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      color: i % 2 === 0 ? '#FFD700' : '#FF69B4',
      delay: Math.random() * 3,
      xOffset: (Math.random() - 0.5) * (isMobile ? 150 : 400),
      height: (40 + Math.random() * 35) + "vh", 
      curve: (Math.random() - 0.5) * 100
    }));
    const sorted = bouquet.sort((a, b) => parseFloat(b.height) - parseFloat(a.height));
    setFlowers(sorted);

    const insects = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      delay: i * 2
    }));
    setButterflies(insects);
  }, []);

  const checkPassword = () => {
    // Remplace par le vrai nom du chat ;)
    if (password.toLowerCase() === "ton-mot-de-passe" || password === "1234") {
      setIsAuthorized(true);
    }
  };

  // 2. Les conditions d'affichage APRES les hooks
  if (!isAuthorized) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#e0f2fe', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontFamily: 'Dancing Script', color: '#be185d', fontSize: '2rem' }}>Coucou Ménaelle, entre le mot de passe :</h2>
        <input 
          type="password" 
          placeholder="Mot de passe..."
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkPassword()} // Permet de valider avec Entrée
          style={{ padding: '12px', borderRadius: '10px', border: '2px solid #f472b6', marginTop: '10px', width: '200px', textAlign: 'center' }}
        />
        <button onClick={checkPassword} style={{ marginTop: '15px', padding: '10px 25px', background: '#f472b6', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
          Ouvrir le jardin
        </button>
      </div>
    );
  }

  // 3. Le rendu final si autorisé
  return (
    <div className="App" style={{ 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden', 
      position: 'relative',
      background: 'linear-gradient(to bottom, #e0f2fe 0%, #ffffff 100%)' 
    }}>
      <div style={{ 
        position: 'absolute', bottom: 0, width: '100%', height: '100px', 
        background: 'linear-gradient(transparent, rgba(0,0,0,0.05))', zIndex: 1 
      }} />

      {messages.map((m, index) => (
        <FloatingMessage 
          key={index} 
          text={m} 
          delay={index * 4 + 2} 
        />
      ))}
      
      {flowers.map((f) => (
        <DetailedFlower key={f.id} {...f} />
      ))}
      
      {butterflies.map((b) => (
        <Butterfly key={b.id} delay={b.delay} />
      ))}
    </div>
  );
}

export default App;