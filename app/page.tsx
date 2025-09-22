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
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.header 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <Sparkles className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              <motion.div
                className="absolute inset-0 w-10 h-10 text-blue-400 dark:text-blue-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-10 h-10" />
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-600 dark:from-white dark:via-blue-200 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
              Nexus Tasks
            </h1>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed"
            variants={itemVariants}
          >
            Experience the future of productivity with our Tesla-inspired task management interface
          </motion.p>
        </motion.header>

        {/* Stats Dashboard */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          variants={itemVariants}
        >
          <motion.div 
            className="glass-surface rounded-2xl p-6 text-center group overflow-hidden relative"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 mb-4 group-hover:shadow-lg transition-shadow">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.total}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Total Tasks</div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-surface rounded-2xl p-6 text-center group overflow-hidden relative"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 mb-4 group-hover:shadow-lg transition-shadow">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.completed}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Completed</div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-surface rounded-2xl p-6 text-center group overflow-hidden relative"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 mb-4 group-hover:shadow-lg transition-shadow">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.active}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Active</div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-surface rounded-2xl p-6 text-center group overflow-hidden relative"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 mb-4 group-hover:shadow-lg transition-shadow">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{completionRate}%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Progress</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Task Form */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <div className="glass-surface rounded-3xl p-8 sticky top-8">
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

          {/* Task Management */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            variants={itemVariants}
          >
            {/* Filters */}
            <div className="glass-surface rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
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

            {/* Task List */}
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

        {/* Footer */}
        <motion.footer 
          className="text-center mt-16 pb-8"
          variants={itemVariants}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Crafted with precision for productivity enthusiasts
          </p>
        </motion.footer>
      </div>
    </motion.div>
  )
}
