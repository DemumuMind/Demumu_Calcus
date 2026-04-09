## EVAL: user-auth
Created: 2026-04-09 17:00
Status: NOT STARTED

### Description
User authentication system with JWT tokens

### Capability Evals
- [ ] User can login with valid email and password
- [ ] JWT token is generated upon successful login
- [ ] Token expires after configured timeout
- [ ] User can refresh token before expiry
- [ ] Failed logins are rate-limited

### Regression Evals
- [ ] Existing user sessions continue to work
- [ ] Logout functionality still works
- [ ] Password reset flow unchanged

### Success Criteria
- pass@3 > 90% for capability evals
- pass^3 = 100% for regression evals

### Notes
- Need to implement refresh token rotation
