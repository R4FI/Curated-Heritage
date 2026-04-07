# Authentication Flow Diagrams

## 🔐 Complete Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     HERITAGE STORE AUTH SYSTEM                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Frontend   │◄──►│  Auth Service│◄──►│   Backend    │
│  (React)     │    │  (Axios)     │    │   API        │
└──────────────┘    └──────────────┘    └──────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Secure       │    │ Token        │    │   MySQL      │
│ Storage      │    │ Refresh      │    │  Database    │
│ (Encrypted)  │    │ Interceptor  │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

## 📝 Registration Flow

```
USER                    FRONTEND                  BACKEND                 DATABASE
 │                         │                         │                       │
 │  1. Visit /register     │                         │                       │
 ├────────────────────────►│                         │                       │
 │                         │                         │                       │
 │  2. Fill form           │                         │                       │
 │     - Name              │                         │                       │
 │     - Email             │                         │                       │
 │     - Phone             │                         │                       │
 │     - Password          │                         │                       │
 │     - Confirm Password  │                         │                       │
 │     - Agree to Terms    │                         │                       │
 ├────────────────────────►│                         │                       │
 │                         │                         │                       │
 │  3. Click "Create       │                         │                       │
 │     Account"            │                         │                       │
 ├────────────────────────►│                         │                       │
 │                         │                         │                       │
 │                         │  4. Validate Form       │                       │
 │                         │     - Check all fields  │                       │
 │                         │     - Verify email      │                       │
 │                         │     - Match passwords   │                       │
 │                         │     - Check terms       │                       │
 │                         │                         │                       │
 │                         │  5. POST /auth/register │                       │
 │                         ├────────────────────────►│                       │
 │                         │     {                   │                       │
 │                         │       name,             │                       │
 │                         │       email,            │                       │
 │                         │       phone,            │                       │
 │                         │       password          │                       │
 │                         │     }                   │                       │
 │                         │                         │                       │
 │                         │                         │  6. Hash Password     │
 │                         │                         │                       │
 │                         │                         │  7. INSERT INTO users │
 │                         │                         ├──────────────────────►│
 │                         │                         │                       │
 │                         │                         │  8. User Created      │
 │                         │                         │◄──────────────────────┤
 │                         │                         │                       │
 │                         │                         │  9. Generate Tokens   │
 │                         │                         │     - accessToken     │
 │                         │                         │     - refreshToken    │
 │                         │                         │                       │
 │                         │  10. Response           │                       │
 │                         │◄────────────────────────┤                       │
 │                         │     {                   │                       │
 │                         │       success: true,    │                       │
 │                         │       data: {           │                       │
 │                         │         accessToken,    │                       │
 │                         │         refreshToken,   │                       │
 │                         │         user: {...}     │                       │
 │                         │       }                 │                       │
 │                         │     }                   │                       │
 │                         │                         │                       │
 │                         │  11. Encrypt & Store    │                       │
 │                         │      - accessToken      │                       │
 │                         │      - refreshToken     │                       │
 │                         │      - user object      │                       │
 │                         │                         │                       │
 │  12. Success Toast      │                         │                       │
 │◄────────────────────────┤                         │                       │
 │  "Welcome to Heritage!" │                         │                       │
 │                         │                         │                       │
 │  13. Redirect to /      │                         │                       │
 │◄────────────────────────┤                         │                       │
 │                         │                         │                       │
```

## 🔑 Login Flow

```
USER                    FRONTEND                  BACKEND                 DATABASE
 │                         │                         │                       │
 │  1. Visit /login        │                         │                       │
 ├────────────────────────►│                         │                       │
 │                         │                         │                       │
 │  2. Enter credentials   │                         │                       │
 │     - Email             │                         │                       │
 │     - Password          │                         │                       │
 ├────────────────────────►│                         │                       │
 │                         │                         │                       │
 │  3. Click "Login"       │                         │                       │
 ├────────────────────────►│                         │                       │
 │                         │                         │                       │
 │                         │  4. Validate Form       │                       │
 │                         │                         │                       │
 │                         │  5. POST /auth/login    │                       │
 │                         ├────────────────────────►│                       │
 │                         │     {                   │                       │
 │                         │       email,            │                       │
 │                         │       password          │                       │
 │                         │     }                   │                       │
 │                         │                         │                       │
 │                         │                         │  6. SELECT user       │
 │                         │                         │     WHERE email       │
 │                         │                         ├──────────────────────►│
 │                         │                         │                       │
 │                         │                         │  7. User Found        │
 │                         │                         │◄──────────────────────┤
 │                         │                         │                       │
 │                         │                         │  8. Verify Password   │
 │                         │                         │     (bcrypt compare)  │
 │                         │                         │                       │
 │                         │                         │  9. Generate Tokens   │
 │                         │                         │                       │
 │                         │  10. Response           │                       │
 │                         │◄────────────────────────┤                       │
 │                         │     {                   │                       │
 │                         │       success: true,    │                       │
 │                         │       data: {           │                       │
 │                         │         accessToken,    │                       │
 │                         │         refreshToken,   │                       │
 │                         │         user: {...}     │                       │
 │                         │       }                 │                       │
 │                         │     }                   │                       │
 │                         │                         │                       │
 │                         │  11. Encrypt & Store    │                       │
 │                         │                         │                       │
 │  12. Success Toast      │                         │                       │
 │◄────────────────────────┤                         │                       │
 │  "Welcome back!"        │                         │                       │
 │                         │                         │                       │
 │  13. Redirect           │                         │                       │
 │◄────────────────────────┤                         │                       │
 │                         │                         │                       │
```

