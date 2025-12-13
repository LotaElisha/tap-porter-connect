export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      email_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          media_type: string
          media_url: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          media_type?: string
          media_url: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          media_type?: string
          media_url?: string
          title?: string
        }
        Relationships: []
      }
      members_corporate: {
        Row: {
          address: string | null
          company_name: string
          company_type: string
          contact_email: string
          contact_person: string
          contact_phone: string
          created_at: string
          id: string
          logo_url: string | null
          membership_number: string | null
          number_of_porters: number | null
          registration_number: string | null
          services_offered: string[] | null
          status: Database["public"]["Enums"]["membership_status"] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          company_name: string
          company_type: string
          contact_email: string
          contact_person: string
          contact_phone: string
          created_at?: string
          id?: string
          logo_url?: string | null
          membership_number?: string | null
          number_of_porters?: number | null
          registration_number?: string | null
          services_offered?: string[] | null
          status?: Database["public"]["Enums"]["membership_status"] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          company_name?: string
          company_type?: string
          contact_email?: string
          contact_person?: string
          contact_phone?: string
          created_at?: string
          id?: string
          logo_url?: string | null
          membership_number?: string | null
          number_of_porters?: number | null
          registration_number?: string | null
          services_offered?: string[] | null
          status?: Database["public"]["Enums"]["membership_status"] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      members_honorary: {
        Row: {
          affiliation: string | null
          area_of_expertise: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          member_type: string
          membership_number: string | null
          organization_name: string | null
          phone: string | null
          reason_for_joining: string | null
          status: Database["public"]["Enums"]["membership_status"] | null
          title: string | null
          updated_at: string
        }
        Insert: {
          affiliation?: string | null
          area_of_expertise?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          member_type: string
          membership_number?: string | null
          organization_name?: string | null
          phone?: string | null
          reason_for_joining?: string | null
          status?: Database["public"]["Enums"]["membership_status"] | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          affiliation?: string | null
          area_of_expertise?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          member_type?: string
          membership_number?: string | null
          organization_name?: string | null
          phone?: string | null
          reason_for_joining?: string | null
          status?: Database["public"]["Enums"]["membership_status"] | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      members_porters: {
        Row: {
          certifications: string[] | null
          created_at: string
          date_of_birth: string | null
          district: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string
          gender: string | null
          id: string
          membership_number: string | null
          national_id: string | null
          phone: string
          profile_photo_url: string | null
          region: string | null
          status: Database["public"]["Enums"]["membership_status"] | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          certifications?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          district?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name: string
          gender?: string | null
          id?: string
          membership_number?: string | null
          national_id?: string | null
          phone: string
          profile_photo_url?: string | null
          region?: string | null
          status?: Database["public"]["Enums"]["membership_status"] | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          certifications?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          district?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          membership_number?: string | null
          national_id?: string | null
          phone?: string
          profile_photo_url?: string | null
          region?: string | null
          status?: Database["public"]["Enums"]["membership_status"] | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          logo_url: string | null
          name: string
          partner_type: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          logo_url?: string | null
          name: string
          partner_type?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          logo_url?: string | null
          name?: string
          partner_type?: string | null
          website?: string | null
        }
        Relationships: []
      }
      porter_messages: {
        Row: {
          admin_response: string | null
          approved_at: string | null
          approved_by: string | null
          author_email: string | null
          author_name: string
          author_phone: string | null
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          message: string
        }
        Insert: {
          admin_response?: string | null
          approved_at?: string | null
          approved_by?: string | null
          author_email?: string | null
          author_name: string
          author_phone?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          message: string
        }
        Update: {
          admin_response?: string | null
          approved_at?: string | null
          approved_by?: string | null
          author_email?: string | null
          author_name?: string
          author_phone?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          message?: string
        }
        Relationships: []
      }
      porter_stories: {
        Row: {
          created_at: string
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          mountain: string | null
          porter_name: string
          porter_photo_url: string | null
          slug: string
          story: string
          title: string
          updated_at: string
          years_as_porter: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          mountain?: string | null
          porter_name: string
          porter_photo_url?: string | null
          slug: string
          story: string
          title: string
          updated_at?: string
          years_as_porter?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          mountain?: string | null
          porter_name?: string
          porter_photo_url?: string | null
          slug?: string
          story?: string
          title?: string
          updated_at?: string
          years_as_porter?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      membership_status: "pending" | "active" | "expired" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      membership_status: ["pending", "active", "expired", "suspended"],
    },
  },
} as const
