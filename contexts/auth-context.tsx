"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  nomeCompleto: string;
  email: string;
  cidade: string;
  estado: string;
  cep: string;
  endereco: string;
  senha: string;
  createdAt: Date;
  isEmailConfirmed: boolean;
}

interface AuthContextType {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    senha: string,
    lembrarMe?: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (
    userData: Omit<User, "id" | "createdAt" | "isEmailConfirmed">
  ) => Promise<{ success: boolean; error?: string }>;
  confirmEmail: (email: string) => void;
  resendConfirmationEmail: (
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load users and auth state from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem("barriga-cheea-users");
    const savedCurrentUser = localStorage.getItem("barriga-cheea-current-user");
    const savedRememberMe = localStorage.getItem("barriga-cheea-remember-me");

    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        setUsers(parsedUsers);
      } catch (error) {
        console.error("Error parsing saved users:", error);
      }
    }

    if (savedCurrentUser && savedRememberMe === "true") {
      try {
        const parsedUser = JSON.parse(savedCurrentUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing saved current user:", error);
      }
    }
  }, []);

  // Save users to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem("barriga-cheea-users", JSON.stringify(users));
  }, [users]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (senha: string): boolean => {
    // At least 6 characters and at least one special character
    const hasMinLength = senha.length >= 6;
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(senha);
    return hasMinLength && hasSpecialChar;
  };

  const login = async (
    email: string,
    senha: string,
    lembrarMe = false
  ): Promise<{ success: boolean; error?: string }> => {
    if (!email.trim()) {
      return { success: false, error: "E-mail é obrigatório" };
    }

    if (!validateEmail(email)) {
      return { success: false, error: "E-mail inválido" };
    }

    if (!senha.trim()) {
      return { success: false, error: "Senha é obrigatória" };
    }

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return { success: false, error: "Usuário não encontrado" };
    }

    if (user.senha !== senha) {
      return { success: false, error: "Senha incorreta" };
    }

    // if (!user.isEmailConfirmed) {
    //   return {
    //     success: false,
    //     error: "E-mail não confirmado. Verifique sua caixa de entrada.",
    //   };
    // }

    setCurrentUser(user);
    setIsAuthenticated(true);

    // Save to localStorage if remember me is checked
    if (lembrarMe) {
      localStorage.setItem("barriga-cheea-current-user", JSON.stringify(user));
      localStorage.setItem("barriga-cheea-remember-me", "true");
    } else {
      localStorage.removeItem("barriga-cheea-current-user");
      localStorage.removeItem("barriga-cheea-remember-me");
    }

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("barriga-cheea-current-user");
    localStorage.removeItem("barriga-cheea-remember-me");
  };

  const register = async (
    userData: Omit<User, "id" | "createdAt" | "isEmailConfirmed">
  ): Promise<{ success: boolean; error?: string }> => {
    // Validate required fields
    if (!userData.nomeCompleto.trim()) {
      return { success: false, error: "Nome completo é obrigatório" };
    }

    if (!userData.email.trim()) {
      return { success: false, error: "E-mail é obrigatório" };
    }

    if (!validateEmail(userData.email)) {
      return { success: false, error: "E-mail inválido" };
    }

    if (!userData.cidade.trim()) {
      return { success: false, error: "Cidade é obrigatória" };
    }

    if (!userData.estado.trim()) {
      return { success: false, error: "Estado é obrigatório" };
    }

    if (!userData.cep.trim()) {
      return { success: false, error: "CEP é obrigatório" };
    }

    if (!userData.endereco.trim()) {
      return { success: false, error: "Endereço é obrigatório" };
    }

    if (!userData.senha.trim()) {
      return { success: false, error: "Senha é obrigatória" };
    }

    if (!validatePassword(userData.senha)) {
      return {
        success: false,
        error: "Senha deve ter pelo menos 6 caracteres e um caractere especial",
      };
    }

    // Check if user already exists
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (existingUser) {
      return { success: false, error: "Usuário já cadastrado com este e-mail" };
    }

    // Create new user
    const newUser: User = {
      ...userData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      isEmailConfirmed: false, // In a real app, this would be false until email is confirmed
    };

    setUsers((prev) => [...prev, newUser]);
    return { success: true };
  };

  const confirmEmail = (email: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.email.toLowerCase() === email.toLowerCase()
          ? { ...user, isEmailConfirmed: true }
          : user
      )
    );
  };

  const resendConfirmationEmail = async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return { success: false, error: "Usuário não encontrado" };
    }

    if (user.isEmailConfirmed) {
      return { success: false, error: "E-mail já confirmado" };
    }

    // Simulate sending email
    return { success: true };
  };

  const forgotPassword = async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!email.trim()) {
      return { success: false, error: "E-mail é obrigatório" };
    }

    if (!validateEmail(email)) {
      return { success: false, error: "E-mail inválido" };
    }

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return { success: false, error: "Usuário não encontrado" };
    }

    // Simulate sending password reset email
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isAuthenticated,
        login,
        logout,
        register,
        confirmEmail,
        resendConfirmationEmail,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
