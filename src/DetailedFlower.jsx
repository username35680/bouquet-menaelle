import { motion } from 'framer-motion';

const DetailedFlower = ({ color, delay, xOffset, height, curve }) => {
  // Animation du vent : balancement plus ample pour les grandes fleurs
  const windTransition = {
    rotate: [ -3, 3, -3 ],
    transition: {
      duration: 5 + Math.random() * 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // On détermine si on est sur mobile pour ajuster la taille de la tête de la fleur
  const isSmallScreen = window.innerWidth < 600;

  return (
    <motion.svg
      // On utilise une viewBox qui s'adapte à la hauteur demandée (ex: 70vh)
      // On garde une largeur de 150 pour que la fleur ne soit pas écrasée
      viewBox={`0 0 150 500`} 
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        bottom: 0, // Collé au bas de l'écran
        left: `calc(50% + ${xOffset}px)`,
        width: isSmallScreen ? '100px' : '180px',
        height: height, // Reçoit par ex: "60vh"
        overflow: 'visible',
        transformOrigin: 'bottom center',
        zIndex: Math.floor(parseFloat(height)), // Les plus hautes passent devant
        filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.1))'
      }}
      animate={windTransition}
    >
      {/* La Tige : elle part du bas (500) jusqu'au sommet du SVG (80) */}
      <motion.path
        d={`M 75 500 Q ${75 + curve} 250 75 80`}
        fill="transparent"
        stroke="#2d5a27"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 2.5, ease: "easeOut" }}
      />

      {/* Feuille gauche */}
      <motion.path
        d="M 75 350 Q 40 330 50 300 Q 75 320 75 350"
        fill="#3a6320"
        initial={{ scale: 0 }}
        animate={{ scale: 1.5 }}
        transition={{ delay: delay + 1.2 }}
      />

      {/* Feuille droite */}
      <motion.path
        d="M 75 250 Q 110 230 100 200 Q 75 220 75 250"
        fill="#4d7c0f"
        initial={{ scale: 0 }}
        animate={{ scale: 1.5 }}
        transition={{ delay: delay + 1.4 }}
      />

      {/* La Tête de la Fleur (positionnée au bout de la tige à y=80) */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: isSmallScreen ? 1.2 : 1.8 }}
        transition={{ 
          delay: delay + 2, 
          type: 'spring', 
          stiffness: 100, 
          damping: 10 
        }}
        style={{ originX: '75px', originY: '80px' }}
      >
        {/* Pétales de dessous (plus larges pour donner du volume) */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={`back-${i}`}
            cx="75" cy="50" rx="20" ry="35"
            fill={color}
            style={{ 
                transform: `rotate(${angle}deg)`, 
                transformOrigin: '75px 80px', 
                opacity: 0.6,
                filter: 'brightness(0.9)'
            }}
          />
        ))}

        {/* Pétales de dessus */}
        {[30, 90, 150, 210, 270, 330].map((angle, i) => (
          <ellipse
            key={`front-${i}`}
            cx="75" cy="55" rx="18" ry="30"
            fill={color}
            style={{ 
                transform: `rotate(${angle}deg)`, 
                transformOrigin: '75px 80px' 
            }}
          />
        ))}

        {/* Cœur de la fleur plus détaillé */}
        <circle cx="75" cy="80" r="14" fill="#facc15" />
        <circle cx="75" cy="80" r="8" fill="#eab308" />
        {/* Petits points de pollen */}
        {[0, 90, 180, 270].map((angle) => (
            <circle 
                key={angle}
                cx={75 + Math.cos(angle) * 5} 
                cy={80 + Math.sin(angle) * 5} 
                r="1.5" 
                fill="#78350f" 
                opacity="0.6"
            />
        ))}
      </motion.g>
    </motion.svg>
  );
};

export default DetailedFlower;