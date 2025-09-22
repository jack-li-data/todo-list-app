import { Priority } from '@prisma/client'

export interface Task {
  id: string
  title: string
  description?: string | null
  completed: boolean
  priority: Priority
  createdAt: Date
  updatedAt: Date
}

export interface CreateTaskRequest {
  title: string
  description?: string
  priority?: Priority
}

export interface UpdateTaskRequest {
  title?: string
  description?: string
  completed?: boolean
  priority?: Priority
}

export type TaskFilter = 'all' | 'active' | 'completed'
export type TaskSort = 'date' | 'priority' | 'title'