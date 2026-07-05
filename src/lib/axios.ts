import axios from "axios";

const BYPASS_SERVER = true; // เปลี่ยนเป็น false เพื่อกลับไปใช้เซิร์ฟเวอร์จริง

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

function getMockResponse(url: string) {
    const path = url.startsWith("http") ? new URL(url).pathname : url;

    if (path.includes("/dashboard")) {
        return {
            totalStudents: 0,
            low: 0,
            medium: 0,
            high: 0,
            averageScore: 0,
            averageBpm: 0,
        };
    }

    if (path.includes("/activities")) {
        return [];
    }

    if (path.includes("/history")) {
        return [];
    }

    if (path.includes("/students")) {
        return [];
    }

    return { success: true, data: [] };
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (BYPASS_SERVER) {
            const config = error.config ?? {};
            return Promise.resolve({
                data: getMockResponse(config.url ?? ""),
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        return Promise.reject(error);
    }
);

export default api;