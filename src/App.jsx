import { useState, useEffect } from 'react';
import DetailedFlower from './DetailedFlower';
import Butterfly from './Butterfly';
import FloatingMessage from './FloatingMessage';

function App() {
  const [flowers, setFlowers] = useState([]);
  const [butterflies, setButterflies] = useState([]);
  const messages = [
    "Sois fière de toi",
    "Rayonnante",
    "Une belle âme",
    "Ménaelle ✨",
    "Ton sourire...",
    "Unique en ton genre",
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 600;
    const bouquet = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      color: i % 2 === 0 ? '#FFD700' : '#FF69B4',
      delay: Math.random() * 3,
      xOffset: (Math.random() - 0.5) * (isMobile ? 150 : 400),
      // UTILISATION DE VH : Les tiges feront entre 40% et 75% de la hauteur de l'écran
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
  

  return (
    <div className="App" style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Un petit dégradé au sol pour la profondeur */}
      <div style={{ 
        position: 'absolute', bottom: 0, width: '100%', height: '100px', 
        background: 'linear-gradient(transparent, rgba(0,0,0,0.05))', zIndex: 1 
      }} />

      {messages.map((m, index) => (
        <FloatingMessage 
          key={index} 
          text={m} 
          // On espace beaucoup plus les départs pour que ce soit subtil
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