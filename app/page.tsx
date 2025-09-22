'use client'

import { useTasks } from '@/hooks/useTasks'
import AddTaskForm from '@/components/AddTaskForm'
import TaskFilters from '@/components/TaskFilters'
import TaskList from '@/components/TaskList'

export default function Home() {
  const {
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
  } = useTasks()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            To-Do List
          </h1>
          <p className="text-lg text-gray-600">
            Stay organized and get things done
          </p>
        </header>

        <AddTaskForm onAdd={createTask} isLoading={loading} />

        <TaskFilters
          filter={filter}
          sort={sort}
          search={search}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onSearchChange={setSearch}
          stats={stats}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      </div>
    </div>
  )
}
