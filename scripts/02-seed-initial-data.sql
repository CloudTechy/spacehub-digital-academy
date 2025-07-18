-- Seed initial data for SpaceHub platform

-- Insert categories
INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
(uuid_generate_v4(), 'Web Development', 'web-development', 'Learn modern web development technologies', 'Code', '#3B82F6', 1),
(uuid_generate_v4(), 'UI/UX Design', 'ui-ux-design', 'Master user interface and experience design', 'Palette', '#8B5CF6', 2),
(uuid_generate_v4(), 'Data Science', 'data-science', 'Explore data analysis and machine learning', 'BarChart', '#10B981', 3),
(uuid_generate_v4(), 'Mobile Development', 'mobile-development', 'Build mobile applications for iOS and Android', 'Smartphone', '#F59E0B', 4),
(uuid_generate_v4(), 'Digital Marketing', 'digital-marketing', 'Learn online marketing strategies', 'TrendingUp', '#EF4444', 5),
(uuid_generate_v4(), 'Cybersecurity', 'cybersecurity', 'Protect systems and data from threats', 'Shield', '#6366F1', 6);

-- Insert demo users
INSERT INTO users (id, email, password_hash, first_name, last_name, role, bio, is_active, email_verified) VALUES
-- Students
(uuid_generate_v4(), 'student@spacehub.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'John', 'Doe', 'student', 'Passionate learner interested in web development', true, true),
(uuid_generate_v4(), 'jane.smith@spacehub.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Jane', 'Smith', 'student', 'Designer looking to expand technical skills', true, true),
-- Instructors
(uuid_generate_v4(), 'instructor@spacehub.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Sarah', 'Johnson', 'instructor', 'Senior Full Stack Developer with 8+ years experience', true, true),
(uuid_generate_v4(), 'mike.wilson@spacehub.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Mike', 'Wilson', 'instructor', 'UX Designer and Product Manager', true, true),
-- Admin
(uuid_generate_v4(), 'admin@spacehub.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Admin', 'User', 'admin', 'Platform administrator', true, true);

-- Insert instructor profiles
INSERT INTO instructors (user_id, title, expertise, years_experience, total_students, total_courses, rating, total_reviews, is_verified)
SELECT 
    u.id,
    CASE 
        WHEN u.email = 'instructor@spacehub.com' THEN 'Senior Full Stack Developer'
        WHEN u.email = 'mike.wilson@spacehub.com' THEN 'UX Design Expert'
    END,
    CASE 
        WHEN u.email = 'instructor@spacehub.com' THEN ARRAY['JavaScript', 'React', 'Node.js', 'Python']
        WHEN u.email = 'mike.wilson@spacehub.com' THEN ARRAY['UI Design', 'UX Research', 'Figma', 'Prototyping']
    END,
    CASE 
        WHEN u.email = 'instructor@spacehub.com' THEN 8
        WHEN u.email = 'mike.wilson@spacehub.com' THEN 6
    END,
    CASE 
        WHEN u.email = 'instructor@spacehub.com' THEN 1250
        WHEN u.email = 'mike.wilson@spacehub.com' THEN 890
    END,
    CASE 
        WHEN u.email = 'instructor@spacehub.com' THEN 3
        WHEN u.email = 'mike.wilson@spacehub.com' THEN 2
    END,
    4.8,
    CASE 
        WHEN u.email = 'instructor@spacehub.com' THEN 156
        WHEN u.email = 'mike.wilson@spacehub.com' THEN 98
    END,
    true
FROM users u 
WHERE u.role = 'instructor';

-- Insert sample leads
INSERT INTO leads (email, first_name, last_name, source, interests) VALUES
('lead1@example.com', 'Alice', 'Brown', 'landing_page', ARRAY['web-development']),
('lead2@example.com', 'Bob', 'Davis', 'landing_page', ARRAY['ui-ux-design', 'web-development']),
('lead3@example.com', 'Carol', 'Miller', 'social_media', ARRAY['data-science']),
('lead4@example.com', 'David', 'Wilson', 'landing_page', ARRAY['mobile-development']);

-- Insert sample contact submissions
INSERT INTO contact_submissions (name, email, subject, message) VALUES
('Emma Thompson', 'emma@example.com', 'Course Inquiry', 'Hi, I am interested in your web development courses. Can you provide more information about the curriculum?'),
('James Rodriguez', 'james@example.com', 'Technical Support', 'I am having trouble accessing my enrolled course. Can you help?'),
('Lisa Chen', 'lisa@example.com', 'Partnership Opportunity', 'I represent a tech company and would like to discuss potential partnerships.');
