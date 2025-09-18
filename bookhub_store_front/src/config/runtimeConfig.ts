type RuntimeConfig = {
  API_BASE_URL: string;
}

export function getRuntimeConfig(): RuntimeConfig {
  if (typeof window !== 'undefined' && (window as any).RUNTIME_CONFIG) {
    return (window as any).RUNTIME_CONFIG as RuntimeConfig;
  }

  return {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://3.39.230.65:8080'
  }
}

export const API_BASE = getRuntimeConfig().API_BASE_URL;
