-- Quick setup: Just the waitlist table for immediate use
-- Run this in your Supabase SQL Editor

-- Create waitlist table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  referral_code VARCHAR(50) NOT NULL UNIQUE,
  referred_by VARCHAR(50),
  referrer_id UUID REFERENCES waitlist(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX idx_waitlist_referred_by ON waitlist(referred_by);
CREATE INDEX idx_waitlist_referrer_id ON waitlist(referrer_id);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at 
    BEFORE UPDATE ON waitlist 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for counting)
CREATE POLICY "Public can count waitlist entries" ON waitlist
    FOR SELECT USING (true);

-- Create policy for public insert access (for adding to waitlist)
CREATE POLICY "Public can insert waitlist entries" ON waitlist
    FOR INSERT WITH CHECK (true);

-- Add comments for documentation
COMMENT ON TABLE waitlist IS 'Stores waitlist signups with referral tracking';
COMMENT ON COLUMN waitlist.id IS 'Unique identifier for each waitlist entry';
COMMENT ON COLUMN waitlist.name IS 'Name of the person who signed up';
COMMENT ON COLUMN waitlist.email IS 'Email address (unique)';
COMMENT ON COLUMN waitlist.referral_code IS 'Unique code for this user to share';
COMMENT ON COLUMN waitlist.referred_by IS 'Referral code that brought this user';
COMMENT ON COLUMN waitlist.referrer_id IS 'ID of the user who referred this person';