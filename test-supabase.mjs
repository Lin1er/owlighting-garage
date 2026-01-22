// Test Supabase connection
// Run with: node test-supabase.mjs

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oupgfisicnfmkrdhkrvl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cGdmaXNpY25mbWtyZGhrcnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MTYxNTQsImV4cCI6MjA4MzE5MjE1NH0.aozc1ANbIOyYdU9huQ9bYra7lk1HkxxT3XtpzBmU-bY";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("🔍 Testing Supabase connection...\n");

  try {
    // Test 1: List tables
    console.log("1️⃣ Checking if tables exist...");
    const { data: tables, error: tablesError } = await supabase
      .from("tiktok_videos")
      .select("*", { count: "exact", head: true });

    if (tablesError) {
      console.error("❌ Error:", tablesError.message);
      console.log("\n⚠️  You need to run the migration SQL first!");
      console.log("   Go to: https://supabase.com/dashboard/project/oupgfisicnfmkrdhkrvl/sql");
      console.log("   Run: supabase/migrations/001_initial_schema.sql\n");
      return;
    }

    console.log("✅ Tables exist!");
    console.log(`   Found ${tables?.length || 0} videos\n`);

    // Test 2: Fetch videos
    console.log("2️⃣ Fetching videos from database...");
    const { data: videos, error: videosError } = await supabase
      .from("tiktok_videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (videosError) {
      console.error("❌ Error fetching videos:", videosError.message);
      return;
    }

    if (videos && videos.length > 0) {
      console.log(`✅ Found ${videos.length} videos:`);
      videos.forEach((v, i) => {
        console.log(`   ${i + 1}. ${v.title} (${v.category})`);
      });
    } else {
      console.log("⚠️  No videos in database yet");
      console.log("   Add videos via: http://localhost:3000/admin/videos");
    }

    console.log("\n✅ Supabase connection successful!");
    console.log("\n🎯 Next steps:");
    console.log("   1. Run: npm run dev");
    console.log("   2. Go to: http://localhost:3000/admin/videos");
    console.log("   3. Add some videos!");
    console.log("   4. Check: http://localhost:3000/blog\n");

  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

testConnection();
