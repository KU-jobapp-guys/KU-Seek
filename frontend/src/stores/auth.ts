import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import api from "@/plugins/axios.client";

type UserRole = "admin" | "company" | "professor" | "student" | "visitor" | "staff" | string;

interface AuthData {
    access_token?: string;
    email?: string;
    type?: UserRole;
    user_id?: string;
}

interface AuthStore {
    // State
    token: Ref<string | null>;
    username: Ref<string | null>;
    role: Ref<UserRole | null>;
    userId: Ref<string | null>;
    isRegistered: Ref<boolean>;
    // Computed
    isAuthenticated: ComputedRef<boolean>;
    isAdmin: ComputedRef<boolean>;
    isCompany: ComputedRef<boolean>;
    isProfessor: ComputedRef<boolean>;
    isStudent: ComputedRef<boolean>;
    isViewer: ComputedRef<boolean>;
    isStaff: ComputedRef<boolean>;
    // Actions
    setAuthData: (data: AuthData) => void;
    updateToken: (newToken: string) => void;
    setIsRegistered: (value: boolean) => void;
    logout: () => void;
    clearAuthData: () => void;
    getRedirectPath: () => string;
    refreshToken: () => Promise<void>;
}

export const useAuthStore = defineStore<"auth", AuthStore>("auth", () => {
    const token = ref<string | null>(null);
    const username = ref<string | null>(null);
    const role = ref<UserRole | null>(null);
    const userId = ref<string | null>(null);
    const isRegistered = ref<boolean>(false);

    // Computed properties for easy access
    const isAuthenticated = computed<boolean>(() => !!token.value);
    const isAdmin = computed<boolean>(() => role.value === "admin");
    const isCompany = computed<boolean>(() => role.value === "company");
    const isProfessor = computed<boolean>(() => role.value === "professor");
    const isStudent = computed<boolean>(() => role.value === "student");
    const isViewer = computed<boolean>(() => role.value === "visitor");
    const isStaff = computed<boolean>(() => role.value === "staff");

    /**
     * Set authentication data
     */
    const setAuthData = (data: AuthData): void => {
        if (data.access_token !== undefined) {
            token.value = data.access_token;
        }
        if (data.email !== undefined) {
            username.value = data.email;
        }
        if (data.type !== undefined) {
            role.value = data.type;
        }
        if (data.user_id !== undefined) {
            userId.value = data.user_id;
        }
    };

    /**
     * Update access token
     */
    const updateToken = (newToken: string): void => {
        token.value = newToken;
    };

    /**
     * Set registration status
     */
    const setIsRegistered = (value: boolean): void => {
        isRegistered.value = value;
    };

    /**
     * Get redirect path based on user role
     */
    const getRedirectPath = (): string => {
        const roleRedirects: Record<UserRole, string> = {
            admin: "/admin/dashboard",
            student: "/student/dashboard",
            visitor: "/",
            company: "/company/dashboard",
            professor: "/professor/dashboard",
            staff: "/staff/dashboard",
        };

        return role.value ? roleRedirects[role.value] : "/";
    };

    /**
     * Refresh access token using refresh token cookie
     */
    const refreshToken = async (): Promise<void> => {
        try {
            const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
            const response = await api.get(`${base}/api/v1/refresh`, { withCredentials: true });
            const newToken = response.data;

            if (!newToken) {
                throw new Error("No token received from refresh");
            }

            updateToken(newToken);
        } catch (error) {
            console.error("Token refresh failed:", error);
            throw error;
        }
    };

    /**
     * Clear all authentication data
     */
    const logout = (): void => {
        token.value = null;
        username.value = null;
        role.value = null;
        userId.value = null;
        isRegistered.value = false;
    };

    /**
     * Clear all authentication data (alias for logout)
     */
    const clearAuthData = (): void => {
        logout();
    };

    return {
        // State
        token,
        username,
        role,
        userId,
        isRegistered,
        // Computed
        isAuthenticated,
        isAdmin,
        isCompany,
        isProfessor,
        isStudent,
        isViewer,
        isStaff,
        // Actions
        setAuthData,
        updateToken,
        setIsRegistered,
        logout,
        clearAuthData,
        getRedirectPath,
        refreshToken,
    };
});