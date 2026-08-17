cmake_minimum_required(VERSION 3.16)

project(CacheBackend)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Crow CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)

include_directories(include)

add_executable(
    cache_server
    src/main.cpp
    src/LRUCache.cpp
    src/CacheManager.cpp
)

target_link_libraries(
    cache_server
    PRIVATE
    Crow::Crow
    nlohmann_json::nlohmann_json
)

add_executable(
    test_lru
    tests/test_lru.cpp
    src/LRUCache.cpp
)