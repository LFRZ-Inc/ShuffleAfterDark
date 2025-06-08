# AfterDark Content Testing Guide

This guide will help you add test content and verify that all AfterDark features are working correctly.

## 🎯 Quick Setup

### 1. Add Test Data to Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `scripts/add-test-data.sql`
4. Click **Run** to execute the script

This will add:
- **5 test creators** (Luna Rose, Alex Storm, Maya Dreams, Phoenix Fire, Sage Waters)
- **8 test scenes** with a mix of SFW/NSFW content
- Sample user interactions

### 2. Test User Setup

To test admin features, you'll need a user with admin role:

```sql
-- Run this in Supabase SQL Editor to make your user an admin
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

## 🧪 Testing Checklist

### ✅ Safe Mode / Full Experience Toggle

**Test Safe Mode (Default ON):**
- [ ] Toggle should show "Safe Mode" in green when enabled
- [ ] Only SFW thumbnails should be visible
- [ ] NSFW scenes should be hidden from browse/shuffle
- [ ] Scene details should show SFW thumbnails only

**Test Full Experience (18+):**
- [ ] Toggle should show "Full Experience (18+)" in primary color when enabled
- [ ] NSFW thumbnails should be visible
- [ ] All content should be accessible
- [ ] Scene details should show NSFW thumbnails when available

### ✅ Browse Page (/browse)

**Grid Display:**
- [ ] Scenes display in responsive grid layout
- [ ] Thumbnails respect SafeMode setting
- [ ] Scene titles, duration, and ratings are visible
- [ ] Creator names are displayed

**Filtering:**
- [ ] Category filters work (All, Romantic, Artistic, etc.)
- [ ] Tag filtering works
- [ ] Search functionality works
- [ ] Sort options work (Recent, Popular, Duration, Rating)
- [ ] Duration filter works (Short, Medium, Long)
- [ ] Rating filter works (4.5+, 4.0+, 3.5+)

**Interactions:**
- [ ] Clicking a scene navigates to scene detail page
- [ ] Like button works
- [ ] Save/bookmark button works

### ✅ Scene Detail Page (/scene/[id])

**Content Display:**
- [ ] Scene title and description are shown
- [ ] Video player or external link works
- [ ] Thumbnails respect SafeMode setting
- [ ] Duration, view count, and rating are displayed
- [ ] Tags are clickable and link to browse page

**Creator Information:**
- [ ] Creator name and bio are displayed
- [ ] Verified badge shows for verified creators
- [ ] Content count is accurate
- [ ] "View Creator Profile" link works

**Interactions:**
- [ ] Like button works and shows count
- [ ] Save/bookmark button works
- [ ] Share button is present
- [ ] Report content button works
- [ ] Download button shows for premium content (if user has access)

**Content Warnings:**
- [ ] NSFW indicator shows when appropriate
- [ ] Premium indicator shows for premium content
- [ ] Age rating displays correctly
- [ ] Content warnings are visible

### ✅ Shuffle Page (/shuffle)

**Shuffle Functionality:**
- [ ] Initial shuffle loads a random scene
- [ ] "Shuffle Again" button loads new content
- [ ] Content respects SafeMode setting
- [ ] Shuffle history prevents immediate repeats
- [ ] Scene interactions work (like, save, watch)

**Content Display:**
- [ ] Scene information is displayed correctly
- [ ] Thumbnails respect SafeMode setting
- [ ] Creator information is shown
- [ ] Action buttons work properly

### ✅ Account Page (/account)

**Profile Tab:**
- [ ] User information is displayed
- [ ] Admin users see "Creator Dashboard" button
- [ ] Edit profile functionality works

**Subscription Tab:**
- [ ] Current subscription tier is shown
- [ ] Available plans are displayed
- [ ] "Upgrade via CCBill" buttons work (should open placeholder URLs)
- [ ] Payment information section is visible

**Privacy Tab:**
- [ ] Incognito mode toggle works
- [ ] Private history toggle works
- [ ] XXX mode status is displayed correctly
- [ ] Data management options are available

### ✅ Creator Dashboard (/creator-dashboard) - Admin Only

**Access Control:**
- [ ] Only admin users can access the page
- [ ] Non-admin users see "Access Denied" message
- [ ] Unauthenticated users are redirected

**Scene Management:**
- [ ] List of all scenes is displayed
- [ ] Edit button opens scene for editing
- [ ] Delete button removes scenes (with confirmation)
- [ ] Toggle active/inactive status works

**Add New Scene Form:**
- [ ] All required fields are present:
  - [ ] Title (required)
  - [ ] Description
  - [ ] SFW Thumbnail URL
  - [ ] NSFW Thumbnail URL
  - [ ] Video URL (required)
  - [ ] Tags (comma-separated)
  - [ ] Duration in seconds (required)
  - [ ] Creator dropdown
  - [ ] License URL
  - [ ] License verified checkbox
  - [ ] NSFW checkbox
  - [ ] Premium checkbox
- [ ] Form validation works
- [ ] Successful submission adds scene to database
- [ ] Form resets after successful submission

### ✅ Header Navigation

**Branding:**
- [ ] Logo shows "A" instead of "S"
- [ ] Brand name shows "AfterDark" instead of "ShuffleAfterDark"

**Toggle Labels:**
- [ ] Shows "Safe Mode" when enabled (green text)
- [ ] Shows "Full Experience (18+)" when disabled (primary color)
- [ ] Toggle animation works smoothly
- [ ] Tooltip shows appropriate message

**Navigation:**
- [ ] All navigation links work
- [ ] User menu shows when logged in
- [ ] Sign in button shows when not logged in

## 🎬 Test Content Overview

The test data includes:

### Creators (5 total)
- **Luna Rose** - 3 scenes (artistic/romantic focus)
- **Alex Storm** - 2 scenes (couples content)
- **Maya Dreams** - 1 scene (artistic solo)
- **Phoenix Fire** - 1 scene (performance/dance)
- **Sage Waters** - 1 scene (premium content)

### Scenes (8 total)
1. **Romantic Evening** (NSFW, Free) - Luna Rose
2. **Artistic Expression** (SFW, Free) - Maya Dreams
3. **Passionate Moments** (NSFW, Premium) - Alex Storm
4. **Sensual Dance** (SFW, Free) - Phoenix Fire
5. **Premium Collection** (NSFW, Premium) - Sage Waters
6. **Gentle Intimacy** (NSFW, Free) - Luna Rose
7. **Creative Expression** (SFW, Premium) - Maya Dreams
8. **Couples Retreat** (NSFW, Premium) - Alex Storm

### Content Mix
- **SFW Content:** 3 scenes (safe for Safe Mode)
- **NSFW Content:** 5 scenes (hidden in Safe Mode)
- **Free Content:** 5 scenes
- **Premium Content:** 3 scenes
- **Various durations:** 12-40 minutes
- **Multiple tags:** romantic, artistic, couples, dance, premium, etc.

## 🐛 Common Issues & Solutions

### No Content Showing
- Check if test data was added successfully
- Verify SafeMode setting matches expected content
- Check browser console for errors

### Admin Dashboard Not Accessible
- Verify user role is set to 'admin' in database
- Check if user is properly authenticated
- Ensure age verification is completed

### Thumbnails Not Loading
- Placeholder images use picsum.photos (requires internet)
- Check if URLs are accessible
- Verify SafeMode is showing correct thumbnail type

### Video Player Issues
- Test videos use Google's sample videos
- External links should open in new tab
- Check if URLs are accessible

## 🚀 Next Steps

After testing, you can:

1. **Replace test content** with real content
2. **Update video URLs** to point to your CDN or affiliate links
3. **Customize thumbnails** with your own images
4. **Add more creators** and content
5. **Configure real payment processing** with CCBill

## 📞 Support

If you encounter issues:
1. Check browser console for JavaScript errors
2. Verify Supabase connection and data
3. Test with different browsers
4. Check network connectivity for external resources 