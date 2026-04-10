# App Minecraft - Project Context

## Overview

This is a **Minecraft-themed application** consisting of two sub-projects:

1. **`proyecto/`** — A backend/web application built with **Yii 2 Framework** (PHP).
2. **`movil/`** — A mobile application built with **Ionic + Angular** and packaged with **Capacitor** for native deployment.

The project appears to be a full-stack application with a PHP backend serving a mobile frontend.

---

## Project Structure

```
app-minecraft/
├── proyecto/          # Yii 2 PHP backend
│   ├── commands/      # Console commands
│   ├── config/        # Application configurations
│   ├── controllers/   # Web controllers
│   ├── models/        # Model classes
│   ├── views/         # View templates
│   ├── web/           # Web entry point & resources
│   ├── tests/         # Codeception tests
│   └── docker-compose.yml
├── movil/             # Ionic/Angular mobile app
│   ├── src/
│   │   ├── app/       # Angular application modules
│   │   ├── assets/    # Static assets
│   │   ├── environments/  # Environment configs
│   │   └── theme/     # Ionic theme variables
│   ├── capacitor.config.ts
│   └── ionic.config.json
└── package.json       # Root dependencies (swiper)
```

---

## Backend (`proyecto/`)

### Technology Stack
- **Framework:** Yii 2 Basic Project Template
- **Language:** PHP >= 7.4
- **Database:** MySQL (configurable in `config/db.php`)
- **Testing:** Codeception (unit, functional, acceptance)
- **Containerization:** Docker (via `docker-compose.yml`)

### Key Commands

```bash
# Install dependencies
composer install

# Run with Docker
docker-compose up -d

# Run tests
vendor/bin/codecept run

# Serve locally (without Docker)
php -S localhost:8080 -t web/
```

### Database Configuration
Edit `config/db.php` to configure database connection:
```php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=yii2basic',
    'username' => 'root',
    'password' => '1234',
    'charset' => 'utf8',
];
```

---

## Mobile App (`movil/`)

### Technology Stack
- **Framework:** Ionic 8 + Angular 20
- **Build Tool:** Angular CLI
- **Native Packaging:** Capacitor 8
- **HTTP Client:** Axios
- **Styling:** SCSS with Ionic theming
- **Testing:** Jasmine + Karma
- **Linting:** ESLint

### Key Commands

```bash
# Navigate to movil/ directory first
cd movil

# Install dependencies
npm install

# Start dev server
npm run start        # or: ionic serve

# Build for production
npm run build        # or: ionic build

# Watch mode (dev)
npm run watch

# Run unit tests
npm run test

# Lint code
npm run lint

# Build for native platforms (Android/iOS)
npx cap add android   # or ios
npx cap sync
npx cap open android  # or ios
```

---

## Development Conventions

### Backend (PHP/Yii2)
- Follows Yii 2 MVC conventions
- Controllers in `controllers/`, Models in `models/`, Views in `views/`
- Console commands in `commands/`
- Configuration in `config/`

### Mobile (Angular/Ionic)
- Angular module structure with prefix `app`
- SCSS for styling with Ionic theming support
- ESLint configured with Angular-specific rules
- Capacitor for native mobile features

---

## Root-Level Dependencies

The root `package.json` contains only `swiper` (carousel/slider library), which may be shared across both sub-projects or used for a specific purpose.

---

## Notes

- The backend uses Yii 2 Basic template, suitable for small to medium applications
- The mobile app targets native platforms via Capacitor (Android/iOS)
- Both sub-projects have their own dependency management (`composer.json` for PHP, `package.json` for mobile)
