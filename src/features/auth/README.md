# Auth Feature

This folder contains all authentication-related components and logic.

## Structure

```
auth/
├── components/
│   ├── Home/          # Landing page with signup form
│   ├── Login/         # Login page
│   └── Signup/        # Signup form component
└── index.js           # Clean exports for easy importing
```

## Usage

Import components from the feature folder:

```javascript
import { Login, Signup, Home } from '../features/auth';
```

## Components

### Login
User login form with email and password authentication.

### Signup
User registration form with validation and invite token support.

### Home
Landing page that displays the signup form and branding.

## Benefits of This Structure

- **Co-location**: Component and styles live together
- **Feature isolation**: All auth-related code in one place
- **Easy imports**: Single import statement for all auth components
- **Scalability**: Easy to add new auth features (e.g., password reset, 2FA)
