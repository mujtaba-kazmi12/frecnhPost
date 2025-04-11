import { motion } from "framer-motion";

type HeroImageProps = {
  className?: string;
};

export default function HeroImage({ className = "" }: HeroImageProps) {
    const floatingAnimation = {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    };

    const rotateAnimation = {
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    };

    const flowAnimation = {
      x: [0, 10, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    };

    const glowAnimation = {
      boxShadow: [
        "0 0 5px 0px rgba(56, 189, 248, 0.5)",
        "0 0 10px 2px rgba(56, 189, 248, 0.7)",
        "0 0 5px 0px rgba(56, 189, 248, 0.5)"
      ],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    };

    return (
      <div className={`relative w-full h-full min-h-[300px] rounded-lg overflow-hidden ${className}`}>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Abstract elements */}
            <motion.div 
              className="absolute top-[15%] left-[20%] w-28 h-28 rounded-lg bg-blue-500/10 backdrop-blur-md"
              initial={{ rotate: 12, opacity: 0 }}
              animate={{ rotate: 12, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              {...rotateAnimation}
            ></motion.div>
            <motion.div 
              className="absolute top-[35%] right-[15%] w-36 h-36 rounded-lg bg-cyan-500/10 backdrop-blur-md"
              initial={{ rotate: -6, opacity: 0 }}
              animate={{ rotate: -6, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              {...rotateAnimation}
            ></motion.div>
            <motion.div 
              className="absolute bottom-[20%] left-[25%] w-40 h-40 rounded-full bg-indigo-500/10 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              {...floatingAnimation}
            ></motion.div>
  
            {/* Connection lines with animated dashes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M50,150 C100,50 300,250 350,150"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <motion.path
                d="M100,50 C200,100 250,150 300,100"
                stroke="rgba(99, 102, 241, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.path
                d="M150,250 C200,200 250,200 300,250"
                stroke="rgba(14, 165, 233, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </svg>
  
            {/* Modern Cards/UI Elements */}
            <motion.div 
              className="absolute top-[16%] left-[15%] flex items-center justify-center w-14 h-16 bg-slate-800/80 backdrop-blur-lg rounded-xl border border-blue-500/20 shadow-lg shadow-blue-500/10"
              initial={{ rotate: 3, scale: 0, opacity: 0 }}
              animate={{ rotate: 3, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
              whileHover={{ 
                scale: 1.1,
                rotate: 8,
                borderColor: "rgba(59, 130, 246, 0.5)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </motion.div>
  
            <motion.div 
              className="absolute top-[38%] right-[22%] flex items-center justify-center w-14 h-16 bg-slate-800/80 backdrop-blur-lg rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/10"
              initial={{ rotate: 12, scale: 0, opacity: 0 }}
              animate={{ rotate: 12, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 1 }}
              whileHover={{ 
                scale: 1.1,
                rotate: 18,
                borderColor: "rgba(6, 182, 212, 0.5)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-cyan-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </motion.div>
  
            <motion.div 
              className="absolute bottom-[23%] left-[30%] flex items-center justify-center w-14 h-16 bg-slate-800/80 backdrop-blur-lg rounded-xl border border-indigo-500/20 shadow-lg shadow-indigo-500/10"
              initial={{ rotate: -6, scale: 0, opacity: 0 }}
              animate={{ rotate: -6, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 1.2 }}
              whileHover={{ 
                scale: 1.1,
                rotate: -12,
                borderColor: "rgba(99, 102, 241, 0.5)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-indigo-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </motion.div>
  
            {/* Glowing nodes */}
            <motion.div 
              className="absolute top-[18%] right-[35%] w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"
              animate={glowAnimation}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            ></motion.div>
            <motion.div 
              className="absolute top-[60%] left-[20%] w-4 h-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"
              animate={glowAnimation}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-[25%] right-[25%] w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"
              animate={glowAnimation}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            ></motion.div>
            
            {/* Data flow animations */}
            <motion.div 
              className="absolute top-[30%] left-[40%] h-1 w-16 bg-gradient-to-r from-blue-500 to-transparent rounded-full"
              animate={flowAnimation}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
            ></motion.div>
            <motion.div 
              className="absolute top-[50%] right-[35%] h-1 w-20 bg-gradient-to-l from-cyan-500 to-transparent rounded-full"
              animate={flowAnimation}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
            ></motion.div>
          </div>
        </motion.div>
  
        {/* Overlay text */}
        <motion.div 
          className="absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur-md p-3 rounded-lg border border-blue-500/20 shadow-lg shadow-blue-500/10 z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs font-medium text-blue-400">Connect & Exchange</p>
        </motion.div>
        
        {/* Floating stats card */}
        <motion.div 
          className="absolute top-6 right-6 bg-slate-800/80 backdrop-blur-md px-3 py-2 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 z-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          {...floatingAnimation}
        >
          <div className="flex items-center space-x-2">
            <motion.div 
              className="h-2 w-2 rounded-full bg-cyan-400"
              animate={{ 
                backgroundColor: [
                  "rgb(34, 211, 238)", // cyan-400
                  "rgb(6, 182, 212)",  // cyan-500
                  "rgb(34, 211, 238)"  // cyan-400
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <p className="text-xs font-medium text-cyan-400">Live Exchanges</p>
          </div>
          <p className="text-lg font-bold text-white mt-1">2.4k+</p>
        </motion.div>
      </div>
    )
  }
  
  