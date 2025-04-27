import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/dashboard.jsx'),
  route('my-budget', 'routes/mybudget.jsx'),
  route('analytics', 'routes/analytics.jsx'),
] satisfies RouteConfig;
