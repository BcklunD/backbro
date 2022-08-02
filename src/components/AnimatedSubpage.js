import { motion } from 'framer-motion/dist/framer-motion';

const animations = {
    initial: {opacity: 0, scale: .8},
    animate: {opacity: 1, scale: 1},
    exit: {}
}

const AnimatedSubpage = ({children}) => {
  return (
    <motion.div variants={animations} initial="initial" animate="animate" exit="exit" transition={{ duration: .4 }}>
        {children}
    </motion.div>
  )
}

export default AnimatedSubpage