'use client'

import { useState } from 'react'
import { Task, UpdateTaskRequest, Priority } from '@/types/task'

interface TaskItemProps {
  task: Task
  onUpdate: (id: string, data: UpdateTaskRequest) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onToggle: (id: string, completed: boolean) => Promise<void>
}

export default function TaskItem({ task, onUpdate, onDelete, onToggle }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')
  const [editPriority, setEditPriority] = useState(task.priority)
  const [isLoading, setIsLoading] = useState(false)

  const priorityColors = {
    [Priority.LOW]: 'bg-green-100 text-green-800 border-green-300',
    [Priority.MEDIUM]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    [Priority.HIGH]: 'bg-red-100 text-red-800 border-red-300'
  }

  const priorityLabels = {
    [Priority.LOW]: 'Low',
    [Priority.MEDIUM]: 'Medium',
    [Priority.HIGH]: 'High'
  }

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

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value={Priority.LOW}>Low</option>
            <option value={Priority.MEDIUM}>Medium</option>
            <option value={Priority.HIGH}>High</option>
          </select>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={!editTitle.trim() || isLoading}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
      task.completed ? 'border-green-500 opacity-75' : 'border-gray-300'
    } transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            disabled={isLoading}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div className="flex-1">
            <h3 className={`font-semibold ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center space-x-3 mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                priorityColors[task.priority]
              }`}>
                {priorityLabels[task.priority]}
              </span>
              <span className="text-xs text-gray-500">
                Created: {formatDate(task.createdAt)}
              </span>
              {task.updatedAt !== task.createdAt && (
                <span className="text-xs text-gray-500">
                  Updated: {formatDate(task.updatedAt)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="text-blue-600 hover:text-blue-700 disabled:opacity-50 p-1"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-red-600 hover:text-red-700 disabled:opacity-50 p-1"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}