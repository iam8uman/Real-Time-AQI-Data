
export const routes = {
    profile: '/profile',
    register: '/register',
    ProfileSetting: '/profile-setting',
    home: '/',
    auth: {
      login: '/auth/login',
      signUp: '/auth/signup',
      forgotPassword: 'auth/forgot-password',
      resetPassword: 'auth/reset-password',
    },
    user: {
      dashboard: '/userdash',
      profile: '/userdash/profile',
      kanban: '/userdash/kanban',
      analytics: '/userdash/analytics',
      settings: '/userdash/settings',
      liveMap: '/userdash/live-map',
    },
    admin: {
      dashboard: '/admindash',
      profile: '/admindash/profile',
      kanban: '/admindash/kanban',
      analytics: '/admindash/analytics',
      settings: '/admindash/settings',
      liveMap: '/admindash/live-map',
    }
   
  };
  