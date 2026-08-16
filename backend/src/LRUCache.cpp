#include "LRUCache.h"
#include <iostream>
#include <stdexcept>


LRUCache::LRUCache(int capacity) : capacity(capacity), size(0) {
    if (capacity <= 0) {
        throw std::invalid_argument("Cache capacity must be greater than 0");
    }

    head = new CacheNode("", "");
    tail = new CacheNode("", "");

    head->next = tail;
    tail->prev = head;
}

//DESTRUCTOR

LRUCache::~LRUCache() {
    CacheNode* current = head;

    while (current != nullptr) {
        CacheNode* next = current->next;
        delete current;
        current = next;
    }
}

//REMOVE NODE

void LRUCache::removeNode(CacheNode* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
}

//ADD TO FRONT

void LRUCache::addToFront(CacheNode* node) {
    node->next = head->next;
    node->prev = head;

    head->next->prev = node;
    head->next = node;
}

//MOVE TO FRONT

void LRUCache::moveToFront(CacheNode* node) {
    removeNode(node);
    addToFront(node);
}

//EVICTING THE LRU

void LRUCache::evictLRU() {
    CacheNode* lru = tail->prev;

    if (lru == head) {
        return;
    }

    cache.erase(lru->key);
    removeNode(lru);

    delete lru;
    size--;
}

//GET

std::string LRUCache::get(const std::string& key) {
    auto it = cache.find(key);

    if (it == cache.end()) {
        return "";
    }

    CacheNode* node = it->second;

    moveToFront(node);

    return node->value;
}

//PUT

bool LRUCache::put(
    const std::string& key,
    const std::string& value
) {
    auto it = cache.find(key);

    if (it != cache.end()) {
        CacheNode* node = it->second;

        node->value = value;
        moveToFront(node);

        return false;
    }

    CacheNode* node = new CacheNode(key, value);

    cache[key] = node;
    addToFront(node);

    size++;

    if (size > capacity) {
        evictLRU();
        return true;
    }

    return false;
}

//DELETE

bool LRUCache::remove(const std::string& key) {
    auto it = cache.find(key);

    if (it == cache.end()) {
        return false;
    }

    CacheNode* node = it->second;

    cache.erase(it);
    removeNode(node);

    delete node;
    size--;

    return true;
}

//GETTERS

int LRUCache::getSize() const {
    return size;
}

int LRUCache::getCapacity() const {
    return capacity;
}

//print

void LRUCache::printCache() const {
    CacheNode* current = head->next;

    std::cout << "MRU -> ";

    while (current != tail) {
        std::cout << "[" << current->key
                  << ":" << current->value << "]";

        if (current->next != tail) {
            std::cout << " -> ";
        }

        current = current->next;
    }

    std::cout << " -> LRU\n";
}

std::vector<std::pair<std::string, std::string>>
LRUCache::getItems() const {
    std::vector<std::pair<std::string, std::string>> items;

    CacheNode* current = head->next;

    while (current != tail) {
        items.push_back({
            current->key,
            current->value
        });

        current = current->next;
    }

    return items;
}