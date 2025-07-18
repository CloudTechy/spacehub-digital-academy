-- Insert sample course reviews
INSERT INTO course_reviews (course_id, student_id, rating, review_text, is_verified, created_at)
SELECT 
    c.id,
    u.id,
    review_rating,
    review_text,
    true,
    CURRENT_TIMESTAMP - INTERVAL '1 day' * FLOOR(RANDOM() * 30)
FROM courses c
CROSS JOIN users u
CROSS JOIN (
    VALUES 
        (5, 'This course changed my life! I went from knowing nothing about coding to landing a $2,500/month remote job. The instructor is excellent and the projects are real-world.'),
        (5, 'The projects are incredibly practical and the mentorship is invaluable. I''m now working as a developer at a fintech startup. Highly recommended!'),
        (4, 'Great course content and structure. The pace is perfect for beginners. Only wish there were more advanced topics covered.'),
        (5, 'Outstanding course! The instructor explains complex concepts in simple terms. The community support is also amazing.'),
        (4, 'Very comprehensive course. Learned so much in just a few months. The job placement support really works!')
) AS reviews(review_rating, review_text)
WHERE u.role = 'student' 
AND RANDOM() < 0.3 -- Only 30% of students leave reviews
LIMIT 50;

-- Insert sample enrollments
INSERT INTO enrollments (student_id, course_id, enrollment_date, progress_percentage, is_completed)
SELECT 
    u.id,
    c.id,
    CURRENT_TIMESTAMP - INTERVAL '1 day' * FLOOR(RANDOM() * 90),
    CASE 
        WHEN RANDOM() < 0.1 THEN 100.0 -- 10% completed
        WHEN RANDOM() < 0.3 THEN RANDOM() * 100 -- 20% in progress
        ELSE RANDOM() * 30 -- 70% just started
    END,
    RANDOM() < 0.1 -- 10% completion rate
FROM users u
CROSS JOIN courses c
WHERE u.role = 'student'
AND RANDOM() < 0.4 -- 40% of students are enrolled in each course
LIMIT 100;

-- Insert sample payments for enrollments
INSERT INTO payments (user_id, course_id, payment_reference, amount, status, payment_date)
SELECT 
    e.student_id,
    e.course_id,
    'spacehub_' || EXTRACT(EPOCH FROM e.enrollment_date)::bigint || '_' || SUBSTRING(MD5(RANDOM()::text), 1, 9),
    c.price,
    'successful',
    e.enrollment_date
FROM enrollments e
JOIN courses c ON e.course_id = c.id
WHERE RANDOM() < 0.8; -- 80% of enrollments have successful payments

-- Insert sample leads from landing page
INSERT INTO leads (email, first_name, last_name, phone, source, interests, created_at)
VALUES 
('prospect1@example.com', 'Michael', 'Johnson', '+2348012345678', 'hero_form', ARRAY['Web Development'], CURRENT_TIMESTAMP - INTERVAL '2 days'),
('prospect2@example.com', 'Fatima', 'Abubakar', '+2348087654321', 'exit_intent', ARRAY['Design', 'Marketing'], CURRENT_TIMESTAMP - INTERVAL '1 day'),
('prospect3@example.com', 'Chidi', 'Okonkwo', '+2348098765432', 'inline_form', ARRAY['Data Science'], CURRENT_TIMESTAMP - INTERVAL '3 hours'),
('prospect4@example.com', 'Aisha', 'Bello', '+2348076543210', 'floating_cta', ARRAY['Web Development', 'Data Science'], CURRENT_TIMESTAMP - INTERVAL '5 hours'),
('prospect5@example.com', 'Emeka', 'Nwankwo', '+2348065432109', 'hero_form', ARRAY['Marketing'], CURRENT_TIMESTAMP - INTERVAL '1 hour');

-- Insert sample contact form submissions
INSERT INTO contact_submissions (name, email, phone, subject, message, status, created_at)
VALUES 
('Blessing Okoro', 'blessing@example.com', '+2348012345678', 'Course Inquiry', 'I am interested in the web development bootcamp. Can you provide more information about the curriculum?', 'new', CURRENT_TIMESTAMP - INTERVAL '2 days'),
('Ahmed Hassan', 'ahmed@example.com', '+2348087654321', 'Payment Issue', 'I made a payment but my course access is not activated. Please help.', 'in_progress', CURRENT_TIMESTAMP - INTERVAL '1 day'),
('Grace Adebayo', 'grace@example.com', '+2348098765432', 'Partnership Opportunity', 'I represent a tech company interested in corporate training. Can we discuss partnership opportunities?', 'new', CURRENT_TIMESTAMP - INTERVAL '3 hours');
