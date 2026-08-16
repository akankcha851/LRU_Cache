#include "LRUCache.h"

#include <cassert>
#include <iostream>

void testBasicPutGet() {
    LRUCache cache(3);

    cache.put("A", "100");
    cache.put("B", "200");

    assert(cache.get("A") == "100");
    assert(cache.get("B") == "200");

    std::cout << "testBasicPutGet passed\n";
}

void testMissingKey() {
    LRUCache cache(3);

    cache.put("A", "100");

    assert(cache.get("B") == "");

    std::cout << "testMissingKey passed\n";
}

void testEviction() {
    LRUCache cache(2);

    cache.put("A", "100");
    cache.put("B", "200");

    cache.put("C", "300");

    assert(cache.get("A") == "");
    assert(cache.get("B") == "200");
    assert(cache.get("C") == "300");

    std::cout << "testEviction passed\n";
}

void testLRUOrdering() {
    LRUCache cache(3);

    cache.put("A", "100");
    cache.put("B", "200");
    cache.put("C", "300");

    cache.get("A");

    cache.put("D", "400");

    assert(cache.get("B") == "");
    assert(cache.get("A") == "100");
    assert(cache.get("C") == "300");
    assert(cache.get("D") == "400");

    std::cout << "testLRUOrdering passed\n";
}

void testUpdateExistingKey() {
    LRUCache cache(3);

    cache.put("A", "100");
    cache.put("B", "200");

    cache.put("A", "999");

    assert(cache.get("A") == "999");

    std::cout << "testUpdateExistingKey passed\n";
}

void testDelete() {
    LRUCache cache(3);

    cache.put("A", "100");
    cache.put("B", "200");

    assert(cache.remove("A"));
    assert(cache.get("A") == "");
    assert(cache.getSize() == 1);

    std::cout << "testDelete passed\n";
}

void testCapacityOne() {
    LRUCache cache(1);

    cache.put("A", "100");
    cache.put("B", "200");

    assert(cache.get("A") == "");
    assert(cache.get("B") == "200");

    std::cout << "testCapacityOne passed\n";
}

int main() {
    testBasicPutGet();
    testMissingKey();
    testEviction();
    testLRUOrdering();
    testUpdateExistingKey();
    testDelete();
    testCapacityOne();;
    
    std::cout << "\nAll tests passed!\n";

    return 0;
}