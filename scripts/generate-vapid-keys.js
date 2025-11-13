#!/usr/bin/env node

/**
 * VAPID Keys Generator for Push Notifications
 * 
 * This script generates VAPID keys needed for Web Push Notifications.
 * Run this script once and save the keys securely.
 * 
 * Usage:
 *   node scripts/generate-vapid-keys.js
 * 
 * Or install web-push globally and use:
 *   npm install -g web-push
 *   web-push generate-vapid-keys
 */

const crypto = require('crypto');

function generateVAPIDKeys() {
  try {
    // Try to use web-push library if available
    const webPush = require('web-push');
    const vapidKeys = webPush.generateVAPIDKeys();
    
    console.log('\n========================================');
    console.log('✅ VAPID Keys Generated Successfully!');
    console.log('========================================\n');
    
    console.log('📋 PUBLIC KEY (Add to src/utils/pushNotifications.ts):');
    console.log('----------------------------------------');
    console.log(vapidKeys.publicKey);
    console.log('----------------------------------------\n');
    
    console.log('🔒 PRIVATE KEY (Store securely in environment variables):');
    console.log('----------------------------------------');
    console.log(vapidKeys.privateKey);
    console.log('----------------------------------------\n');
    
    console.log('⚠️  IMPORTANT:');
    console.log('1. Copy the PUBLIC KEY to src/utils/pushNotifications.ts');
    console.log('2. Store the PRIVATE KEY in Supabase secrets or environment variables');
    console.log('3. NEVER commit the private key to version control!\n');
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('\n========================================');
      console.log('❌ web-push library not found');
      console.log('========================================\n');
      console.log('Please install web-push to generate VAPID keys:\n');
      console.log('Option 1 - Install globally:');
      console.log('  npm install -g web-push');
      console.log('  web-push generate-vapid-keys\n');
      console.log('Option 2 - Install locally:');
      console.log('  npm install web-push');
      console.log('  node scripts/generate-vapid-keys.js\n');
      console.log('Option 3 - Use online generator:');
      console.log('  https://vapidkeys.com/\n');
    } else {
      console.error('Error generating keys:', error);
    }
  }
}

// Run the generator
generateVAPIDKeys();

