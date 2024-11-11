-- 1_create_initial_schema.sql
create schema if not exists public;

-- Enable RLS
alter database postgres set "request.jwt.claim.sub" to '';

-- Create extensions
create extension if not exists "uuid-ossp";

-- Create school_years table
create table public.school_years (
    id bigint generated always as identity primary key,
    user_id uuid references auth.users(id) not null,
    class integer not null,
    grading_system text not null default '1-6',
    vacation_region text not null default 'BY',
    timetable jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create subjects table
create table public.subjects (
    id bigint generated always as identity primary key,
    user_id uuid references auth.users(id) not null,
    school_year_id bigint references public.school_years(id) not null,
    name text not null,
    color text not null,
    icon text not null,
    teacher text,
    room text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint fk_school_year foreign key (school_year_id) references public.school_years(id) on delete cascade
);

-- Create exam_type_groups table
create table public.exam_type_groups (
    id bigint generated always as identity primary key,
    user_id uuid references auth.users(id) not null,
    school_year_id bigint references public.school_years(id) not null,
    name text not null,
    weight numeric not null check (weight >= 0),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint fk_school_year_group foreign key (school_year_id) references public.school_years(id) on delete cascade
);

-- Create exam_types table
create table public.exam_types (
    id bigint generated always as identity primary key,
    user_id uuid references auth.users(id) not null,
    school_year_id bigint references public.school_years(id) not null,
    group_id bigint references public.exam_type_groups(id) not null,
    name text not null,
    weight numeric not null check (weight >= 0),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint fk_school_year_type foreign key (school_year_id) references public.school_years(id) on delete cascade,
    constraint fk_exam_type_group foreign key (group_id) references public.exam_type_groups(id) on delete cascade
);

-- Create exams table
create table public.exams (
    id bigint generated always as identity primary key,
    user_id uuid references auth.users(id) not null,
    subject_id bigint references public.subjects(id) not null,
    exam_type_id bigint references public.exam_types(id) not null,
    date_written date not null,
    date_returned date,
    grade numeric check (grade >= 0),
    grade_modifier text,
    description text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint fk_subject foreign key (subject_id) references public.subjects(id) on delete cascade,
    constraint fk_exam_type foreign key (exam_type_id) references public.exam_types(id) on delete cascade
);

-- Create homework table
create table public.homework (
    id bigint generated always as identity primary key,
    user_id uuid references auth.users(id) not null,
    school_year_id bigint references public.school_years(id) not null,
    subject_id bigint references public.subjects(id),
    task text not null,
    due_date date not null,
    done boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint fk_school_year_task foreign key (school_year_id) references public.school_years(id) on delete cascade
);

-- 2_create_row_level_security.sql

-- Enable Row Level Security
alter table public.school_years enable row level security;
alter table public.subjects enable row level security;
alter table public.exam_type_groups enable row level security;
alter table public.exam_types enable row level security;
alter table public.exams enable row level security;
alter table public.homework enable row level security;

-- Create policies
-- school_years policies
create policy "Users can view their own school years"
    on public.school_years for select
    using (auth.uid() = user_id);

create policy "Users can insert their own school years"
    on public.school_years for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own school years"
    on public.school_years for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own school years"
    on public.school_years for delete
    using (auth.uid() = user_id);

-- subjects policies
create policy "Users can view their own subjects"
    on public.subjects for select
    using (auth.uid() = user_id);

create policy "Users can insert their own subjects"
    on public.subjects for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own subjects"
    on public.subjects for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own subjects"
    on public.subjects for delete
    using (auth.uid() = user_id);

-- exam_type_groups policies
create policy "Users can view their own exam type groups"
    on public.exam_type_groups for select
    using (auth.uid() = user_id);

create policy "Users can insert their own exam type groups"
    on public.exam_type_groups for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own exam type groups"
    on public.exam_type_groups for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own exam type groups"
    on public.exam_type_groups for delete
    using (auth.uid() = user_id);

-- exam_types policies
create policy "Users can view their own exam types"
    on public.exam_types for select
    using (auth.uid() = user_id);

create policy "Users can insert their own exam types"
    on public.exam_types for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own exam types"
    on public.exam_types for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own exam types"
    on public.exam_types for delete
    using (auth.uid() = user_id);

-- exams policies
create policy "Users can view their own exams"
    on public.exams for select
    using (auth.uid() = user_id);

create policy "Users can insert their own exams"
    on public.exams for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own exams"
    on public.exams for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own exams"
    on public.exams for delete
    using (auth.uid() = user_id);

-- homework policies
create policy "Users can view their own homework"
    on public.homework for select
    using (auth.uid() = user_id);

create policy "Users can insert their own homework"
    on public.homework for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own homework"
    on public.homework for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own homework"
    on public.homework for delete
    using (auth.uid() = user_id);

-- 3_create_triggers.sql

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Add updated_at triggers to all tables
create trigger handle_updated_at
    before update on public.school_years
    for each row
    execute function public.handle_updated_at();

create trigger handle_updated_at
    before update on public.subjects
    for each row
    execute function public.handle_updated_at();

create trigger handle_updated_at
    before update on public.exam_type_groups
    for each row
    execute function public.handle_updated_at();

create trigger handle_updated_at
    before update on public.exam_types
    for each row
    execute function public.handle_updated_at();

create trigger handle_updated_at
    before update on public.exams
    for each row
    execute function public.handle_updated_at();

create trigger handle_updated_at
    before update on public.homework
    for each row
    execute function public.handle_updated_at();

-- 4_create_indexes.sql

-- Add indexes for foreign keys and commonly queried fields
create index idx_school_years_user_id on public.school_years(user_id);

create index idx_subjects_user_id on public.subjects(user_id);
create index idx_subjects_school_year_id on public.subjects(school_year_id);

create index idx_exam_type_groups_user_id on public.exam_type_groups(user_id);
create index idx_exam_type_groups_school_year_id on public.exam_type_groups(school_year_id);

create index idx_exam_types_user_id on public.exam_types(user_id);
create index idx_exam_types_school_year_id on public.exam_types(school_year_id);
create index idx_exam_types_group_id on public.exam_types(group_id);

create index idx_exams_user_id on public.exams(user_id);
create index idx_exams_subject_id on public.exams(subject_id);
create index idx_exams_exam_type_id on public.exams(exam_type_id);
create index idx_exams_date_written on public.exams(date_written);

create index idx_homework_user_id on public.homework(user_id);
create index idx_homework_school_year_id on public.homework(school_year_id);
create index idx_homework_subject_id on public.homework(subject_id);
create index idx_homework_due_date on public.homework(due_date);
create index idx_homework_done on public.homework(done);
