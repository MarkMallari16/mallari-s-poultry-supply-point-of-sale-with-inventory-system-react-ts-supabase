import { createContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { loginUser } from "../services/api/login";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router";

interface AuthContextProps {
    user: User | null,
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    //states
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    //navigate to specific route
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        setLoading(true);

        const result = await loginUser(email, password);

        if (result) {
            setUser(result)
            if (result.role === "admin") {
                console.log(result)
                navigate("/admin/dashboard")
            } else if (result.role === "cashier") {
                console.log(result)
                navigate("/cashier/dashboard")
            }
        };

        setLoading(false)
    }

    const logout = async () => {
        //logout user
        await supabase.auth.signOut();

        setUser(null);
        navigate("/login")
    }

    //this will load the session
    const loadSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        const id = session?.user?.id;
        const email = session?.user?.email;

        if (id && email) {
            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("*")
                .eq("id", id)
                .single();

            if (userError) {
                console.error("User table fetch error:", userError.message);
            } else if (userData) {
                setUser({
                    id,
                    email,
                    full_name: userData.full_name ?? "",
                    role: userData.role
                })
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        loadSession();

        //unsubscribe to avoid data leaks
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            loadSession();
        })

        //cleanup
        return () => listener?.subscription.unsubscribe();

    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
} 