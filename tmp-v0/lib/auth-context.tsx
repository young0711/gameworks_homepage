"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  studentId: string;
  department: string;
  year: string;
  phone: string;
  bio: string;
  career: CareerItem[];
  techStacks: string[];
  avatarUrl?: string;
}

export interface CareerItem {
  id: string;
  type: "project" | "award" | "certification" | "activity";
  title: string;
  description: string;
  date: string;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<{ success: boolean; needsCompletion: boolean }>;
  completeProfile: (profile: Partial<User>) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addCareerItem: (item: Omit<CareerItem, "id">) => void;
  removeCareerItem: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUser: User = {
  id: "1",
  email: "demo@ssu.ac.kr",
  name: "김게임",
  studentId: "20210001",
  department: "글로벌미디어학부",
  year: "3학년",
  phone: "010-1234-5678",
  bio: "게임 개발에 관심이 많은 학생입니다. Unity와 Unreal Engine을 주로 사용합니다.",
  techStacks: ["Unity", "C#", "Unreal Engine", "C++", "Blender", "Photoshop"],
  career: [
    {
      id: "1",
      type: "project",
      title: "2024 게임잼 프로젝트",
      description: "48시간 게임잼에서 팀 리더로 참여하여 퍼즐 게임 개발",
      date: "2024-03",
      organization: "GAMEWORKS",
    },
    {
      id: "2",
      type: "award",
      title: "교내 게임 개발 경진대회 대상",
      description: "Unity로 개발한 액션 게임으로 수상",
      date: "2023-11",
      organization: "숭실대학교",
    },
    {
      id: "3",
      type: "certification",
      title: "Unity Certified Developer",
      description: "Unity 공식 개발자 자격증 취득",
      date: "2023-08",
    },
  ],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app would validate against backend
    if (email && password) {
      setUser(mockUser);
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (email: string, password: string): Promise<{ success: boolean; needsCompletion: boolean }> => {
    // Mock signup - returns needsCompletion to trigger profile completion flow
    if (email && password) {
      return { success: true, needsCompletion: true };
    }
    return { success: false, needsCompletion: false };
  }, []);

  const completeProfile = useCallback((profile: Partial<User>) => {
    setUser({
      id: Date.now().toString(),
      email: profile.email || "",
      name: profile.name || "",
      studentId: profile.studentId || "",
      department: profile.department || "글로벌미디어학부",
      year: profile.year || "",
      phone: profile.phone || "",
      bio: profile.bio || "",
      career: [],
      techStacks: [],
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const addCareerItem = useCallback((item: Omit<CareerItem, "id">) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        career: [...prev.career, { ...item, id: Date.now().toString() }],
      };
    });
  }, []);

  const removeCareerItem = useCallback((id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        career: prev.career.filter((item) => item.id !== id),
      };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        completeProfile,
        logout,
        updateUser,
        addCareerItem,
        removeCareerItem,
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
