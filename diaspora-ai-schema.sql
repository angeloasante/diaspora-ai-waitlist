-- ==============================================
-- DIASPORA AI FLIGHT BOOKING DATABASE SCHEMA
-- ==============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ==============================================
-- USER MANAGEMENT
-- ==============================================

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    date_of_birth DATE,
    nationality VARCHAR(3), -- ISO 3-letter country code
    passport_number VARCHAR(50),
    passport_expiry DATE,
    preferred_currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Waitlist for early access (original functionality)
CREATE TABLE waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    referred_by VARCHAR(50),
    referrer_id UUID REFERENCES waitlist(id),
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, converted
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- FLIGHT DATA
-- ==============================================

-- Airlines
CREATE TABLE airlines (
    iata_code VARCHAR(3) PRIMARY KEY,
    icao_code VARCHAR(4) UNIQUE,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(3), -- ISO country code
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Airports
CREATE TABLE airports (
    iata_code VARCHAR(3) PRIMARY KEY,
    icao_code VARCHAR(4) UNIQUE,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(3) NOT NULL, -- ISO country code
    timezone VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- BOOKING SYSTEM
-- ==============================================

-- Flight searches (for analytics)
CREATE TABLE flight_searches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    origin VARCHAR(3) NOT NULL REFERENCES airports(iata_code),
    destination VARCHAR(3) NOT NULL REFERENCES airports(iata_code),
    departure_date DATE NOT NULL,
    return_date DATE,
    passengers JSONB NOT NULL DEFAULT '{"adults": 1, "children": 0, "infants": 0}',
    cabin_class VARCHAR(20) DEFAULT 'economy', -- economy, premium_economy, business, first
    search_results_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id),
    pnr VARCHAR(20) UNIQUE NOT NULL, -- Passenger Name Record
    airline_confirmation VARCHAR(50),
    duffel_offer_id VARCHAR(255), -- Reference to Duffel API offer
    
    -- Flight details
    origin VARCHAR(3) NOT NULL REFERENCES airports(iata_code),
    destination VARCHAR(3) NOT NULL REFERENCES airports(iata_code),
    departure_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    arrival_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    return_departure_datetime TIMESTAMP WITH TIME ZONE,
    return_arrival_datetime TIMESTAMP WITH TIME ZONE,
    
    -- Booking details
    total_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    booking_status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded, failed
    
    -- Passenger info
    passengers JSONB NOT NULL, -- Array of passenger objects
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT
);

-- Flight segments (for multi-city or connecting flights)
CREATE TABLE flight_segments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    airline_code VARCHAR(3) NOT NULL REFERENCES airlines(iata_code),
    flight_number VARCHAR(10) NOT NULL,
    
    origin VARCHAR(3) NOT NULL REFERENCES airports(iata_code),
    destination VARCHAR(3) NOT NULL REFERENCES airports(iata_code),
    departure_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    arrival_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    
    aircraft_type VARCHAR(10),
    seat_class VARCHAR(20),
    baggage_allowance JSONB, -- Carry-on and checked baggage details
    
    segment_order INTEGER NOT NULL, -- For ordering multiple segments
    is_return_segment BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- PAYMENTS
-- ==============================================

-- Payments
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id),
    stripe_payment_intent_id VARCHAR(255),
    paystack_reference VARCHAR(255),
    
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    payment_method VARCHAR(20) NOT NULL, -- card, apple_pay, google_pay
    payment_provider VARCHAR(20) NOT NULL, -- stripe, paystack
    
    status VARCHAR(20) DEFAULT 'pending', -- pending, succeeded, failed, refunded
    failure_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TRAVEL SERVICES
-- ==============================================

-- Visa requirements cache
CREATE TABLE visa_requirements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nationality VARCHAR(3) NOT NULL, -- Passport country
    destination VARCHAR(3) NOT NULL, -- Destination country
    visa_required BOOLEAN NOT NULL,
    visa_type VARCHAR(50), -- tourist, business, transit, etc.
    max_stay_days INTEGER,
    requirements JSONB, -- Documents, fees, etc.
    
    -- Cache management
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
    
    UNIQUE(nationality, destination)
);

-- Check-in reminders
CREATE TABLE checkin_reminders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id),
    reminder_sent BOOLEAN DEFAULT false,
    reminder_sent_at TIMESTAMP WITH TIME ZONE,
    checkin_url TEXT,
    qr_code_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets
CREATE TABLE support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    booking_id UUID REFERENCES bookings(id),
    
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open', -- open, in_progress, resolved, closed
    priority VARCHAR(10) DEFAULT 'medium', -- low, medium, high, urgent
    
    assigned_to UUID, -- Staff member
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Support messages
CREATE TABLE support_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    sender_id UUID, -- User or staff member
    sender_type VARCHAR(10) NOT NULL, -- user, staff, system
    
    message TEXT NOT NULL,
    attachments JSONB, -- File URLs
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- INDEXES FOR PERFORMANCE
-- ==============================================

