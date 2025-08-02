# Naseeb App

A modern React Native app built with Expo, TypeScript, and a clean, scalable architecture.

## 🚀 Features

- **Modern Stack**: Expo Router, TypeScript, React Query
- **Clean Architecture**: Well-organized folder structure
- **UI Components**: Reusable, themed components
- **Authentication**: Mock authentication system (ready for backend integration)
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query for server state
- **Local Storage**: AsyncStorage for data persistence

## 📁 Project Structure

```
naseeb/
├── app/                    # Expo Router app directory
│   ├── (auth)/            # Authentication screens
│   │   ├── _layout.tsx    # Auth layout
│   │   ├── login.tsx      # Login screen
│   │   └── register.tsx   # Register screen
│   ├── (tabs)/            # Main app tabs
│   │   ├── _layout.tsx    # Tab layout
│   │   ├── index.tsx      # Home screen
│   │   ├── profile.tsx    # Profile screen
│   │   └── settings.tsx   # Settings screen
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/        # Reusable components
│   │   └── ui/           # UI components (Button, Input, Card)
│   ├── constants/        # App constants (themes, config)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Third-party library configs
│   ├── services/         # API services (mock for now)
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── store/            # State management (future)
├── assets/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Language**: TypeScript
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **UI**: Custom themed components
- **Storage**: AsyncStorage
- **Backend**: Mock services (ready for Supabase integration)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd naseeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🔐 Authentication

The app includes a mock authentication system for development:

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password`

### Features
- Login/Register forms with validation
- Persistent authentication state
- Protected routes
- Logout functionality

## 🎨 UI Components

### Available Components
- `Button`: Multiple variants (primary, secondary, outline)
- `Input`: Form inputs with validation states
- `Card`: Content containers with elevation options

### Usage
```tsx
import { Button, Input, Card } from '@/components/ui';

// Example usage
<Button title="Submit" onPress={handleSubmit} variant="primary" />
<Input label="Email" placeholder="Enter email" value={email} onChangeText={setEmail} />
<Card padding="medium" elevation="small">
  <Text>Content here</Text>
</Card>
```

## 🎯 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing folder structure
- Use the theme constants for styling
- Implement proper error handling

### Adding New Features
1. Create types in `src/types/`
2. Add services in `src/services/`
3. Create components in `src/components/`
4. Add hooks in `src/hooks/`
5. Update navigation in `app/` directory

### Backend Integration
The app is structured to easily integrate with a real backend:

1. **Replace mock services**: Update `src/services/auth.ts`
2. **Configure Supabase**: Update `src/lib/supabase.ts`
3. **Add environment variables**: Create `.env` file
4. **Update API calls**: Replace mock functions with real API calls

## 📱 Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔧 Configuration

### Environment Variables
Create a `.env` file for backend configuration:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Theme Configuration
Themes are defined in `src/constants/theme.ts` and can be easily customized.

## 🚀 Deployment

### Expo Build
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for platforms
eas build --platform ios
eas build --platform android
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

**Happy coding! 🎉** 