#pragma once

#include "CacheNode.h"
#include <vector>
#include <utility>
#include <string>
#include <unordered_map>

class LRUCache {
private:
    int capacity;
    int size;

    CacheNode* head;
    CacheNode* tail;

    std::unordered_map<std::string, CacheNode*> cache;

    void removeNode(CacheNode* node);
    void addToFront(CacheNode* node);
    void moveToFront(CacheNode* node);
    void evictLRU();

public:
    explicit LRUCache(int capacity);
    ~LRUCache();

    std::string get(const std::string& key);
    bool put(const std::string& key, const std::string& value);
    bool remove(const std::string& key);

    int getSize() const;
    int getCapacity() const;

    void printCache() const;

    std::vector<std::pair<std::string, std::string>> getItems() const;
};