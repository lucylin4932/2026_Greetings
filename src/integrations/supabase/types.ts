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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact: {
        Row: {
          created_at: string | null
          email: string | null
          github_url: string | null
          id: string
          linkedin_url: string | null
          phone: string | null
          resume_url: string | null
          secret_garden_url: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          resume_url?: string | null
          secret_garden_url?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          resume_url?: string | null
          secret_garden_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      "core data": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string | null
          degree_en: string
          degree_zh: string
          description_en: string | null
          description_zh: string | null
          details_en: Json | null
          details_zh: Json | null
          display_order: number | null
          end_date: string | null
          id: string
          school_en: string
          school_zh: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          degree_en: string
          degree_zh: string
          description_en?: string | null
          description_zh?: string | null
          details_en?: Json | null
          details_zh?: Json | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          school_en: string
          school_zh: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          degree_en?: string
          degree_zh?: string
          description_en?: string | null
          description_zh?: string | null
          details_en?: Json | null
          details_zh?: Json | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          school_en?: string
          school_zh?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      experience: {
        Row: {
          company_en: string
          company_zh: string
          created_at: string | null
          description_en: string | null
          description_zh: string | null
          details_en: Json | null
          details_zh: Json | null
          display_order: number | null
          end_date: string | null
          id: string
          is_current: boolean | null
          location_en: string | null
          location_zh: string | null
          position_en: string
          position_zh: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          company_en: string
          company_zh: string
          created_at?: string | null
          description_en?: string | null
          description_zh?: string | null
          details_en?: Json | null
          details_zh?: Json | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          location_en?: string | null
          location_zh?: string | null
          position_en: string
          position_zh: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          company_en?: string
          company_zh?: string
          created_at?: string | null
          description_en?: string | null
          description_zh?: string | null
          details_en?: Json | null
          details_zh?: Json | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          location_en?: string | null
          location_zh?: string | null
          position_en?: string
          position_zh?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      profile: {
        Row: {
          bio_en: string | null
          bio_zh: string | null
          created_at: string | null
          id: string
          image_url: string | null
          name_en: string
          name_zh: string
          title_en: string
          title_zh: string
          updated_at: string | null
        }
        Insert: {
          bio_en?: string | null
          bio_zh?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          name_en: string
          name_zh: string
          title_en: string
          title_zh: string
          updated_at?: string | null
        }
        Update: {
          bio_en?: string | null
          bio_zh?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          name_en?: string
          name_zh?: string
          title_en?: string
          title_zh?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_zh: string | null
          details_en: Json | null
          details_zh: Json | null
          display_order: number | null
          end_date: string | null
          id: string
          role_en: string | null
          role_zh: string | null
          start_date: string | null
          title_en: string
          title_zh: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_zh?: string | null
          details_en?: Json | null
          details_zh?: Json | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          role_en?: string | null
          role_zh?: string | null
          start_date?: string | null
          title_en: string
          title_zh: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_zh?: string | null
          details_en?: Json | null
          details_zh?: Json | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          role_en?: string | null
          role_zh?: string | null
          start_date?: string | null
          title_en?: string
          title_zh?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          name_en: string
          name_zh: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          name_en: string
          name_zh: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          name_en?: string
          name_zh?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          name_en: string
          name_zh: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          name_en: string
          name_zh: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          name_en?: string
          name_zh?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
