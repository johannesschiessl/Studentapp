export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      exam_type_groups: {
        Row: {
          id: number;
          name: string;
          school_year_id: number;
          user_id: string;
          weight: number;
        };
        Insert: {
          id?: never;
          name: string;
          school_year_id: number;
          user_id?: string;
          weight: number;
        };
        Update: {
          id?: never;
          name?: string;
          school_year_id?: number;
          user_id?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_school_year_group";
            columns: ["school_year_id"];
            isOneToOne: false;
            referencedRelation: "school_years";
            referencedColumns: ["id"];
          },
        ];
      };
      exam_types: {
        Row: {
          group_id: number;
          id: number;
          name: string;
          school_year_id: number;
          user_id: string;
          weight: number;
        };
        Insert: {
          group_id: number;
          id?: never;
          name: string;
          school_year_id: number;
          user_id?: string;
          weight: number;
        };
        Update: {
          group_id?: number;
          id?: never;
          name?: string;
          school_year_id?: number;
          user_id?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_exam_type_group";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "exam_type_groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_school_year_type";
            columns: ["school_year_id"];
            isOneToOne: false;
            referencedRelation: "school_years";
            referencedColumns: ["id"];
          },
        ];
      };
      exams: {
        Row: {
          date_returned: string | null;
          date_written: string;
          description: string | null;
          exam_type_id: number;
          grade: number | null;
          grade_modifier: string | null;
          id: number;
          subject_id: number;
          user_id: string;
        };
        Insert: {
          date_returned?: string | null;
          date_written: string;
          description?: string | null;
          exam_type_id: number;
          grade?: number | null;
          grade_modifier?: string | null;
          id?: never;
          subject_id: number;
          user_id?: string;
        };
        Update: {
          date_returned?: string | null;
          date_written?: string;
          description?: string | null;
          exam_type_id?: number;
          grade?: number | null;
          grade_modifier?: string | null;
          id?: never;
          subject_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "exams_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_exam_type";
            columns: ["exam_type_id"];
            isOneToOne: false;
            referencedRelation: "exam_types";
            referencedColumns: ["id"];
          },
        ];
      };
      flashcard_decks: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          last_practiced_at: string | null;
          name: string;
          practice_reverse: boolean | null;
          school_year_id: number;
          subject_id: number | null;
          typing_mode: boolean | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          last_practiced_at?: string | null;
          name: string;
          practice_reverse?: boolean | null;
          school_year_id: number;
          subject_id?: number | null;
          typing_mode?: boolean | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          last_practiced_at?: string | null;
          name?: string;
          practice_reverse?: boolean | null;
          school_year_id?: number;
          subject_id?: number | null;
          typing_mode?: boolean | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "flashcard_decks_school_year_id_fkey";
            columns: ["school_year_id"];
            isOneToOne: false;
            referencedRelation: "school_years";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "flashcard_decks_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
        ];
      };
      flashcards: {
        Row: {
          back_text: string;
          created_at: string;
          deck_id: number | null;
          front_text: string;
          id: number;
          last_practiced_at: string | null;
          level: number;
          next_practice_at: string | null;
          times_practiced: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          back_text: string;
          created_at?: string;
          deck_id?: number | null;
          front_text: string;
          id?: number;
          last_practiced_at?: string | null;
          level?: number;
          next_practice_at?: string | null;
          times_practiced?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          back_text?: string;
          created_at?: string;
          deck_id?: number | null;
          front_text?: string;
          id?: number;
          last_practiced_at?: string | null;
          level?: number;
          next_practice_at?: string | null;
          times_practiced?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "flashcards_deck_id_fkey";
            columns: ["deck_id"];
            isOneToOne: false;
            referencedRelation: "flashcard_decks";
            referencedColumns: ["id"];
          },
        ];
      };
      homework: {
        Row: {
          done: boolean;
          due_date: string;
          id: number;
          school_year_id: number;
          subject_id: number | null;
          task: string;
          user_id: string;
        };
        Insert: {
          done?: boolean;
          due_date: string;
          id?: never;
          school_year_id: number;
          subject_id?: number | null;
          task: string;
          user_id?: string;
        };
        Update: {
          done?: boolean;
          due_date?: string;
          id?: never;
          school_year_id?: number;
          subject_id?: number | null;
          task?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_school_year_task";
            columns: ["school_year_id"];
            isOneToOne: false;
            referencedRelation: "school_years";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "homework_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
        ];
      };
      school_years: {
        Row: {
          class: number;
          created_at: string;
          grading_system: string;
          id: number;
          timetable: Json | null;
          user_id: string;
          vacation_region: string;
        };
        Insert: {
          class: number;
          created_at?: string;
          grading_system?: string;
          id?: never;
          timetable?: Json | null;
          user_id?: string;
          vacation_region?: string;
        };
        Update: {
          class?: number;
          created_at?: string;
          grading_system?: string;
          id?: never;
          timetable?: Json | null;
          user_id?: string;
          vacation_region?: string;
        };
        Relationships: [];
      };
      subjects: {
        Row: {
          color: string;
          created_at: string;
          icon: string;
          id: number;
          name: string;
          room: string | null;
          school_year_id: number;
          teacher: string | null;
          user_id: string;
        };
        Insert: {
          color: string;
          created_at?: string;
          icon: string;
          id?: never;
          name: string;
          room?: string | null;
          school_year_id: number;
          teacher?: string | null;
          user_id?: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          icon?: string;
          id?: never;
          name?: string;
          room?: string | null;
          school_year_id?: number;
          teacher?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_school_year";
            columns: ["school_year_id"];
            isOneToOne: false;
            referencedRelation: "school_years";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
