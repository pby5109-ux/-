/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface Rose {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [isYes, setIsYes] = useState(false);
  const [roses, setRoses] = useState<Rose[]>([]);

  // Generate roses for the rain effect
  useEffect(() => {
    if (isYes) {
      const newRoses = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * 360,
      }));
      setRoses(newRoses);
    }
  }, [isYes]);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsYes(true);
  };

  // Calculate scales based on No button clicks
  // Purple grows, Blue shrinks
  const yesScale = Math.pow(1.5, noCount);
  const noScale = Math.max(0.1, Math.pow(0.5, noCount));
  const isNoVisible = noCount < 4 && !isYes;

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center font-sans">
      {/* Rose Rain Effect */}
      <AnimatePresence>
        {isYes && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {roses.map((rose) => (
              <motion.div
                key={rose.id}
                initial={{ y: -100, x: `${rose.x}vw`, opacity: 0, rotate: 0 }}
                animate={{ 
                  y: '110vh', 
                  opacity: [0, 1, 1, 0],
                  rotate: rose.rotation + 360 
                }}
                transition={{
                  duration: rose.duration,
                  delay: rose.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute text-red-500"
                style={{ fontSize: rose.size }}
              >
                🌹
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="z-20 flex flex-col items-center gap-12">
        {!isYes ? (
          <>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-800 text-center px-4"
            >
              Would you say yes?
            </motion.h1>
            
            <div className="flex flex-wrap items-center justify-center gap-8 min-h-[300px]">
              {/* YES Button (Purple) */}
              <motion.button
                id="yes-button"
                animate={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.1 }}
                whileTap={{ scale: yesScale * 0.9 }}
                onClick={handleYesClick}
                className="bg-purple-600 text-white rounded-full w-24 h-24 flex items-center justify-center text-xl font-bold shadow-lg cursor-pointer transition-colors hover:bg-purple-700"
              >
                Yes
              </motion.button>

              {/* NO Button (Blue) */}
              {isNoVisible && (
                <motion.button
                  id="no-button"
                  animate={{ scale: noScale }}
                  whileHover={{ scale: noScale * 1.1 }}
                  whileTap={{ scale: noScale * 0.9 }}
                  onClick={handleNoClick}
                  className="bg-blue-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-xl font-bold shadow-lg cursor-pointer transition-colors hover:bg-blue-600"
                >
                  No
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="text-8xl md:text-9xl mb-4">💐</div>
            <h2 className="text-5xl md:text-7xl font-bold text-purple-600 text-center drop-shadow-sm">
              I Love You!
            </h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-16 h-16 text-red-500 fill-current" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-4 text-gray-300 text-sm select-none">
        Click the buttons to see what happens
      </div>
    </div>
  );
}
