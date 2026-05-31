# Backend Integration Guide — Allāhul Musta'ān Frontend

This README describes the minimal backend API surface and environment variables needed to integrate the frontend with a real backend. The frontend includes a small adapter at `src/lib/apiClient.ts` which will call backend endpoints when `VITE_USE_BACKEND=true`. Otherwise it falls back to the existing `localStorage` behavior for development.

## Environment variables

- `VITE_USE_BACKEND` (boolean) — set to `true` to enable real backend calls.
- `VITE_API_BASE_URL` (string, optional) — base URL for API requests, e.g. `https://api.example.com`. If omitted the frontend will call relative paths like `/api/...`.

Add these to your `.env` (or server config):

```env
VITE_USE_BACKEND=true
VITE_API_BASE_URL=https://api.example.com
```

> Notes: Vite exposes `VITE_` prefixed vars to the client. For production, ensure `VITE_API_BASE_URL` uses your production API URL.

## Session keys (frontend expectations)

- `ami_admin_session` — stored by frontend when admin logs in. Shape: JSON object with at least `email`, `role`, and `status` (and optional `username`).
- `ami_student_session` — stored when student logs in. Shape: { indexNumber, name, regNumber }.

The server-side auth should return a JSON object that can be mapped to these shapes (frontend adapter maps responses). For production you should return an auth token (JWT) and user info; consider storing tokens in HttpOnly cookies or use secure storage.

## Minimal API spec

All endpoints accept and return JSON. Paths shown are the defaults used by `apiClient` (relative `/api/...`). If you want to use `VITE_API_BASE_URL` set it in the client and adjust the adapter.

1) POST /api/admin/login
   - Request body: { email: string, password: string }
   - Success (200): { email, username?, role: "super"|"sub", status: "approved"|"pending"|"denied", createdAt?, /* optional: token */ }
   - Error (401): { error: "invalid_credentials" }
   - Error (403): { error: "pending" } or { error: "denied" }

2) POST /api/admin/signup
   - Request body: { username?: string, email: string, phone?: string, password: string, role?: "super"|"sub" }
   - Success (201): { email, username?, role, status }
   - Error (409): { error: "exists" }

3) POST /api/admin/forgot
   - Request body: { phone: string }
   - Success (200): For sub-admins: { type: "sub", newPin: string } (or send via SMS) — for super admins: { type: "super" } (trigger support flow)
   - Error (404): { error: "not_found" }

4) POST /api/admin/logout (optional)
   - Body: none or { token }
   - Success (200): { ok: true }

5) POST /api/student/login
   - Request body: { indexNumber: string, password: string }
   - Success (200): { indexNumber, name?, regNumber?, /* optional: token */ }
   - Error (401): { error: "invalid_credentials" }

6) POST /api/student/signup
   - Request body: { indexNumber: string, phone: string, password: string }
   - Success (201): { indexNumber, name?, regNumber? }
   - Error (409): { error: "exists" }

7) POST /api/student/forgot
   - Request body: { phone: string }
   - Success (200): { code: string } (or send via SMS)
   - Error (404): { error: "not_found" }

8) POST /api/student/logout (optional)
   - Success (200): { ok: true }

## Recommended server behavior / notes

- Authentication tokens: prefer issuing HttpOnly cookies or short-lived JWTs returned in response. If returning JWTs, the frontend should store them in memory or use cookies to prevent XSS risk.
- Responses should include normalized user objects so the adapter can write the session keys the frontend expects (or you can update the adapter to use token-based sessions).
- For production, implement rate-limiting and brute-force protections (the frontend enforces local attempt limits, but server-side is required for security).
- SMS/email: the `forgot` endpoints should send reset codes or temporary PINs via a reliable SMS/email provider; the API may also return the code only for development.

## Adapter integration points

- `src/lib/apiClient.ts` currently calls the above endpoints when `VITE_USE_BACKEND=true`. It expects the server to return JSON and will throw on non-2xx responses.
- If your API uses different paths, either set `VITE_API_BASE_URL` or update `apiClient` to prepend the base URL.

## Example: successful admin login response

```json
{
  "email": "admin@example.com",
  "username": "HeadAdmin",
  "role": "super",
  "status": "approved",
  "token": "<jwt-token>"
}
```

Frontend mapping: save user info into `ami_admin_session` and, if applicable, set auth cookie or store token according to your security policy.

## Next steps for the frontend

1. Implement server endpoints according to the spec above.
2. Decide on token strategy (cookies vs JWT) and update `apiClient` to attach auth headers or rely on cookies.
3. (Optional) Replace localStorage session usage with a proper `AuthContext` that reads server tokens and user info.

---
If you'd like, I can now add a concise `AuthContext` and hook to centralize session state and make it straightforward to replace localStorage with server-driven auth. 
# Welcome to your Lovable project

TODO: Document your project here
