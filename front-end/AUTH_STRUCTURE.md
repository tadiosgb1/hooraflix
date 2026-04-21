# HooraFlix Authentication & Registration Structure

## Overview
HooraFlix has a professional authentication system with three user roles: **Viewers**, **Creators**, and **Trainers**. Registration is handled via a modal that appears when users click pricing buttons on the Home page.

---

## User Roles

### 1. **Viewer** (Free - Pay-per-View)
- **Cost**: Free (pay-per-view for content)
- **Login Method**: Social login (Google, Facebook) or Email/Password
- **Features**: Stream movies, series, music, documentaries, live events, personalized recommendations

### 2. **Creator** (Subscription - $19.99/month)
- **Cost**: $19.99/month
- **Login Method**: Email/Password only
- **Features**: Upload unlimited content, earn from subscriptions, referral commissions (10%), advanced analytics

### 3. **Trainer** (Subscription - $29.99/month)
- **Cost**: $29.99/month
- **Login Method**: Email/Password only
- **Features**: Create training courses, earn 15% per student, referral bonuses (10% + 5%), performance incentives

---

## File Structure

```
front-end/src/
├── views/opened/auth/
│   ├── login.vue                    # Login page
│   └── register.vue                 # (Deprecated - using modal instead)
├── components/modals/
│   └── RegistrationModal.vue        # Registration modal component
└── views/opened/landing/
    └── Home.vue                     # Landing page with modal
```

---

## Navigation Flow (CORRECT)

```
Home Page (Landing)
├── Header "Sign In" → /login
├── Header "Get Started" → /#pricing (scroll to pricing section)
├── Pricing Section
│   ├── Viewer "Get Started" → Opens RegistrationModal with role='viewer'
│   ├── Creator "Subscribe Now" → Opens RegistrationModal with role='creator'
│   └── Trainer "Join as Trainer" → Opens RegistrationModal with role='trainer'
├── CTA Section Buttons → Opens RegistrationModal with respective role
└── Content Category Buttons → Opens RegistrationModal with role='viewer'

Login Page (/login)
├── Email/Password Login → /dashboard
├── Social Login (Google/Facebook) → /dashboard
└── "Sign up" link → Home page /#pricing (back to home pricing)

Registration Modal (on Home page)
├── Shows selected role and pricing
├── Fill registration form
├── "Change Plan" button → Closes modal (back to pricing)
├── "Create Account" → /dashboard (after successful registration)
└── "Sign in" link → /login
```

---

## Component Details

### 1. **login.vue** - Login Page
**Route**: `/login`

**Features**:
- Professional dark theme with video background
- Email/Password login
- Social login buttons (Google, Facebook)
- Remember me checkbox
- Forgot password link
- Error handling

**Form Payload**:
```javascript
{
  email: "user@example.com",
  password: "password123"
}
```

---

### 2. **RegistrationModal.vue** - Registration Modal
**Location**: `front-end/src/components/modals/RegistrationModal.vue`
**Used in**: Home.vue landing page

**Features**:
- Modal overlay with dark theme matching landing page
- Shows selected role and pricing at top
- Registration form with exact payload structure
- Form fields:
  - first_name
  - last_name
  - email
  - phone_number
  - password
- Terms & Conditions checkbox
- Change Plan button (closes modal)
- Link to login page

**Form Payload** (sent to API):
```javascript
{
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  phone_number: "+1 (555) 000-0000",
  password: "SecurePass123",
  role: "creator" // or "viewer", "trainer"
}
```

**Validation**:
- Password minimum 8 characters
- Terms & Conditions must be accepted
- All fields required

---

## API Endpoints

### Login
**POST** `/users/login`
```javascript
Request:
{
  email: "user@example.com",
  password: "password123"
}

Response:
{
  access_token: "jwt_token_here",
  user: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    role: "creator",
    permissions: ["content.view", "content.create"]
  }
}
```

### Register
**POST** `/users/register`
```javascript
Request:
{
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  phone_number: "+1 (555) 000-0000",
  password: "SecurePass123",
  role: "creator"
}

Response:
{
  access_token: "jwt_token_here",
  user: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    role: "creator",
    permissions: ["content.view", "content.create"]
  }
}
```

---

## Local Storage

After successful login/registration:
```javascript
localStorage.setItem("access", data.access_token);
localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("permissions", JSON.stringify(data.user.permissions));

// Optional: Remember me
localStorage.setItem("rememberMe", "true");
localStorage.setItem("rememberedEmail", email);
```

---

## Key Features

✅ **Modal Registration**: Registration happens in a modal on the Home page
✅ **Pricing First**: Users select plan before registration
✅ **Exact Payload**: Uses correct form structure (first_name, last_name, email, phone_number, password, role)
✅ **Professional Design**: Dark theme matching landing page brand
✅ **Social Login**: Viewers can use Google/Facebook
✅ **Responsive**: Works on mobile, tablet, desktop
✅ **Error Handling**: Clear error messages
✅ **Loading States**: Visual feedback during submission
✅ **Form Validation**: Client-side validation
✅ **Remember Me**: Optional email persistence

---

## Home Page Sections

The Home page includes:
1. **Hero Section** - Main call-to-action with video background
2. **Trending Media** - Featured content
3. **Content Categories** - Movies & Series (with documentaries), Music & Podcasts, Talent Training, Live Events
4. **Music Section** - Dedicated music streaming features
5. **Talent Training Section** - Commission structure and how it works
6. **For Creators Section** - Creator benefits and monetization
7. **Platform Features** - Why choose HooraFlix
8. **About Section** - Background, Mission, Vision, Core Values
9. **Pricing Section** - Three plans with registration modal
10. **CTA Section** - Final call-to-action
11. **Contact & Footer** - Contact information and links

---

## Usage Examples

### Open Registration Modal
```javascript
// In Home.vue
openRegistrationModal(role) {
  this.selectedRole = role;
  this.showRegistrationModal = true;
}
```

### Close Registration Modal
```javascript
closeRegistrationModal() {
  this.showRegistrationModal = false;
}
```

### Check User Role
```javascript
const user = JSON.parse(localStorage.getItem("user"));
if (user.role === "creator") {
  // Show creator features
}
```

---

## Summary

The authentication system is now properly structured:
1. Users see pricing on Home page
2. Users click pricing button → Registration modal opens
3. Users fill form with exact payload structure
4. Users can close modal and change plan
5. After registration, users are logged in and redirected to dashboard
6. Login page links back to Home page pricing section for new users
