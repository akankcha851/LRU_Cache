import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:18080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCache = async () => {
  const response = await api.get("/cache");
  return response.data;
};

export const getCacheItem = async (key) => {
  try {
    const response = await api.get(`/cache/${key}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        hit: false,
        key,
      };
    }

    throw error;
  }
};

export const putCacheItem = async (key, value) => {
  const response = await api.put(`/cache/${key}`, {
    value: String(value),
  });

  return response.data;
};

export const deleteCacheItem = async (key) => {
  try {
    const response = await api.delete(`/cache/${key}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        success: false,
        key,
      };
    }

    throw error;
  }
};

export const clearCache = async () => {
  const response = await api.delete("/cache");
  return response.data;
};

export const getStats = async () => {
  const response = await api.get("/stats");
  return response.data;
};