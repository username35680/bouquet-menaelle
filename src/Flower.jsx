import { motion } from 'framer-motion';

const Flower = ({ color, delay, xOffset, height }) => {
  return (
    <motion.div 
      style={{ 
        position: 'absolute', 
        bottom: 20, 
        left: `calc(50% + ${xOffset}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* La Tige */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: height }}
        transition={{ delay, duration: 2, ease: "easeOut" }}
        style={{
          width: '6px',
          backgroundColor: '#4d7c0f',
          borderRadius: '4px 4px 0 0',
          originY: 1
        }}
      />

      {/* La Fleur (Pétales + Coeur) */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 1.8, type: 'spring', stiffness: 100 }}
        style={{ position: 'absolute', top: -15 }}
      >
        {/* Pétales (5 cercles disposés en rond) */}
        {[0, 72, 144, 216, 288].map((angle) => (
          <div
            key={angle}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              backgroundColor: color,
              borderRadius: '50%',
              transform: `rotate(${angle}deg) translate(25px)`,
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
            }}
          />
        ))}
        {/* Cœur de la fleur */}
        <div style={{
          width: '35px',
          height: '35px',
          backgroundColor: '#facc15',
          borderRadius: '50%',
          position: 'relative',
          zIndex: 5,
          border: '2px solid #eab308'
        }} />
      </motion.div>
    </motion.div>
  );
};

export default Flower;