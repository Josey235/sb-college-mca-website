import React from 'react';
import { motion } from 'framer-motion';

import {
  pageVariants,
  pageTransition,
} from '../animations/pageVariants';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-full"
    >
      {children}
    </motion.div>
  );
}