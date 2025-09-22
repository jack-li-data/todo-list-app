import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateTaskRequest, TaskFilter, TaskSort } from '@/types/task'
import { Priority } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = (searchParams.get('filter') as TaskFilter) || 'all'
    const sort = (searchParams.get('sort') as TaskSort) || 'date'
    const search = searchParams.get('search') || ''

    // Build where clause based on filter
    const where: Record<string, unknown> = {}
    
    if (filter === 'active') {
      where.completed = false
    } else if (filter === 'completed') {
      where.completed = true
    }

    // Add search filter if provided
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Build order by clause based on sort
    const orderBy: Record<string, string> = {}
    
    switch (sort) {
      case 'title':
        orderBy.title = 'asc'
        break
      case 'priority':
        orderBy.priority = 'desc'
        break
      case 'date':
      default:
        orderBy.createdAt = 'desc'
        break
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateTaskRequest = await request.json()
    
    if (!body.title || body.title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const task = await prisma.task.create({
      data: {
        title: body.title.trim(),
        description: body.description?.trim() || null,
        priority: body.priority || Priority.MEDIUM
      }
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}