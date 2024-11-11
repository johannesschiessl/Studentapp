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
            foreignKeyName: "exam_type_groups_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
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
            foreignKeyName: "exam_types_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
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
            foreignKeyName: "exams_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_exam_type";
            columns: ["exam_type_id"];
            isOneToOne: false;
            referencedRelation: "exam_types";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_subject";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
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
          {
            foreignKeyName: "homework_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      school_years: {
        Row: {
          class: number;
          grading_system: string;
          id: number;
          timetable: Json | null;
          user_id: string;
          vacation_region: string;
        };
        Insert: {
          class: number;
          grading_system?: string;
          id?: never;
          timetable?: Json | null;
          user_id?: string;
          vacation_region?: string;
        };
        Update: {
          class?: number;
          grading_system?: string;
          id?: never;
          timetable?: Json | null;
          user_id?: string;
          vacation_region?: string;
        };
        Relationships: [
          {
            foreignKeyName: "school_years_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      subjects: {
        Row: {
          color: string;
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
          {
            foreignKeyName: "subjects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
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
