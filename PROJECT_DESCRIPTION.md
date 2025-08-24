# UpGuard - Website Monitoring Platform

## Project Overview
A distributed website monitoring platform built with microservices architecture, featuring real-time job processing with Redis Streams, automated monitoring workers, and comprehensive uptime tracking capabilities.

## Key Technologies & Architecture
- **Backend**: Node.js/Express.js with TypeScript, JWT authentication
- **Frontend**: Next.js 15 with React 19, Tailwind CSS, responsive design
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **Distributed Processing**: Redis Streams with consumer groups for scalable job distribution
- **Containerization**: Docker with multi-stage builds and optimized images
- **Orchestration**: Docker Compose for multi-service deployment
- **Monorepo**: Turborepo for efficient build and development workflows

## Distributed Architecture Deep Dive

### 🏗️ **Microservices Design Pattern**
The application follows a distributed microservices architecture with clear separation of concerns:

**Service Communication Flow:**
```
Frontend → API → Database (PostgreSQL)
    ↓
Pusher → Redis Streams → Worker Pool → Database
```

### ⚡ **Real-Time Job Processing System**

#### **Pusher Service (Job Scheduler)**
- **Automated Discovery**: Scans PostgreSQL every 30 seconds for all registered websites
- **Bulk Job Creation**: Uses `xAddBulk()` to efficiently queue multiple monitoring jobs
- **Stream Management**: Publishes jobs to Redis Stream `betteruptime:website`
- **Fault Tolerance**: Graceful error handling with automatic retry mechanisms
- **Scalable Design**: Stateless service that can be horizontally scaled

#### **Worker Service (Distributed Processors)**
- **Consumer Groups**: Implements Redis consumer groups for load balancing across multiple workers
- **Concurrent Processing**: Each worker processes up to 10 jobs simultaneously with Promise.all()
- **HTTP Monitoring**: Performs actual website health checks with 30-second timeouts
- **Performance Tracking**: Measures response times and captures HTTP status codes
- **Acknowledgment System**: Uses `xAckBulk()` for reliable message processing
- **Regional Distribution**: Configurable `REGION_ID` and `WORKER_ID` for geographic scaling

#### **Redis Streams Implementation**
- **Stream Key**: `betteruptime:website` for centralized job distribution
- **Consumer Groups**: Region-based groups (e.g., `f5a13f6c-8e91-42b8-9c0e-07b4567a98e0`)
- **Message Format**: Structured job data with `{url, id}` payload
- **Blocking Reads**: `xReadGroup` with 5-second blocking for efficient polling
- **Automatic Scaling**: Multiple workers can join the same consumer group
- **Persistence**: Stream persistence ensures no job loss during service restarts

### 🔄 **Real-Time Data Flow**
1. **Job Creation**: Pusher queries database → Creates Redis Stream entries
2. **Job Distribution**: Redis automatically distributes jobs across available workers
3. **Processing**: Workers fetch websites → Perform HTTP checks → Record results
4. **Data Persistence**: Results stored in PostgreSQL with timestamps and metrics
5. **Real-Time Updates**: Frontend polls API for live status updates

## Core Features Implemented

### 🔐 **Authentication & Security**
- JWT-based authentication system with secure token management
- User registration and login with input validation using Zod
- Protected API routes with custom middleware
- Secure password handling and session management

### 📊 **Distributed Monitoring Engine**
- **Automated Job Scheduling**: Pusher service continuously discovers and queues monitoring tasks
- **Horizontal Worker Scaling**: Multiple worker instances process jobs concurrently
- **Real-Time Processing**: Sub-30-second monitoring intervals with immediate result storage
- **Performance Analytics**: Response time tracking, uptime calculations, and trend analysis
- **Fault-Tolerant Design**: Redis Stream persistence ensures zero job loss

### 🎯 **User Interface & Experience**
- **Modern Dashboard**: Real-time status overview with live statistics
- **Website Management**: Add, view, and monitor multiple websites
- **Status Visualization**: Color-coded status indicators with timeline views
- **Responsive Design**: Mobile-first approach with dark/light mode support
- **Performance Analytics**: Response time graphs and uptime percentage tracking

