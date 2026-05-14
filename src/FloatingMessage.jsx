import { motion } from 'framer-motion';

const FloatingMessage = ({ text, delay }) => {
  const isMobile = window.innerWidth < 600;
  // On réduit un peu la zone X pour éviter que le texte ne colle trop aux bords sur mobile
  const randomX = Math.random() * (isMobile ? 70 : 80) + (isMobile ? 15 : 10); 
  const randomY = Math.random() * 50 + 15; // Un peu plus haut sur l'écran

  const fontSize = isMobile ? '1.1rem' : '1.5rem'; // Légèrement agrandi pour la lisibilité

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0, 1, 1, 0], 
        y: [0, -60], 
        scale: [0.9, 1.1, 1.1, 0.9]
      }}
      transition={{ 
        delay: delay, 
        duration: 9, 
        repeat: Infinity,
        repeatDelay: Math.random() * 5 + 2,
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        top: `${randomY}%`,
        left: `${randomX}%`,
        transform: 'translate(-50%, -50%)',
        whiteSpace: 'nowrap',
        fontFamily: "'Dancing Script', cursive",
        fontSize: fontSize,
        color: '#be185d',
        fontWeight: 'bold', // Un peu plus de poids pour passer devant les couleurs vives
        zIndex: 1000,       // VALEUR ÉLEVÉE : Passe devant les fleurs (qui ont un zIndex < 100)
        maxWidth: '85vw',
        textAlign: 'center',
        textShadow: '0px 0px 10px rgba(255, 255, 255, 0.8)', // Halo blanc pour détacher du fond
        pointerEvents: 'none'
      }}
    >
      {text}
    </motion.div>
  );
};

export default FloatingMessage;