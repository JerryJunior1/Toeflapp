import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('practice_sessions').select('task_type, score_value, created_at, score_details').order('created_at', { ascending: false }).limit(20);
  return NextResponse.json({ data, error });
}
