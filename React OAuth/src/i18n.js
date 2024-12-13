import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      signIn: "Sign In",
      signInWithGoogle: "Sign in with Google",
      signInWithRefreshToken: "Sign in with Google (with Refresh Token)",
      welcome: "Welcome",
      email: "Email",
      logout: "Logout",
    },
  },
  id: {
    translation: {
      signIn: "Masuk",
      signInWithGoogle: "Masuk dengan Google",
      signInWithRefreshToken: "Masuk dengan Google (dengan Refresh Token)",
      welcome: "Selamat Datang",
      email: "Email",
      logout: "Keluar",
    },
  },
  fr: {
    translation: {
      signIn: "Se connecter",
      signInWithGoogle: "Se connecter avec Google",
      signInWithRefreshToken: "Se connecter avec Google (avec Refresh Token)",
      welcome: "Bienvenue",
      email: "E-mail",
      logout: "Se déconnecter",
    },
  },
  es: {
    translation: {
      signIn: "Iniciar sesión",
      signInWithGoogle: "Iniciar sesión con Google",
      signInWithRefreshToken: "Iniciar sesión con Google (con Refresh Token)",
      welcome: "Bienvenido",
      email: "Correo electrónico",
      logout: "Cerrar sesión",
    },
  },
  de: {
    translation: {
      signIn: "Einloggen",
      signInWithGoogle: "Mit Google einloggen",
      signInWithRefreshToken: "Mit Google einloggen (mit Refresh Token)",
      welcome: "Willkommen",
      email: "E-Mail",
      logout: "Abmelden",
    },
  },
  it: {
    translation: {
      signIn: "Accedi",
      signInWithGoogle: "Accedi con Google",
      signInWithRefreshToken: "Accedi con Google (con Refresh Token)",
      welcome: "Benvenuto",
      email: "Email",
      logout: "Esci",
    },
  },
  pt: {
    translation: {
      signIn: "Entrar",
      signInWithGoogle: "Entrar com Google",
      signInWithRefreshToken: "Entrar com Google (com Refresh Token)",
      welcome: "Bem-vindo",
      email: "E-mail",
      logout: "Sair",
    },
  },
  ru: {
    translation: {
      signIn: "Войти",
      signInWithGoogle: "Войти через Google",
      signInWithRefreshToken: "Войти через Google (с Refresh Token)",
      welcome: "Добро пожаловать",
      email: "Электронная почта",
      logout: "Выйти",
    },
  },
  ja: {
    translation: {
      signIn: "ログイン",
      signInWithGoogle: "Googleでログイン",
      signInWithRefreshToken: "Googleでログイン（リフレッシュトークン使用）",
      welcome: "ようこそ",
      email: "メール",
      logout: "ログアウト",
    },
  },
  zh: {
    translation: {
      signIn: "登录",
      signInWithGoogle: "使用Google登录",
      signInWithRefreshToken: "使用Google登录（刷新令牌）",
      welcome: "欢迎",
      email: "电子邮件",
      logout: "登出",
    },
  },
  ko: {
    translation: {
      signIn: "로그인",
      signInWithGoogle: "Google로 로그인",
      signInWithRefreshToken: "Google로 로그인 (새로 고침 토큰 포함)",
      welcome: "환영합니다",
      email: "이메일",
      logout: "로그아웃",
    },
  },
  nl: {
    translation: {
      signIn: "Inloggen",
      signInWithGoogle: "Inloggen met Google",
      signInWithRefreshToken: "Inloggen met Google (met Refresh Token)",
      welcome: "Welkom",
      email: "E-mail",
      logout: "Uitloggen",
    },
  },
  ar: {
    translation: {
      signIn: "تسجيل الدخول",
      signInWithGoogle: "تسجيل الدخول باستخدام Google",
      signInWithRefreshToken: "تسجيل الدخول باستخدام Google (برمز تحديث)",
      welcome: "مرحبًا بك",
      email: "البريد الإلكتروني",
      logout: "تسجيل الخروج",
    },
  },
  hi: {
    translation: {
      signIn: "साइन इन करें",
      signInWithGoogle: "Google से साइन इन करें",
      signInWithRefreshToken: "Google से साइन इन करें (Refresh Token के साथ)",
      welcome: "स्वागत है",
      email: "ईमेल",
      logout: "लॉग आउट करें",
    },
  },
  th: {
    translation: {
      signIn: "เข้าสู่ระบบ",
      signInWithGoogle: "เข้าสู่ระบบด้วย Google",
      signInWithRefreshToken: "เข้าสู่ระบบด้วย Google (พร้อม Refresh Token)",
      welcome: "ยินดีต้อนรับ",
      email: "อีเมล",
      logout: "ออกจากระบบ",
    },
  },
  tr: {
    translation: {
      signIn: "Giriş Yap",
      signInWithGoogle: "Google ile Giriş Yap",
      signInWithRefreshToken: "Google ile Giriş Yap (Refresh Token ile)",
      welcome: "Hoşgeldiniz",
      email: "E-posta",
      logout: "Çıkış Yap",
    },
  },
  sv: {
    translation: {
      signIn: "Logga in",
      signInWithGoogle: "Logga in med Google",
      signInWithRefreshToken: "Logga in med Google (med Refresh Token)",
      welcome: "Välkommen",
      email: "E-post",
      logout: "Logga ut",
    },
  },
  vi: {
    translation: {
      signIn: "Đăng nhập",
      signInWithGoogle: "Đăng nhập bằng Google",
      signInWithRefreshToken: "Đăng nhập bằng Google (với Refresh Token)",
      welcome: "Chào mừng",
      email: "Email",
      logout: "Đăng xuất",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Bahasa default
  fallbackLng: "en", // Bahasa fallback
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
