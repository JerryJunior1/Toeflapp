import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      email: user.email,
      full_name: user.user_metadata?.full_name,
      target_score: user.user_metadata?.target_score,
    });
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: error.message || 'Failed to fetch profile' }, { status: 500 });
  }
}
