import type { User } from "../../types/user";
import { supabase } from "../supabaseClient";

export const loginUser = async (email: string, password: string): Promise<User | null> => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error || !data.user) {
        console.error("Login failed:", error?.message)
        return null;
    }
    //get the user data once authenticated.
    const authUser = data.user;
    console.log("Auth", authUser)
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("full_name,role")
        .eq("id", authUser.id)
        .single()

    if (userError || !userData) {
        console.error("Error fetching user data: ", userError?.message);
        return null;
    }

    return {
        id: authUser.id,
        email: authUser.email ?? "",
        full_name: userData.full_name,
        role: userData.role
    }
}