import { createWebBackendApp } from '../apps/web-backend/src/app/web-backend-app';

type VercelRequest = {
  url?: string;
  [key: string]: unknown;
};

type VercelResponse = {
  [key: string]: unknown;
};

const app = createWebBackendApp({
  runtimeBackendUrl: '/api',
  allowPrivateNetworkTargets: false,
});

export default function handler(req: VercelRequest, res: VercelResponse): void {
  const originalUrl = req.url ?? '/api';
  req.url = originalUrl.replace(/^\/api(?=\/|\?|$)/, '') || '/';
  app(req as never, res as never);
}