-- Profiles
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);

-- Waitlist
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX idx_waitlist_status ON waitlist(status);

-- Flight searches
CREATE INDEX idx_flight_searches_user_id ON flight_searches(user_id);
CREATE INDEX idx_flight_searches_route ON flight_searches(origin, destination);
CREATE INDEX idx_flight_searches_date ON flight_searches(departure_date);

-- Bookings
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_pnr ON bookings(pnr);
CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_departure ON bookings(departure_datetime);

-- Flight segments
CREATE INDEX idx_flight_segments_booking_id ON flight_segments(booking_id);
CREATE INDEX idx_flight_segments_airline ON flight_segments(airline_code);
CREATE INDEX idx_flight_segments_route ON flight_segments(origin, destination);

-- Payments
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_stripe_id ON payments(stripe_payment_intent_id);

-- Visa requirements
CREATE INDEX idx_visa_requirements_route ON visa_requirements(nationality, destination);
CREATE INDEX idx_visa_requirements_expires ON visa_requirements(expires_at);

-- Support
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_messages_ticket_id ON support_messages(ticket_id);

-- ==============================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Waitlist: Public read, anyone can insert
CREATE POLICY "Allow public read access" ON waitlist FOR SELECT USING (true);
CREATE POLICY "Allow insert for all users" ON waitlist FOR INSERT WITH CHECK (true);

-- Bookings: Users can only see their own bookings
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);

-- Flight segments: Users can only see segments for their bookings
CREATE POLICY "Users can view own flight segments" ON flight_segments FOR SELECT USING (
    EXISTS (SELECT 1 FROM bookings WHERE bookings.id = flight_segments.booking_id AND bookings.user_id = auth.uid())
);

-- Payments: Users can only see their own payments
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (
    EXISTS (SELECT 1 FROM bookings WHERE bookings.id = payments.booking_id AND bookings.user_id = auth.uid())
);

-- Support: Users can only see their own tickets and messages
CREATE POLICY "Users can view own support tickets" ON support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create support tickets" ON support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view messages for own tickets" ON support_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM support_tickets WHERE support_tickets.id = support_messages.ticket_id AND support_tickets.user_id = auth.uid())
);

-- ==============================================
-- TRIGGERS FOR AUTO-UPDATING TIMESTAMPS
-- ==============================================

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_waitlist_updated_at BEFORE UPDATE ON waitlist 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- SAMPLE DATA (Optional - for development)
-- ==============================================

-- Insert sample airlines
INSERT INTO airlines (iata_code, icao_code, name, country) VALUES
('AA', 'AAL', 'American Airlines', 'USA'),
('BA', 'BAW', 'British Airways', 'GBR'),
('LH', 'DLH', 'Lufthansa', 'DEU'),
('EK', 'UAE', 'Emirates', 'ARE'),
('AF', 'AFR', 'Air France', 'FRA'),
('KL', 'KLM', 'KLM Royal Dutch Airlines', 'NLD'),
('QR', 'QTR', 'Qatar Airways', 'QAT'),
('TK', 'THY', 'Turkish Airlines', 'TUR'),
('ET', 'ETH', 'Ethiopian Airlines', 'ETH'),
('MS', 'MSR', 'EgyptAir', 'EGY');

-- Insert sample airports
INSERT INTO airports (iata_code, icao_code, name, city, country, timezone) VALUES
('JFK', 'KJFK', 'John F. Kennedy International Airport', 'New York', 'USA', 'America/New_York'),
('LHR', 'EGLL', 'London Heathrow Airport', 'London', 'GBR', 'Europe/London'),
('CDG', 'LFPG', 'Charles de Gaulle Airport', 'Paris', 'FRA', 'Europe/Paris'),
('FRA', 'EDDF', 'Frankfurt Airport', 'Frankfurt', 'DEU', 'Europe/Berlin'),
('DXB', 'OMDB', 'Dubai International Airport', 'Dubai', 'ARE', 'Asia/Dubai'),
('DOH', 'OTHH', 'Hamad International Airport', 'Doha', 'QAT', 'Asia/Qatar'),
('IST', 'LTFM', 'Istanbul Airport', 'Istanbul', 'TUR', 'Europe/Istanbul'),
('ACC', 'DGAA', 'Kotoka International Airport', 'Accra', 'GHA', 'Africa/Accra'),
('LOS', 'DNMM', 'Murtala Muhammed International Airport', 'Lagos', 'NGA', 'Africa/Lagos'),
('NBO', 'HKJK', 'Jomo Kenyatta International Airport', 'Nairobi', 'KEN', 'Africa/Nairobi'),
('CPT', 'FACT', 'Cape Town International Airport', 'Cape Town', 'ZAF', 'Africa/Johannesburg'),
('CAI', 'HECA', 'Cairo International Airport', 'Cairo', 'EGY', 'Africa/Cairo'),
('ADD', 'HAAB', 'Addis Ababa Bole International Airport', 'Addis Ababa', 'ETH', 'Africa/Addis_Ababa');

