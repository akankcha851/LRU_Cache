#include "CacheManager.h"

#include "crow.h"
#include "crow/middlewares/cors.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

int main() {
    crow::App<crow::CORSHandler> app;

    auto& cors = app.get_middleware<crow::CORSHandler>();

    cors.global()
        .origin("http://localhost:5173")
        .methods(
            crow::HTTPMethod::GET,
            crow::HTTPMethod::POST,
            crow::HTTPMethod::PUT,
            crow::HTTPMethod::DELETE,
            crow::HTTPMethod::OPTIONS
    )
    .headers("Content-Type");

    CacheManager cache(5);

    CROW_ROUTE(app, "/")
    ([] {
        return crow::response(
            200,
            "CacheViz LRU Cache Server is running!"
        );
    });

    CROW_ROUTE(app, "/cache")
    ([&cache] {
        json response;

        response["capacity"] = cache.getCapacity();
        response["size"] = cache.getSize();

        json items = json::array();

        auto cacheItems = cache.getItems();

        for (size_t i = 0; i < cacheItems.size(); i++) {
            json item;

            item["key"] = cacheItems[i].first;
            item["value"] = cacheItems[i].second;

            if (i == 0) {
                item["position"] = "MRU";
            } else if (i == cacheItems.size() - 1) {
                item["position"] = "LRU";
            } else {
                item["position"] = "MIDDLE";
            }

            items.push_back(item);
        }

        response["items"] = items;

        return crow::response(response.dump());
    });

    CROW_ROUTE(app, "/cache/<string>")
    ([&cache](const std::string& key) {
        std::string value = cache.get(key);

        if (value.empty()) {
            json response;

            response["hit"] = false;
            response["key"] = key;

            return crow::response(404, response.dump());
        }

        json response;

        response["hit"] = true;
        response["key"] = key;
        response["value"] = value;

        return crow::response(response.dump());
    });

    CROW_ROUTE(app, "/cache/<string>")
        .methods(crow::HTTPMethod::PUT)
    ([&cache](const crow::request& req,
              const std::string& key) {

        auto body = crow::json::load(req.body);

        if (!body) {
            return crow::response(
                400,
                "Invalid JSON"
            );
        }

        if (!body.has("value")) {
            return crow::response(
                400,
                "Missing value"
            );
        }

        std::string value = body["value"].s();

        cache.put(key, value);

        json response;

        response["success"] = true;
        response["key"] = key;
        response["value"] = value;

        return crow::response(response.dump());
    });

    CROW_ROUTE(app, "/cache/<string>")
        .methods(crow::HTTPMethod::DELETE)
    ([&cache](const std::string& key) {

        bool removed = cache.remove(key);

        json response;

        response["success"] = removed;
        response["key"] = key;

        if (!removed) {
            return crow::response(
                404,
                response.dump()
            );
        }

        return crow::response(response.dump());
    });

    CROW_ROUTE(app, "/stats")
    ([&cache] {

        json response;

        response["totalRequests"] =
            cache.getTotalRequests();

        response["hits"] =
            cache.getHits();

        response["misses"] =
            cache.getMisses();

        response["evictions"] =
            cache.getEvictions();

        response["hitRate"] =
            cache.getHitRate();

        response["size"] =
            cache.getSize();

        response["capacity"] =
            cache.getCapacity();

        return crow::response(response.dump());
    });

    CROW_ROUTE(app, "/cache")
        .methods(crow::HTTPMethod::DELETE)
    ([&cache] {

        auto items = cache.getItems();

        for (const auto& item : items) {
            cache.remove(item.first);
        }

        json response;

        response["success"] = true;
        response["message"] = "Cache cleared";

        return crow::response(response.dump());
    });

    app.port(18080)
       .multithreaded()
       .run();
}