'use client'

import { motion } from 'framer-motion'
import { Search, Filter, BarChart3, SortAsc } from 'lucide-react'
import { TaskFilter, TaskSort } from '@/types/task'

interface TaskFiltersProps {
  filter: TaskFilter
  sort: TaskSort
  search: string
  onFilterChange: (filter: TaskFilter) => void
  onSortChange: (sort: TaskSort) => void
  onSearchChange: (search: string) => void
  stats: {
    total: number
    completed: number
    active: number
  }
}

const filterOptions = [
  { value: 'all', label: 'All Tasks', icon: BarChart3 },
  { value: 'active', label: 'Active', icon: Filter },
  { value: 'completed', label: 'Done', icon: BarChart3 }
] as const

const sortOptions = [
  { value: 'date', label: 'Date Created' },
  { value: 'title', label: 'Alphabetical' },
  { value: 'priority', label: 'Priority Level' }
] as const

export default function TaskFilters({
  filter,
  sort,
  search,
  onFilterChange,
  onSortChange,
  onSearchChange,
  stats
}: TaskFiltersProps) {
  const completionPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search your tasks..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/30 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200 shadow-sm"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-600/5 pointer-events-none" />
        </div>
      </motion.div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Filter Buttons */}
        <motion.div 
          className="flex space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filterOptions.map((option, index) => {
            const IconComponent = option.icon
            const isActive = filter === option.value
            const count = option.value === 'all' ? stats.total : 
                         option.value === 'active' ? stats.active : stats.completed
            
            return (
              <motion.button
                key={option.value}
                onClick={() => onFilterChange(option.value as TaskFilter)}
                className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <IconComponent className="w-4 h-4" />
                <span>{option.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {count}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20"
                    layoutId="filter-background"
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Sort Dropdown */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <SortAsc className="w-4 h-4" />
            <span className="text-sm font-medium">Sort by:</span>
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as TaskSort)}
              className="appearance-none bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white px-4 py-3 pr-10 rounded-xl border-0 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 shadow-sm cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-600/5 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Progress Summary */}
      {stats.total > 0 && (
        <motion.div 
          className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Progress Overview
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-white">{stats.completed}</span> of{' '}
              <span className="font-bold text-gray-900 dark:text-white">{stats.total}</span> completed
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
              </motion.div>
            </div>
            <div className="absolute right-0 -top-8">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                {Math.round(completionPercentage)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}