export const email = (app, path) => import('./email-router.js').then(m => m.default(app, path));
export const auth = (app, path) => import('./auth-router.js').then(m => m.default(app, path));