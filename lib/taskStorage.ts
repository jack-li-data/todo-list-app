import { Task, CreateTaskRequest, UpdateTaskRequest } from '@/types/task'
import { Priority } from '@prisma/client'

// In-memory storage for demo purposes
// In production, replace this with a proper database
const tasks: Task[] = [
  {
    id: '1',
    title: 'Welcome to your Todo App!',
    description: 'This is a sample task. You can edit or delete it.',
    completed: false,
    priority: Priority.MEDIUM,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

let nextId = 2

export class TaskStorage {
  static async findMany(options: {
    where?: Record<string, unknown>
    orderBy?: Record<string, string>
  }): Promise<Task[]> {
    let filteredTasks = [...tasks]

    // Apply where filter
    if (options.where) {
      if (options.where.completed !== undefined) {
        filteredTasks = filteredTasks.filter(task => task.completed === options.where?.completed)
      }
      
      if (options.where.OR) {
        const searchTerms = options.where.OR as Array<Record<string, Record<string, string>>>
        filteredTasks = filteredTasks.filter(task => {
          return searchTerms.some((term) => {
            if (term.title) {
              return task.title.toLowerCase().includes(term.title.contains.toLowerCase())
            }
            if (term.description) {
              return task.description?.toLowerCase().includes(term.description.contains.toLowerCase())
            }
            return false
          })
        })
      }
    }

    // Apply orderBy
    if (options.orderBy) {
      const sortKey = Object.keys(options.orderBy)[0] as keyof Task
      const sortOrder = options.orderBy[sortKey]
      
      filteredTasks.sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        
        if (sortKey === 'priority') {
          const priorityOrder = { [Priority.HIGH]: 3, [Priority.MEDIUM]: 2, [Priority.LOW]: 1 }
          const aNum = priorityOrder[aVal as Priority]
          const bNum = priorityOrder[bVal as Priority]
          return sortOrder === 'desc' ? bNum - aNum : aNum - bNum
        }
        
        if (aVal != null && bVal != null) {
          if (aVal < bVal) return sortOrder === 'desc' ? 1 : -1
          if (aVal > bVal) return sortOrder === 'desc' ? -1 : 1
        }
        return 0
      })
    }

    return filteredTasks
  }

  static async findUnique(options: { where: { id: string } }): Promise<Task | null> {
    return tasks.find(task => task.id === options.where.id) || null
  }

  static async create(options: { data: CreateTaskRequest }): Promise<Task> {
    const newTask: Task = {
      id: nextId.toString(),
      title: options.data.title,
      description: options.data.description || null,
      completed: false,
      priority: options.data.priority || Priority.MEDIUM,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    tasks.push(newTask)
    nextId++
    
    return newTask
  }

  static async update(options: { 
    where: { id: string }
    data: Record<string, unknown>
  }): Promise<Task | null> {
    const taskIndex = tasks.findIndex(task => task.id === options.where.id)
    
    if (taskIndex === -1) return null
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...options.data,
      updatedAt: new Date()
    }
    
    tasks[taskIndex] = updatedTask
    return updatedTask
  }

  static async delete(options: { where: { id: string } }): Promise<Task | null> {
    const taskIndex = tasks.findIndex(task => task.id === options.where.id)
    
    if (taskIndex === -1) return null
    
    const deletedTask = tasks[taskIndex]
    tasks.splice(taskIndex, 1)
    
    return deletedTask
  }
}