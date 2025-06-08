import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthError {
  message: string;
  status?: number;
}

export interface SignUpData {
  email: string;
  password: string;
  username: string;
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Sign up a new user with email and password
 */
export async function signUpUser({ email, password, username }: SignUpData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return { user: data.user, session: data.session };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create account');
  }
}

/**
 * Sign in an existing user
 */
export async function signInUser({ email, password }: SignInData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { user: data.user, session: data.session };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in');
  }
}

/**
 * Sign out the current user
 */
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign out');
  }
}

/**
 * Get the current user session
 */
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      throw new Error(error.message);
    }
    return session;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get session');
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error.message);
    }
    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get user');
  }
}

/**
 * Reset password for a user
 */
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send reset email');
  }
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update password');
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(user: User | null): boolean {
  return user !== null;
}

/**
 * Check if user has admin role
 */
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      return false;
    }

    return data?.role === 'admin';
  } catch {
    return false;
  }
}

/**
 * Get user profile from database
 */
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get user profile');
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: any) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update profile');
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
} 