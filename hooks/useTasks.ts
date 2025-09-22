'use client'

import { useState, useEffect, useCallback } from 'react'
import { Task, CreateTaskRequest, UpdateTaskRequest, TaskFilter, TaskSort } from '@/types/task'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [sort, setSort] = useState<TaskSort>('date')
  const [search, setSearch] = useState('')

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        filter,
        sort,
        ...(search && { search })
      })
      
      const response = await fetch(`/api/tasks?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }
      
      const data = await response.json()
      setTasks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [filter, sort, search])

  const createTask = async (taskData: CreateTaskRequest): Promise<void> => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create task')
    }

    await fetchTasks() // Refresh the list
  }

  const updateTask = async (id: string, taskData: UpdateTaskRequest): Promise<void> => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update task')
    }

    await fetchTasks() // Refresh the list
  }

  const deleteTask = async (id: string): Promise<void> => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete task')
    }

    await fetchTasks() // Refresh the list
  }

  const toggleTask = async (id: string, completed: boolean): Promise<void> => {
    await updateTask(id, { completed })
  }

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length,
  }

  return {
    tasks,
    loading,
    error,
    filter,
    sort,
    search,
    stats,
    setFilter,
    setSort,
    setSearch,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: fetchTasks,
  }
}