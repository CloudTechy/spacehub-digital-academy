-- Seed initial data for SpaceHub Learning Platform

-- Insert categories
INSERT INTO categories (id, name, slug, description, icon, color) VALUES
(uuid_generate_v4(), 'Web Development', 'web-development', 'Learn to build modern web applications', 'code', '#3B82F6'),
(uuid_generate_v4(), 'Design', 'design', 'Master UI/UX and visual design', 'palette', '#8B5CF6'),
(uuid_generate_v4(), 'Data Science', 'data-science', 'Analyze data and build ML models', 'bar-chart', '#10B981'),
(uuid_generate_v4(), 'Marketing', 'marketing', 'Digital marketing and social media', 'megaphone', '#F59E0B'),
(uuid_generate_v4(), 'Mobile Development', 'mobile-development', 'Build iOS and Android apps', 'smartphone', '#EF4444'),
(uuid_generate_v4(), 'Cybersecurity', 'cybersecurity', 'Protect systems and data', 'shield', '#6366F1');

-- Insert demo users
INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_verified, is_active) VALUES
-- Students
(uuid_generate_v4(), 'student@demo.com', '$2b$10$demo_hash_for_password123', 'Demo', 'Student', 'student', true, true),
(uuid_generate_v4(), 'john.doe@example.com', '$2b$10$demo_hash_for_password123', 'John', 'Doe', 'student', true, true),
(uuid_generate_v4(), 'jane.smith@example.com', '$2b$10$demo_hash_for_password123', 'Jane', 'Smith', 'student', true, true),

-- Instructors
(uuid_generate_v4(), 'instructor@demo.com', '$2b$10$demo_hash_for_password123', 'Demo', 'Instructor', 'instructor', true, true),
(uuid_generate_v4(), 'sarah.adebayo@example.com', '$2b$10$demo_hash_for_password123', 'Sarah', 'Adebayo', 'instructor', true, true),
(uuid_generate_v4(), 'james.okafor@example.com', '$2b$10$demo_hash_for_password123', 'James', 'Okafor', 'instructor', true, true),
(uuid_generate_v4(), 'ada.nwosu@example.com', '$2b$10$demo_hash_for_password123', 'Ada', 'Nwosu', 'instructor', true, true),
(uuid_generate_v4(), 'kemi.johnson@example.com', '$2b$10$demo_hash_for_password123', 'Kemi', 'Johnson', 'instructor', true, true),

-- Admin
(uuid_generate_v4(), 'admin@spacehub.com', '$2b$10$demo_hash_for_password123', 'Admin', 'User', 'admin', true, true);

-- Insert instructor profiles
INSERT INTO instructors (user_id, title, company, experience_years, linkedin_url, rating, total_students, total_courses, is_featured)
SELECT 
    u.id,
    CASE 
        WHEN u.email = 'instructor@demo.com' THEN 'Senior Developer'
        WHEN u.email = 'sarah.adebayo@example.com' THEN 'Senior Product Designer'
        WHEN u.email = 'james.okafor@example.com' THEN 'Full-Stack Developer'
        WHEN u.email = 'ada.nwosu@example.com' THEN 'Data Science Manager'
        WHEN u.email = 'kemi.johnson@example.com' THEN 'Digital Marketing Director'
    END,
    CASE 
        WHEN u.email = 'instructor@demo.com' THEN 'SpaceHub'
        WHEN u.email = 'sarah.adebayo@example.com' THEN 'Paystack'
        WHEN u.email = 'james.okafor@example.com' THEN 'Andela'
        WHEN u.email = 'ada.nwosu@example.com' THEN 'Jumia'
        WHEN u.email = 'kemi.johnson@example.com' THEN 'GTBank'
    END,
    CASE 
        WHEN u.email = 'instructor@demo.com' THEN 5
        WHEN u.email = 'sarah.adebayo@example.com' THEN 8
        WHEN u.email = 'james.okafor@example.com' THEN 10
        WHEN u.email = 'ada.nwosu@example.com' THEN 7
        WHEN u.email = 'kemi.johnson@example.com' THEN 6
    END,
    'https://linkedin.com/in/' || LOWER(REPLACE(u.first_name || '-' || u.last_name, ' ', '-')),
    4.8 + (RANDOM() * 0.2),
    FLOOR(RANDOM() * 1000) + 100,
    FLOOR(RANDOM() * 5) + 1,
    RANDOM() > 0.5
FROM users u 
WHERE u.role = 'instructor';
