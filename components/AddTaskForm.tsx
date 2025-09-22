'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Zap, AlertCircle, Circle } from 'lucide-react'
import { Priority } from '@/types/task'
import { CreateTaskRequest } from '@/types/task'

interface AddTaskFormProps {
  onAdd: (task: CreateTaskRequest) => Promise<void>
  isLoading?: boolean
}

const priorityConfig = {
  [Priority.LOW]: {
    label: 'Low Priority',
    icon: Circle,
    color: 'text-green-500',
    bg: 'bg-green-50 border-green-200',
    gradient: 'from-green-400 to-green-600'
  },
  [Priority.MEDIUM]: {
    label: 'Medium Priority',
    icon: AlertCircle,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 border-yellow-200',
    gradient: 'from-yellow-400 to-orange-500'
  },
  [Priority.HIGH]: {
    label: 'High Priority',
    icon: Zap,
    color: 'text-red-500',
    bg: 'bg-red-50 border-red-200',
    gradient: 'from-red-400 to-red-600'
  }
}

export default function AddTaskForm({ onAdd, isLoading = false }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return

    try {
      setIsSubmitting(true)
      await onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        priority
      })
      
      // Reset form
      setTitle('')
      setDescription('')
      setPriority(Priority.MEDIUM)
    } catch (error) {
      console.error('Failed to add task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        {/* Title Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Task Title *
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-4 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/30 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200 shadow-sm"
              disabled={isSubmitting || isLoading}
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-600/5 pointer-events-none" />
          </div>
        </motion.div>

        {/* Description Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Description (Optional)
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={3}
              className="w-full px-4 py-4 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/30 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200 shadow-sm resize-none"
              disabled={isSubmitting || isLoading}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-600/5 pointer-events-none" />
          </div>
        </motion.div>

        {/* Priority Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Priority Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(priorityConfig).map(([value, config]) => {
              const IconComponent = config.icon
              const isSelected = priority === value
              
              return (
                <motion.button
                  key={value}
                  type="button"
                  onClick={() => setPriority(value as Priority)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 group ${
                    isSelected 
                      ? `${config.bg} border-current ${config.color} shadow-md scale-105` 
                      : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  disabled={isSubmitting || isLoading}
                  whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <IconComponent className={`w-6 h-6 ${isSelected ? config.color : 'text-gray-400'}`} />
                    <span className={`text-xs font-medium ${isSelected ? config.color : 'text-gray-600 dark:text-gray-400'}`}>
                      {config.label.split(' ')[0]}
                    </span>
                  </div>
                  {isSelected && (
                    <motion.div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${config.gradient} opacity-10`}
                      layoutId="priority-background"
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            type="submit"
            disabled={!title.trim() || isSubmitting || isLoading}
            className="tesla-button w-full py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            whileHover={{ scale: title.trim() && !isSubmitting && !isLoading ? 1.02 : 1 }}
            whileTap={{ scale: title.trim() && !isSubmitting && !isLoading ? 0.98 : 1 }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Creating Task...</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Create Task</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.form>
  )
}