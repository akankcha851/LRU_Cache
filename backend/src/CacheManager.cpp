#include "CacheManager.h"

CacheManager::CacheManager(int capacity)
    : cache(capacity),
      totalRequests(0),
      hits(0),
      misses(0),
      evictions(0) {
}

//GET

std::string CacheManager::get(const std::string& key) {
    totalRequests++;

    std::string value = cache.get(key);

    if (value.empty()) {
        misses++;
    } else {
        hits++;
    }

    return value;
}

//PUT

void CacheManager::put(
    const std::string& key,
    const std::string& value
) {
    bool evicted = cache.put(key, value);

    if (evicted) {
        evictions++;
    }
}

//DELETE

bool CacheManager::remove(const std::string& key) {
    return cache.remove(key);
}

//GETTERS

int CacheManager::getSize() const {
    return cache.getSize();
}

int CacheManager::getCapacity() const {
    return cache.getCapacity();
}

long long CacheManager::getTotalRequests() const {
    return totalRequests;
}

long long CacheManager::getHits() const {
    return hits;
}

long long CacheManager::getMisses() const {
    return misses;
}

long long CacheManager::getEvictions() const {
    return evictions;
}

//AND

double CacheManager::getHitRate() const {
    if (totalRequests == 0) {
        return 0.0;
    }
    return static_cast<double>(hits) / totalRequests;
}

std::vector<std::pair<std::string, std::string>>
CacheManager::getItems() const {
    return cache.getItems();
}
