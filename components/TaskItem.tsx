'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Trash2, Check, X, Circle, AlertCircle, Zap } from 'lucide-react'
import { Task, UpdateTaskRequest, Priority } from '@/types/task'

interface TaskItemProps {
  task: Task
  onUpdate: (id: string, data: UpdateTaskRequest) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onToggle: (id: string, completed: boolean) => Promise<void>
}

const priorityConfig = {
  [Priority.LOW]: {
    label: 'Low',
    icon: Circle,
    color: 'text-green-600',
    bg: 'bg-green-50 border-green-200',
    gradient: 'from-green-400 to-green-600'
  },
  [Priority.MEDIUM]: {
    label: 'Medium',
    icon: AlertCircle,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 border-yellow-200',
    gradient: 'from-yellow-400 to-orange-500'
  },
  [Priority.HIGH]: {
    label: 'High',
    icon: Zap,
    color: 'text-red-600',
    bg: 'bg-red-50 border-red-200',
    gradient: 'from-red-400 to-red-600'
  }
}

export default function TaskItem({ task, onUpdate, onDelete, onToggle }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')
  const [editPriority, setEditPriority] = useState(task.priority)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (!editTitle.trim()) return

    try {
      setIsLoading(true)
      await onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update task:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setEditPriority(task.priority)
    setIsEditing(false)
  }

  const handleToggle = async () => {
    try {
      setIsLoading(true)
      await onToggle(task.id, !task.completed)
    } catch (error) {
      console.error('Failed to toggle task:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setIsLoading(true)
        await onDelete(task.id)
      } catch (error) {
        console.error('Failed to delete task:', error)
        setIsLoading(false)
      }
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const priorityInfo = priorityConfig[task.priority]
  const PriorityIcon = priorityInfo.icon

  if (isEditing) {
    return (
      <motion.div 
        className="glass-surface rounded-2xl p-6 border-l-4 border-blue-500"
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="space-y-6">
          {/* Edit Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
              disabled={isLoading}
              placeholder="Enter task title..."
            />
          </div>

          {/* Edit Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 resize-none"
              rows={3}
              disabled={isLoading}
              placeholder="Add description..."
            />
          </div>

          {/* Edit Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(priorityConfig).map(([value, config]) => {
                const IconComponent = config.icon
                const isSelected = editPriority === value
                
                return (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => setEditPriority(value as Priority)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      isSelected 
                        ? `${config.bg} border-current ${config.color}` 
                        : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <IconComponent className={`w-5 h-5 ${isSelected ? config.color : 'text-gray-400'}`} />
                      <span className={`text-xs font-medium ${isSelected ? config.color : 'text-gray-600'}`}>
                        {config.label}
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <motion.button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <X className="w-4 h-4 mr-2 inline" />
              Cancel
            </motion.button>
            <motion.button
              onClick={handleSave}
              disabled={!editTitle.trim() || isLoading}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Check className="w-4 h-4 mr-2 inline" />
              {isLoading ? 'Saving...' : 'Save'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={`glass-surface rounded-2xl p-6 transition-all duration-200 ${
        task.completed ? 'opacity-75' : ''
      }`}
      layout
      whileHover={{ scale: 1.01, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <motion.button
          onClick={handleToggle}
          disabled={isLoading}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="space-y-4">
            {/* Title and Actions Row */}
            <div className="flex items-start justify-between">
              <h3 className={`text-lg font-semibold ${
                task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
              }`}>
                {task.title}
              </h3>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                <motion.button
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                  className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Edit task"
                >
                  <Edit2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <p className={`text-sm ${
                task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {task.description}
              </p>
            )}

            {/* Priority and Metadata Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${priorityInfo.bg} ${priorityInfo.color}`}>
                  <PriorityIcon className="w-3 h-3 mr-1" />
                  {priorityInfo.label} Priority
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>Created: {formatDate(task.createdAt)}</span>
                {task.updatedAt !== task.createdAt && (
                  <span>Updated: {formatDate(task.updatedAt)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}