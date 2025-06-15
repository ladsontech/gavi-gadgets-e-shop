export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      education_levels: {
        Row: {
          created_at: string | null
          group_category: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          group_category: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          group_category?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          position: string
          start_date: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position: string
          start_date: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position?: string
          start_date?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      fields_of_focus: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      fields_of_interest: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_id: string | null
          created_at: string | null
          employer_id: string | null
          id: string
          job_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          applicant_id?: string | null
          created_at?: string | null
          employer_id?: string | null
          id?: string
          job_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string | null
          created_at?: string | null
          employer_id?: string | null
          id?: string
          job_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          job_type: string | null
          location: string | null
          requirements: string[] | null
          salary_range: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          job_type?: string | null
          location?: string | null
          requirements?: string[] | null
          salary_range?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          job_type?: string | null
          location?: string | null
          requirements?: string[] | null
          salary_range?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          reference_id: string | null
          reference_type: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          reference_id?: string | null
          reference_type?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          reference_id?: string | null
          reference_type?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          caption: string | null
          category: string | null
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          caption?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          caption?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          achievements: string[] | null
          areas_of_interest: string[] | null
          bio: string | null
          career_goals: string | null
          company_name: string | null
          contact_number: string | null
          contacts: string[] | null
          course_program: string | null
          cover_photo_url: string | null
          created_at: string | null
          degree_program: string | null
          description: string | null
          education_level: string | null
          email: string | null
          field_of_focus: string | null
          field_of_interest: string | null
          full_name: string | null
          gpa: number | null
          id: string
          industry: string | null
          location: string | null
          profession: string | null
          profile_photo_url: string | null
          receive_job_notifications: boolean | null
          skills: string[] | null
          university: string | null
          updated_at: string | null
          user_type: string | null
          verification_status: string | null
          verification_type: string[] | null
          website: string | null
          year_of_study: string | null
        }
        Insert: {
          achievements?: string[] | null
          areas_of_interest?: string[] | null
          bio?: string | null
          career_goals?: string | null
          company_name?: string | null
          contact_number?: string | null
          contacts?: string[] | null
          course_program?: string | null
          cover_photo_url?: string | null
          created_at?: string | null
          degree_program?: string | null
          description?: string | null
          education_level?: string | null
          email?: string | null
          field_of_focus?: string | null
          field_of_interest?: string | null
          full_name?: string | null
          gpa?: number | null
          id: string
          industry?: string | null
          location?: string | null
          profession?: string | null
          profile_photo_url?: string | null
          receive_job_notifications?: boolean | null
          skills?: string[] | null
          university?: string | null
          updated_at?: string | null
          user_type?: string | null
          verification_status?: string | null
          verification_type?: string[] | null
          website?: string | null
          year_of_study?: string | null
        }
        Update: {
          achievements?: string[] | null
          areas_of_interest?: string[] | null
          bio?: string | null
          career_goals?: string | null
          company_name?: string | null
          contact_number?: string | null
          contacts?: string[] | null
          course_program?: string | null
          cover_photo_url?: string | null
          created_at?: string | null
          degree_program?: string | null
          description?: string | null
          education_level?: string | null
          email?: string | null
          field_of_focus?: string | null
          field_of_interest?: string | null
          full_name?: string | null
          gpa?: number | null
          id?: string
          industry?: string | null
          location?: string | null
          profession?: string | null
          profile_photo_url?: string | null
          receive_job_notifications?: boolean | null
          skills?: string[] | null
          university?: string | null
          updated_at?: string | null
          user_type?: string | null
          verification_status?: string | null
          verification_type?: string[] | null
          website?: string | null
          year_of_study?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
