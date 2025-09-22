# To-Do List App

A full-featured, modern to-do list application built with Next.js, TypeScript, Prisma, and Tailwind CSS. Features real-time task management with GitHub sync and deployment to Vercel.

## Features

- ✅ **Create, Edit, Delete Tasks** - Full CRUD operations for task management
- 🏷️ **Priority Levels** - Organize tasks with Low, Medium, and High priority
- 🔍 **Search & Filter** - Find tasks by keyword and filter by status (All/Active/Completed)
- 📊 **Progress Tracking** - Visual progress bar and completion statistics
- 🎯 **Sorting Options** - Sort by date, title, or priority
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🚀 **Real-time Updates** - Instant UI updates for all operations
- 💾 **Data Persistence** - SQLite database with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Storage**: In-memory storage (demo-ready, easily upgradeable to database)
- **Deployment**: Vercel-optimized
- **Styling**: Tailwind CSS with responsive design

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo-list
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note**: This version uses in-memory storage for demo purposes. Data resets on server restart.

## Deployment to Vercel

### Method 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push to main branch

### Method 2: Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Follow the prompts to configure your deployment

### Environment Variables

No environment variables are required for this demo version.

For production database integration, you would add:
```
DATABASE_URL="your-database-connection-string"
```

## API Routes

The application provides a RESTful API:

- `GET /api/tasks` - Get all tasks (with optional filtering and sorting)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Get a specific task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

### Query Parameters for GET /api/tasks:

- `filter`: 'all' | 'active' | 'completed'
- `sort`: 'date' | 'title' | 'priority'
- `search`: string (searches title and description)

## Project Structure

```
├── app/
│   ├── api/tasks/          # API routes for task operations
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── components/
│   ├── AddTaskForm.tsx     # Form for creating new tasks
│   ├── TaskFilters.tsx     # Filtering and search controls
│   ├── TaskItem.tsx        # Individual task display and editing
│   └── TaskList.tsx        # Task list container
├── hooks/
│   └── useTasks.ts         # Custom hook for task management
├── lib/
│   └── prisma.ts           # Prisma client configuration
├── prisma/
│   └── schema.prisma       # Database schema
├── types/
│   └── task.ts             # TypeScript type definitions
└── public/                 # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Open a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