## 🔄 Token Refresh Flow

```
USER                    FRONTEND                  BACKEND
 │                         │                         │
 │  1. Make API Request    │                         │
 ├────────────────────────►│                         │
 │                         │                         │
 │                         │  2. GET /api/products   │
 │                         │     Authorization:      │
 │                         │     Bearer <token>      │
 │                         ├────────────────────────►│
 │                         │                         │
 │                         │  3. Token Expired       │
 │                         │     401 Unauthorized    │
 │                         │◄────────────────────────┤
 │                         │                         │
 │                         │  4. Interceptor Catches │
 │                         │     401 Error           │
 │                         │                         │
 │                         │  5. POST /auth/refresh  │
 │                         │     {                   │
 │                         │       refreshToken      │
 │                         │     }                   │
 │                         ├────────────────────────►│
 │                         │                         │
 │                         │  6. Verify Refresh      │
 │                         │     Token               │
 │                         │                         │
 │                         │  7. New Access Token    │
 │                         │◄────────────────────────┤
 │                         │     {                   │
 │                         │       accessToken,      │
 │                         │       expiresIn         │
 │                         │     }                   │
 │                         │                         │
 │                         │  8. Update Storage      │
 │                         │                         │
 │                         │  9. Retry Original      │
 │                         │     Request             │
 │                         ├────────────────────────►│
 │                         │                         │
 │                         │  10. Success Response   │
 │                         │◄────────────────────────┤
 │                         │                         │
 │  11. Data Displayed     │                         │
 │◄────────────────────────┤                         │
 │                         │                         │
```

## 🛡️ Protected Route Flow

```
USER                    FRONTEND                  AUTH CHECK
 │                         │                         │
 │  1. Visit /profile      │                         │
 ├────────────────────────►│                         │
 │                         │                         │
 │                         │  2. ProtectedRoute      │
 │                         │     Component           │
 │                         │                         │
 │                         │  3. Check Auth          │
 │                         ├────────────────────────►│
 │                         │                         │
 │                         │                         │  4. Get Token
 │                         │                         │     from Storage
 │                         │                         │
 │                         │  5a. NOT Authenticated  │
 │                         │◄────────────────────────┤
 │                         │                         │
 │  6a. Redirect to        │                         │
 │      /login             │                         │
 │◄────────────────────────┤                         │
 │                         │                         │
 │                         │                         │
 │                    OR   │                         │
 │                         │                         │
 │                         │  5b. IS Authenticated   │
 │                         │◄────────────────────────┤
 │                         │                         │
 │  6b. Render Profile     │                         │
 │      Component          │                         │
 │◄────────────────────────┤                         │
 │                         │                         │
```

## 🔐 Token Storage Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SECURE STORAGE                        │
└─────────────────────────────────────────────────────────┘

Plain Text Data                Encrypted Data
     │                              │
     ▼                              ▼
┌──────────┐                  ┌──────────┐
│ "token"  │  ──Encrypt──►    │ "Xj9k2..." │
│ "user"   │  (XOR+Base64)    │ "Ym4h8..." │
└──────────┘                  └──────────┘
                                    │
                                    ▼
                            ┌──────────────┐
                            │ localStorage │
                            │              │
                            │ secure_      │
                            │ accessToken  │
                            │              │
                            │ secure_      │
                            │ refreshToken │
                            │              │
                            │ secure_user  │
                            └──────────────┘
                                    │
                                    ▼
                              ┌──────────┐
                              │ Decrypt  │
                              │ on Read  │
                              └──────────┘
                                    │
                                    ▼
                              Plain Text
```

## 🎯 Component Interaction

```
┌────────────────────────────────────────────────────────────┐
│                      APP COMPONENT                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              AUTH PROVIDER                            │  │
│  │  (Global Authentication State)                        │  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │    Login     │  │   Register   │  │  Profile   │  │  │
│  │  │    Page      │  │    Page      │  │   Page     │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  │         │                  │                 │        │  │
│  │         └──────────────────┴─────────────────┘        │  │
│  │                            │                           │  │
│  │                            ▼                           │  │
│  │                  ┌──────────────────┐                  │  │
│  │                  │  Auth Service    │                  │  │
│  │                  │  (API Calls)     │                  │  │
│  │                  └──────────────────┘                  │  │
│  │                            │                           │  │
│  │         ┌──────────────────┼──────────────────┐        │  │
│  │         ▼                  ▼                  ▼        │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │   Secure    │  │   Axios      │  │  Backend    │  │  │
│  │  │   Storage   │  │ Interceptor  │  │    API      │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Summary

### Registration

```
Form Input → Validation → API Call → Token Generation →
Encryption → Storage → Success Toast → Redirect
```

### Login

```
Credentials → Validation → API Call → Token Verification →
Encryption → Storage → Success Toast → Redirect
```

### Protected Access

```
Route Request → Auth Check → Token Validation →
Grant/Deny Access → Render Component / Redirect
```

### Token Refresh

```
API Call → 401 Error → Interceptor → Refresh Request →
New Token → Update Storage → Retry Original Request
```

## 🔍 Security Layers

```
Layer 1: Form Validation
         ↓
Layer 2: HTTPS Transport
         ↓
Layer 3: JWT Token Authentication
         ↓
Layer 4: Token Encryption (Storage)
         ↓
Layer 5: Automatic Token Refresh
         ↓
Layer 6: Protected Route Guards
         ↓
Layer 7: Backend Authorization
```

---

**Note:** All diagrams represent the current implementation.
For production, consider upgrading to AES encryption and adding additional security layers.
