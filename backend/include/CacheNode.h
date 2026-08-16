#pragma once

#include <string>

struct CacheNode {
    std::string key;
    std::string value;

    CacheNode* prev;
    CacheNode* next;

    CacheNode(const std::string& key, const std::string& value)
        : key(key), value(value), prev(nullptr), next(nullptr) {}
};