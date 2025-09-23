'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Sparkles, Zap, Clock, TrendingUp } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'
import AddTaskForm from '@/components/AddTaskForm'
import TaskFilters from '@/components/TaskFilters'
import TaskList from '@/components/TaskList'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
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
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

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

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
  <div className="w-full mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 text-center">
          {/* Centered main column: Header + Stats + Sections + Footer */}
            {/* Header */}
            <motion.header 
              className="text-center"
              variants={itemVariants}
            >
              <div className="glass-surface rounded-3xl p-8 w-full">
                <motion.div
                  className="inline-flex items-center gap-3 mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    <motion.div
                      className="absolute inset-0 w-8 h-8 text-blue-400 dark:text-blue-300"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-600 dark:from-white dark:via-blue-200 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
                    Nexus Tasks
                  </h1>
                </motion.div>
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed text-center"
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Experience the future of productivity with our Tesla-inspired task management interface
                </motion.p>
              </div>
            </motion.header>
            {/* Stats Row */}
            <motion.div 
              className="w-full"
              variants={itemVariants}
            >
              <div className="glass-surface rounded-2xl p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Tasks</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Completed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{completionRate}%</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Progress</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main sections */}
            {/* Create Task */}
            <motion.div 
              className="w-full"
              variants={itemVariants}
            >
              <div className="glass-surface rounded-3xl p-8 w-full">
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
                  layoutId="add-task-header"
                >
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  Create Task
                </motion.h2>
                <div className="w-full">
                  <AddTaskForm onAdd={createTask} isLoading={loading} />
                </div>
              </div>
            </motion.div>

            {/* Filters & Search */}
            <motion.div 
              className="w-full"
              variants={itemVariants}
            >
              <div className="glass-surface rounded-2xl p-6 w-full">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  Filters & Search
                </h3>
                <div className="w-full">
                  <TaskFilters
                    filter={filter}
                    sort={sort}
                    search={search}
                    onFilterChange={setFilter}
                    onSortChange={setSort}
                    onSearchChange={setSearch}
                    stats={stats}
                  />
                </div>
              </div>
            </motion.div>

            {/* Task List */}
            <motion.div 
              className="w-full"
              variants={itemVariants}
            >
              <div className="glass-surface rounded-3xl p-8 w-full">
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
                  layoutId="task-list-header"
                >
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                  Your Tasks
                </motion.h2>
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center py-16"
                    >
                      <motion.div
                        className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="tasks"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full"
                    >
                      <TaskList
                        tasks={tasks}
                        loading={loading}
                        error={error}
                        onUpdate={updateTask}
                        onDelete={deleteTask}
                        onToggle={toggleTask}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            {/* Footer - Minimal */}
            <motion.footer 
              className="flex justify-center"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg px-3 py-1">
                Nexus Productivity
              </p>
            </motion.footer>
          </div>
    </motion.div>
  )
}
