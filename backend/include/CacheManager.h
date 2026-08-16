#pragma once

#include "LRUCache.h"
#include <vector>
#include <utility>

#include <string>

class CacheManager {
private:
    LRUCache cache;

    long long totalRequests;
    long long hits;
    long long misses;
    long long evictions;

public:
    explicit CacheManager(int capacity);

    std::string get(const std::string& key);
    void put(const std::string& key, const std::string& value);
    bool remove(const std::string& key);

    int getSize() const;
    int getCapacity() const;

    long long getTotalRequests() const;
    long long getHits() const;
    long long getMisses() const;
    long long getEvictions() const;

    double getHitRate() const;

    std::vector<std::pair<std::string, std::string>> getItems() const;
};