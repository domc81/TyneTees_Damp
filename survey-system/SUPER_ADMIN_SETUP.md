# 👑 Super Admin Setup Guide

## 🎯 Overview

This guide provides step-by-step instructions to set up Dominic Clauzel as the super admin user for the Tyne Tees Survey System.

## 📋 Prerequisites

1. Supabase project created and accessible
2. Database migrations applied
3. Temporary RLS policies removed (run `setup-authentication.sql`)

## 🚀 Step-by-Step Setup

### Step 1: Apply Production RLS Policies

Run the SQL from [`setup-authentication.sql`](supabase/setup-authentication.sql):

```bash
# Copy and paste the SQL into Supabase SQL Editor
# Click "Run"
# Verify policies with the verification query
```

### Step 2: Create Super Admin User via Supabase Dashboard

1. **Go to Supabase Dashboard** → Authentication → Users
2. **Click "Add User"** button
3. **Enter User Details**:
   - Email: `dominicclauzel@gmail.com`
   - Password: `#Marcel21!`
   - Confirm Password: `#Marcel21!`
4. **Mark Email as Verified**: Check the "Confirm user" box
5. **Click "Add User"**

### Step 3: Set Custom Claims for Admin Role

After creating the user, set the admin role:

1. **Go to Authentication** → Users
2. **Find the user** dominicclauzel@gmail.com
3. **Click the user** to edit
4. **Add Custom User Claims**:
   ```json
   {
     "role": "admin"
   }
   ```
5. **Save changes**

### Step 4: Create Admin Profile (Optional)

The profile should be created automatically, but you can verify:

```sql
-- Run this in SQL Editor to check/create profile
INSERT INTO profiles (id, email, full_name, role, avatar_url)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'dominicclauzel@gmail.com'),
  'dominicclauzel@gmail.com',
  'Dominic Clauzel',
  'admin',
  'https://avatar.vercel.sh/dominicclauzel'
) 
ON CONFLICT (id) DO UPDATE 
SET email = EXCLUDED.email, 
    full_name = EXCLUDED.full_name, 
    role = EXCLUDED.role, 
    avatar_url = EXCLUDED.avatar_url;
```

### Step 5: Test Super Admin Access

1. **Log in** to the application with:
   - Email: `dominicclauzel@gmail.com`
   - Password: `#Marcel21!`
2. **Verify access** to all features:
   - Customer management
   - Project management
   - Admin settings
   - User management

## 🔐 Security Notes

- **Password Strength**: The password `#Marcel21!` meets complexity requirements
- **Email Verification**: User is marked as verified to allow immediate login
- **Role Assignment**: Admin role provides full system access
- **First User**: This is the initial super admin who can create other users

## 📋 Next Steps

### 1. Implement User Invite System

Create a system for inviting new users:

```sql
-- Uncomment and run from setup-authentication.sql if needed
CREATE TABLE invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'office', 'surveyor')),
  invite_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);
```

### 2. Create Invite Functionality

Implement in the application:
- Admin interface to generate invites
- Email sending with invite links
- Invite acceptance flow
- Role assignment on signup

### 3. Update Application Code

- Add login/logout functionality
- Protect routes based on authentication
- Display user role in UI
- Implement role-based feature access

## 🎓 Admin Responsibilities

As the super admin, you will be responsible for:

1. **User Management**: Creating and managing user accounts
2. **Role Assignment**: Assigning appropriate roles to team members
3. **System Configuration**: Setting up system-wide settings
4. **Security Monitoring**: Overseeing access and permissions
5. **Data Management**: Ensuring data integrity and backups

## 🚨 Troubleshooting

### If login fails:
1. Check user exists in Supabase Auth
2. Verify email is confirmed
3. Check custom claims are set correctly
4. Test with temporary RLS policies disabled

### If access is denied:
1. Verify RLS policies are applied correctly
2. Check user role in custom claims
3. Test with service role temporarily

## 📚 Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Custom Claims Guide](https://supabase.com/docs/guides/auth/managing-user-data)
- [RLS with Auth](https://supabase.com/docs/guides/row-level-security)

## ✅ Setup Complete

Once you've completed these steps:
- ✅ Super admin user created
- ✅ Proper RLS policies applied
- ✅ Authentication system configured
- ✅ Ready to invite team members

The system is now secure and ready for production use with proper authentication.