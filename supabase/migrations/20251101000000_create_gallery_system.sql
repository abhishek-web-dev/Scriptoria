-- Create gallery storage bucket
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true);

-- Create gallery_items table
create table if not exists public.gallery_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  media_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  thumbnail_url text,
  display_order integer default 0,
  is_active boolean default true,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.gallery_items enable row level security;

-- Create policies
create policy "Gallery items are viewable by everyone"
  on public.gallery_items for select
  using (is_active = true);

create policy "Authenticated users can insert gallery items"
  on public.gallery_items for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update gallery items"
  on public.gallery_items for update
  to authenticated
  using (true);

create policy "Authenticated users can delete gallery items"
  on public.gallery_items for delete
  to authenticated
  using (true);

-- Create storage policies
create policy "Gallery files are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'gallery');

create policy "Authenticated users can upload gallery files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery');

create policy "Authenticated users can update gallery files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery');

create policy "Authenticated users can delete gallery files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery');

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger set_updated_at
  before update on public.gallery_items
  for each row
  execute function public.handle_updated_at();

-- Create index for ordering
create index if not exists gallery_items_display_order_idx on public.gallery_items(display_order);
create index if not exists gallery_items_created_at_idx on public.gallery_items(created_at desc);
