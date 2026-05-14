import { motion } from 'framer-motion';

const Butterfly = ({ delay }) => {
    const isMobile = window.innerWidth < 600;
  // Animation du trajet (mouvement fluide sur l'écran)
  const flightPath = {
    x: isMobile 
    ? [Math.random() * 80 + "vw", Math.random() * 20 + "vw", Math.random() * 80 + "vw"]
    : [Math.random() * 100 - 50 + "vw", Math.random() * 100 + "vw", Math.random() * 100 - 50 + "vw"],
    y: [Math.random() * 50 + "vh", Math.random() * 30 + "vh", Math.random() * 60 + "vh"],
    rotate: [0, 45, -45, 0],
  };

  return (
    <motion.div
      initial={{ x: "-10vw", y: "50vh" }}
      animate={flightPath}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      style={{ position: 'absolute', zIndex: 20, pointerEvents: 'none' }}
    >
      <div style={{ display: 'flex', gap: '2px' }}>
        {/* Aile Gauche */}
        <motion.div
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          style={{
            width: '12px', height: '15px', 
            backgroundColor: '#FF69B4', borderRadius: '50% 50% 0 50%',
            originX: 'right'
          }}
        />
        {/* Aile Droite */}
        <motion.div
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          style={{
            width: '12px', height: '15px', 
            backgroundColor: '#FFD700', borderRadius: '50% 50% 50% 0',
            originX: 'left'
          }}
        />
      </div>
    </motion.div>
  );
};

export default Butterfly;