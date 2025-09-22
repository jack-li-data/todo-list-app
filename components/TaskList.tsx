'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { AlertTriangle, Sparkles, CheckCircle } from 'lucide-react'
import { Task, UpdateTaskRequest } from '@/types/task'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  error: string | null
  onUpdate: (id: string, data: UpdateTaskRequest) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onToggle: (id: string, completed: boolean) => Promise<void>
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export default function TaskList({
  tasks,
  loading,
  error,
  onUpdate,
  onDelete,
  onToggle
}: TaskListProps) {
  if (loading) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-16 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Loading Tasks</h3>
          <p className="text-gray-600 dark:text-gray-400">Syncing your productivity data...</p>
        </motion.div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div 
        className="glass-surface rounded-2xl p-8 border-l-4 border-red-500"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Unable to Load Tasks
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {error}
            </p>
            <motion.button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  if (tasks.length === 0) {
    return (
      <motion.div 
        className="text-center py-16 space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative inline-block"
          animate={{ 
            rotate: [0, 10, -10, 0],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Canvas Awaits
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            Start your productivity journey by creating your first task. Every great achievement begins with a single step.
          </p>
        </div>

        <motion.div
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          ↑ Create your first task above
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            variants={itemVariants}
            layout
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={index}
          >
            <TaskItem
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}