## Technical Achievements

### 🐳 **Containerization & Orchestration**
- **Docker Containerization**: Multi-service Docker Compose setup with:
  - Health checks for all services
  - Dependency management with wait scripts
  - Automated database migrations and seeding
  - Init containers for dependency management
  - ConfigMaps and Secrets for configuration management
  - Horizontal Pod Autoscaling support
  - Ingress configuration for external access

### 🔄 **Distributed Systems**
- **Redis Streams Architecture**: Reliable message queuing with consumer groups for job distribution
- **Load Balancing**: Automatic job distribution across multiple worker instances
- **Message Acknowledgment**: Ensures reliable processing with `xAck` confirmation system
- **Horizontal Scaling**: Workers can be scaled independently based on monitoring load
- **Stream Persistence**: Job durability with Redis Stream persistence

### 🧪 **Testing & Quality Assurance**
- **Comprehensive Test Suite**: Unit and integration tests using Bun test framework
- **API Testing**: Complete endpoint coverage including authentication flows
- **Error Handling**: Robust error management with proper HTTP status codes
- **Type Safety**: Full TypeScript implementation across all services

### 📈 **Performance Optimizations**
- **Bulk Operations**: Efficient batch processing with `xAddBulk` and `xAckBulk`
- **Concurrent Processing**: Parallel job execution using Promise.all()
- **Connection Pooling**: Database connection management
- **Optimized Queries**: Prisma ORM with efficient database operations

## Business Impact & Scalability
- **Multi-tenant Architecture**: User isolation with secure data access
- **Real-time Notifications**: Instant alerting system for downtime detection
- **Historical Analytics**: Trend analysis and performance reporting
- **Enterprise Ready**: Production deployment with monitoring and observability

## Resume Bullet Points

### For Software Engineer/Full-Stack Developer Role:
• **Architected distributed monitoring platform** using microservices with Node.js, Next.js, PostgreSQL, and Redis Streams, implementing real-time job processing for website uptime monitoring

• **Built scalable job processing system** with Redis Streams and consumer groups, enabling automatic load balancing across multiple worker instances with sub-30-second monitoring intervals

• **Designed fault-tolerant architecture** with automated job scheduling (Pusher), distributed workers, and reliable message acknowledgment system using Redis persistence

• **Developed responsive React dashboard** with real-time status updates, performance analytics, and modern UI/UX using Next.js 15, Tailwind CSS, and TypeScript

• **Containerized microservices application** using Docker Compose with health checks, automated database migrations, and multi-stage builds for production deployment

### For DevOps/Platform Engineer Role:
• **Orchestrated microservices deployment** using Docker Compose with automated service discovery, health checks, and dependency management across 6 containerized services

• **Implemented distributed job processing** with Redis Streams, enabling horizontal scaling of worker processes and automatic load balancing for monitoring tasks

• **Built fault-tolerant system** with Redis Stream persistence, graceful error handling, and automatic retry mechanisms across distributed worker processes

• **Configured production infrastructure** with PostgreSQL and Redis persistence, automated database seeding, and comprehensive service health monitoring

### For Backend Developer Role:
• **Developed RESTful API** with Express.js and TypeScript, implementing JWT authentication, Prisma ORM integration, and real-time monitoring endpoints

• **Architected distributed monitoring system** using Redis Streams with consumer groups, implementing bulk job processing and concurrent HTTP health checks across multiple worker instances

• **Designed scalable job processing engine** with automated discovery, Redis Stream queuing, and distributed worker coordination supporting multi-region deployment

• **Created comprehensive test suite** covering authentication flows, API endpoints, and integration testing using modern testing frameworks

## Technical Metrics
- **Response Time**: Sub-30-second monitoring intervals
- **Scalability**: Supports horizontal scaling of worker processes
- **Reliability**: Fault-tolerant architecture with automatic retries