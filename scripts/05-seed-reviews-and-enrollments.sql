-- Seed enrollments, reviews, and other data

-- Insert sample enrollments
WITH student_refs AS (
    SELECT id as user_id, first_name FROM users WHERE role = 'student'
),
course_refs AS (
    SELECT id as course_id, title FROM courses
)
INSERT INTO enrollments (id, user_id, course_id, enrollment_date, progress_percentage, is_completed)
SELECT 
    uuid_generate_v4(),
    sr.user_id,
    cr.course_id,
    CURRENT_TIMESTAMP - INTERVAL '30 days' * random(),
    CASE 
        WHEN random() < 0.3 THEN 100.0
        WHEN random() < 0.6 THEN 50.0 + random() * 50.0
        ELSE random() * 50.0
    END,
    random() < 0.3
FROM student_refs sr
CROSS JOIN course_refs cr
WHERE random() < 0.4; -- 40% chance of enrollment

-- Insert course reviews
WITH enrollment_refs AS (
    SELECT e.id as enrollment_id, e.user_id, e.course_id, e.is_completed
    FROM enrollments e
    WHERE e.progress_percentage > 20
)
INSERT INTO course_reviews (id, user_id, course_id, rating, review_text, is_published)
SELECT 
    uuid_generate_v4(),
    er.user_id,
    er.course_id,
    CASE 
        WHEN random() < 0.6 THEN 5
        WHEN random() < 0.8 THEN 4
        WHEN random() < 0.95 THEN 3
        ELSE 2
    END,
    CASE 
        WHEN random() < 0.7 THEN 
            (ARRAY[
                'Excellent course! Very comprehensive and well-structured.',
                'Great instructor and practical examples. Highly recommended!',
                'Perfect for beginners. Clear explanations and good pacing.',
                'Loved the hands-on projects. Really helped me understand the concepts.',
                'Outstanding content quality. Worth every penny!',
                'The instructor explains complex topics in a simple way.',
                'Great course with lots of practical examples and exercises.'
            ])[floor(random() * 7 + 1)]
        ELSE NULL
    END,
    true
FROM enrollment_refs er
WHERE random() < 0.6; -- 60% of students with progress leave reviews

-- Insert sample payments
WITH enrollment_refs AS (
    SELECT e.user_id, e.course_id, c.price
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
)
INSERT INTO payments (id, user_id, course_id, paystack_reference, amount, status, payment_method, transaction_date, verified_at)
SELECT 
    uuid_generate_v4(),
    er.user_id,
    er.course_id,
    'ref_' || substr(md5(random()::text), 1, 10),
    er.price,
    'success',
    (ARRAY['card', 'bank_transfer', 'ussd'])[floor(random() * 3 + 1)],
    CURRENT_TIMESTAMP - INTERVAL '30 days' * random(),
    CURRENT_TIMESTAMP - INTERVAL '30 days' * random() + INTERVAL '5 minutes'
FROM enrollment_refs er;

-- Insert sample leads
INSERT INTO leads (id, email, first_name, last_name, phone, source, interests)
SELECT 
    uuid_generate_v4(),
    'lead' || generate_series || '@example.com',
    (ARRAY['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Chris', 'Emma'])[floor(random() * 8 + 1)],
    (ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'])[floor(random() * 8 + 1)],
    '+234' || (7000000000 + floor(random() * 999999999))::text,
    (ARRAY['landing_page', 'popup', 'footer', 'social_media'])[floor(random() * 4 + 1)],
    (ARRAY[
        ARRAY['web-development', 'programming'],
        ARRAY['design', 'ui-ux'],
        ARRAY['data-science', 'analytics'],
        ARRAY['marketing', 'business'],
        ARRAY['mobile-development', 'apps']
    ])[floor(random() * 5 + 1)]
FROM generate_series(1, 50);

-- Insert sample contact submissions
INSERT INTO contact_submissions (id, name, email, subject, message, status)
SELECT 
    uuid_generate_v4(),
    (ARRAY['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'])[floor(random() * 4 + 1)],
    'contact' || generate_series || '@example.com',
    (ARRAY[
        'Course Inquiry',
        'Technical Support',
        'Partnership Opportunity',
        'General Question',
        'Refund Request'
    ])[floor(random() * 5 + 1)],
    (ARRAY[
        'I am interested in learning more about your web development course.',
        'I am having trouble accessing my course materials.',
        'I would like to discuss a potential partnership.',
        'Can you provide more information about your certification process?',
        'I would like to request a refund for my recent purchase.'
    ])[floor(random() * 5 + 1)],
    (ARRAY['new', 'in_progress', 'resolved'])[floor(random() * 3 + 1)]
FROM generate_series(1, 20);
