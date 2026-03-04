import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mi-app-ionic',
  webDir: 'dist',
  plugins: {
    Camera: {
      permissions: ['camera', 'photos'],
    },
    Filesystem: {
      permissions: ['read', 'write'],
    },
  },
};

export default config;
