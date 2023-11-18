import { createClient } from '@supabase/supabase-js'
const URL = 'https://zwoxdxrkxocadtnzkbko.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3b3hkeHJreG9jYWR0bnprYmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyODI5NjEsImV4cCI6MjAxNTg1ODk2MX0.oEVTyhBQsr0vm8HJxbksbkJQWWd9Xn3LM3XFnnJ0BLA';

export const supabase = createClient(URL, API_KEY);