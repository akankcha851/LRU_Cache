## CacheFlow — LRU Cache Visualizer & High-Performance Cache Server

CacheFlow is a full-stack **LRU (Least Recently Used) Cache Visualizer** built to demonstrate how an LRU cache works internally while exposing the cache through a REST API.

The project combines a **C++17 backend**, **React frontend**, **REST APIs**, and **Docker** to create an interactive cache management and visualization system.

Users can insert, retrieve, update, and delete cache entries while visually observing the cache's **MRU → LRU ordering**, cache hits, misses, and evictions in real time.

---

## Live Demo

### Frontend

 https://lru-cache-phi.vercel.app/

### Backend API

 https://lru-cache-backend-mkg9.onrender.com/

---

##  Features

###  LRU Cache Engine

- Implemented in **C++17**
- O(1) `GET` operation
- O(1) `PUT` operation
- O(1) deletion
- Automatic eviction of the least recently used item
- Configurable cache capacity
- Maintains MRU → LRU ordering

###  Cache Statistics

The backend tracks:

- Total requests
- Cache hits
- Cache misses
- Hit rate
- Number of evictions
- Current cache size
- Cache capacity

###  Interactive Visualization

The React frontend allows users to:

- Add cache entries
- Retrieve cache entries
- Delete cache entries
- Clear the cache
- View cache contents
- Identify MRU and LRU entries
- Monitor cache statistics
- Observe cache state changes interactively

###  REST API

The C++ backend exposes REST endpoints for interacting with the cache.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/cache` | Get complete cache state |
| GET | `/cache/:key` | Retrieve a cache value |
| PUT | `/cache/:key` | Insert/update a cache value |
| DELETE | `/cache/:key` | Remove a cache entry |
| DELETE | `/cache` | Clear the cache |
| GET | `/stats` | Get cache statistics |

###  Docker Support

The backend can be containerized using Docker.

The Docker setup installs the required dependencies, builds the C++ application, and runs the cache server inside a container.

###  Deployment

- Frontend deployed using **Vercel**
- Backend deployed using **Render**
- Docker used for backend deployment
- CORS configured for local development and production

---

#  Architecture

```text
                    ┌──────────────────────┐
                    │      User Browser    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      + Vite          │
                    └──────────┬───────────┘
                               │
                         Axios REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   C++ Backend        │
                    │      Crow            │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    CacheManager      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      LRUCache        │
                    │                      │
                    │  Hash Map + DLL      │
                    └──────────────────────┘
