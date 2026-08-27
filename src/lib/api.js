const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://fb-growth-bot-p4jz.onrender.com";

async function request(path, { method = "GET", params = null, body = null } = {}) {
  let url = `${API_BASE}${path}`;
  if (params) {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ""))
    ).toString();
    if (qs) url += `?${qs}`;
  }

  const opts = { method, headers: {} };
  if (body) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }

  const resp = await fetch(url, opts);
  const data = await resp.json().catch(() => null);

  if (!resp.ok) {
    const message = data?.detail || `Erreur ${resp.status}`;
    throw new Error(message);
  }
  return data;
}

export const api = {
  createProfile: (params) => request("/profile", { method: "POST", params }),
  getScanSteps: () => request("/onboarding/scan-steps"),
  getQuiz: () => request("/onboarding/quiz"),
  submitQuizAnswer: (body) => request("/onboarding/quiz/answer", { method: "POST", body }),
  getQuizContext: (profileId) => request(`/onboarding/quiz/context/${profileId}`),
  runDiagnostic: (body) => request("/diagnostic", { method: "POST", body }),
  getProjection: (profileId, avgReach) =>
    request(`/projection/${profileId}`, { params: { avg_reach: avgReach } }),
  generateStrategy: (params) => request("/strategy", { method: "POST", params }),
  generateHooks: (params) => request("/hooks", { method: "POST", params }),
  adaptFormats: (params) => request("/formats", { method: "POST", params }),
  refineContent: (params) => request("/refine", { method: "POST", params }),
};
