-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    mobile TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id)
);

-- Create book_submissions table
CREATE TABLE IF NOT EXISTS public.book_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_name TEXT,
    status TEXT DEFAULT 'under_review' CHECK (status IN ('under_review', 'approved', 'published', 'rejected')),
    admin_comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create storage bucket for book manuscripts
INSERT INTO storage.buckets (id, name, public)
VALUES ('book-manuscripts', 'book-manuscripts', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view their own profile"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- Policies for book_submissions
CREATE POLICY "Users can view their own submissions"
    ON public.book_submissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions"
    ON public.book_submissions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions"
    ON public.book_submissions FOR UPDATE
    USING (auth.uid() = user_id);

-- Admin policies (you'll need to set up admin role)
CREATE POLICY "Admins can view all submissions"
    ON public.book_submissions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email LIKE '%@admin.com' -- Change this to your admin email pattern
        )
    );

CREATE POLICY "Admins can update all submissions"
    ON public.book_submissions FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email LIKE '%@admin.com' -- Change this to your admin email pattern
        )
    );

-- Storage policies for book-manuscripts bucket
CREATE POLICY "Users can upload their own manuscripts"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'book-manuscripts' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can view their own manuscripts"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (
        bucket_id = 'book-manuscripts' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Public can view manuscripts"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'book-manuscripts');

CREATE POLICY "Admins can view all manuscripts"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (
        bucket_id = 'book-manuscripts' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email LIKE '%@admin.com'
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_book_submissions_user_id ON public.book_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_book_submissions_status ON public.book_submissions(status);
CREATE INDEX IF NOT EXISTS idx_book_submissions_created_at ON public.book_submissions(created_at DESC);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_book_submissions_updated_at
    BEFORE UPDATE ON public.book_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
