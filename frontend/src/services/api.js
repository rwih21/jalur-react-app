const API_URL = "http://127.0.0.1:8000/api";

function getToken() {
  return localStorage.getItem("jalur_token");
}

async function request(method, path, body = null) {
  const headers = { "Content-Type": "application/json", Accept: "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    localStorage.removeItem("jalur_token");
    window.location.reload();
    throw new Error("Unauthorized");
  }

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message || "Request failed");
    err.status = res.status;
    err.errors = data.errors || {};
    throw err;
  }

  return data;
}

const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  put: (path, body) => request("PUT", path, body),
  delete: (path) => request("DELETE", path),
};

export default api;
