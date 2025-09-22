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
      {/* Centered Tagline - Fixed Position */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
        variants={itemVariants}
      >
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed text-center max-w-2xl px-6 backdrop-blur-sm bg-white/5 dark:bg-gray-900/5 rounded-2xl py-4"
          variants={itemVariants}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Experience the future of productivity with our Tesla-inspired task management interface
        </motion.p>
      </motion.div>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section - Compact */}
        <motion.header 
          className="text-center mb-8"
          variants={itemVariants}
        >
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
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-600 dark:from-white dark:via-blue-200 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
              Nexus Tasks
            </h1>
          </motion.div>
        </motion.header>

        {/* Compact Stats Dashboard */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="glass-surface rounded-2xl p-4">
            <div className="flex items-center gap-6">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.total}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.completed}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Done</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.active}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Active</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{completionRate}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Centered Layout */}
        <div className="min-h-screen flex flex-col justify-center items-center space-y-8 pt-20 pb-20">
          {/* Add Task Section */}
          <motion.div 
            className="w-full max-w-2xl"
            variants={itemVariants}
          >
            <div className="glass-surface rounded-3xl p-8">
              <motion.h2 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
                layoutId="add-task-header"
              >
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                Create Task
              </motion.h2>
              <AddTaskForm onAdd={createTask} isLoading={loading} />
            </div>
          </motion.div>

          {/* Filters Section */}
          <motion.div 
            className="w-full max-w-2xl"
            variants={itemVariants}
          >
            <div className="glass-surface rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                Filters & Search
              </h3>
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
          </motion.div>

          {/* Task List Section */}
          <motion.div 
            className="w-full max-w-2xl"
            variants={itemVariants}
          >
            <div className="glass-surface rounded-3xl p-8">
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
        </div>

        {/* Footer - Minimal */}
        <motion.footer 
          className="fixed bottom-4 right-4 z-20"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-400 dark:text-gray-600 text-xs font-medium bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm rounded-lg px-3 py-1">
            Nexus Productivity
          </p>
        </motion.footer>
      </div>
    </motion.div>
  )
}