-- ==============================================
-- FUNCTIONS FOR BUSINESS LOGIC
-- ==============================================

-- Function to generate PNR (Passenger Name Record)
CREATE OR REPLACE FUNCTION generate_pnr()
RETURNS VARCHAR(6) AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result VARCHAR(6) := '';
    i INTEGER := 0;
BEGIN
    FOR i IN 1..6 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate booking expiry (24 hours from creation)
CREATE OR REPLACE FUNCTION calculate_booking_expiry(booking_created TIMESTAMP WITH TIME ZONE)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
    RETURN booking_created + INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Function to check if check-in reminder should be sent
CREATE OR REPLACE FUNCTION should_send_checkin_reminder(departure_time TIMESTAMP WITH TIME ZONE)
RETURNS BOOLEAN AS $$
BEGIN
    -- Send reminder 24-48 hours before departure
    RETURN departure_time BETWEEN NOW() + INTERVAL '24 hours' AND NOW() + INTERVAL '48 hours';
END;
$$ LANGUAGE plpgsql;

-- ==============================================
-- VIEWS FOR EASY DATA ACCESS
-- ==============================================

-- Booking summary view
CREATE VIEW booking_summary AS
SELECT 
    b.id,
    b.pnr,
    b.user_id,
    p.email,
    p.first_name,
    p.last_name,
    b.origin,
    ao.name AS origin_airport,
    ao.city AS origin_city,
    b.destination,
    ad.name AS destination_airport,
    ad.city AS destination_city,
    b.departure_datetime,
    b.arrival_datetime,
    b.total_amount,
    b.currency,
    b.booking_status,
    b.payment_status,
    b.created_at
FROM bookings b
LEFT JOIN profiles p ON b.user_id = p.id
LEFT JOIN airports ao ON b.origin = ao.iata_code
LEFT JOIN airports ad ON b.destination = ad.iata_code;

-- Flight search analytics view
CREATE VIEW search_analytics AS
SELECT 
    origin,
    destination,
    COUNT(*) as search_count,
    AVG(search_results_count) as avg_results,
    DATE_TRUNC('day', created_at) as search_date
FROM flight_searches
GROUP BY origin, destination, DATE_TRUNC('day', created_at)
ORDER BY search_count DESC;

-- User booking history view
CREATE VIEW user_booking_history AS
SELECT 
    p.id as user_id,
    p.email,
    p.first_name,
    p.last_name,
    COUNT(b.id) as total_bookings,
    SUM(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount ELSE 0 END) as total_spent,
    MAX(b.created_at) as last_booking_date,
    MIN(b.created_at) as first_booking_date
FROM profiles p
LEFT JOIN bookings b ON p.id = b.user_id
GROUP BY p.id, p.email, p.first_name, p.last_name;

-- ==============================================
-- COMMENTS FOR DOCUMENTATION
-- ==============================================

COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth with travel-specific data';
COMMENT ON TABLE waitlist IS 'Waitlist signups with referral tracking for early access';
COMMENT ON TABLE airlines IS 'Airline reference data from IATA/ICAO standards';
COMMENT ON TABLE airports IS 'Airport reference data with geographic information';
COMMENT ON TABLE bookings IS 'Flight bookings with passenger and payment information';
COMMENT ON TABLE flight_segments IS 'Individual flight segments for complex itineraries';
COMMENT ON TABLE payments IS 'Payment transactions for bookings';
COMMENT ON TABLE visa_requirements IS 'Cached visa requirements by nationality and destination';
COMMENT ON TABLE support_tickets IS 'Customer support tickets and resolution tracking';

COMMENT ON COLUMN bookings.pnr IS 'Passenger Name Record - unique booking identifier';
COMMENT ON COLUMN bookings.duffel_offer_id IS 'Reference to Duffel API offer for price updates';
COMMENT ON COLUMN bookings.passengers IS 'JSON array of passenger details (name, passport, etc.)';
COMMENT ON COLUMN flight_segments.baggage_allowance IS 'JSON object with carry-on and checked baggage limits';
COMMENT ON COLUMN visa_requirements.requirements IS 'JSON object with documents, fees, processing time, etc.';