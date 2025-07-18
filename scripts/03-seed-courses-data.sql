-- Seed courses and related data

-- Insert courses
WITH course_data AS (
    SELECT 
        uuid_generate_v4() as course_id,
        'Full-Stack Web Development Bootcamp' as title,
        'full-stack-web-development-bootcamp' as slug,
        'Learn to build modern web applications from scratch using React, Node.js, and MongoDB' as short_description,
        'This comprehensive bootcamp will take you from beginner to job-ready full-stack developer in 6 months.' as full_description,
        (SELECT id FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'james.okafor@example.com') as instructor_id,
        (SELECT id FROM categories WHERE slug = 'web-development') as category_id,
        180000.00 as price,
        200000.00 as original_price,
        24 as duration_weeks,
        'Beginner' as level,
        true as is_published,
        true as is_featured,
        true as is_bestseller,
        1247 as students_enrolled,
        4.9 as rating,
        324 as reviews_count
    UNION ALL
    SELECT 
        uuid_generate_v4(),
        'Digital Product Design Mastery',
        'digital-product-design-mastery',
        'Master UI/UX design with Figma, user research, and design systems',
        'Become a product designer who creates beautiful, user-centered digital experiences.',
        (SELECT id FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'sarah.adebayo@example.com'),
        (SELECT id FROM categories WHERE slug = 'design'),
        150000.00,
        170000.00,
        16,
        'Beginner',
        true,
        true,
        false,
        892,
        4.9,
        267
    UNION ALL
    SELECT 
        uuid_generate_v4(),
        'Data Science for Business',
        'data-science-for-business',
        'Learn Python, machine learning, and data analysis for business applications',
        'Transform raw data into business insights with this comprehensive data science course.',
        (SELECT id FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'ada.nwosu@example.com'),
        (SELECT id FROM categories WHERE slug = 'data-science'),
        200000.00,
        220000.00,
        20,
        'Beginner',
        true,
        false,
        false,
        634,
        4.8,
        189
    UNION ALL
    SELECT 
        uuid_generate_v4(),
        'Social Media Marketing Pro',
        'social-media-marketing-pro',
        'Master Facebook Ads, Instagram marketing, and content strategy',
        'Become a digital marketing expert who can grow brands and drive sales online.',
        (SELECT id FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'kemi.johnson@example.com'),
        (SELECT id FROM categories WHERE slug = 'marketing'),
        100000.00,
        120000.00,
        12,
        'Beginner',
        true,
        false,
        true,
        1456,
        4.7,
        412
)
INSERT INTO courses (
    id, title, slug, short_description, full_description, instructor_id, category_id,
    price, original_price, duration_weeks, level, is_published, is_featured, is_bestseller,
    students_enrolled, rating, reviews_count,
    requirements, what_you_will_learn, tags,
    created_at, updated_at
)
SELECT 
    course_id, title, slug, short_description, full_description, instructor_id, category_id,
    price, original_price, duration_weeks, level, is_published, is_featured, is_bestseller,
    students_enrolled, rating, reviews_count,
    CASE title
        WHEN 'Full-Stack Web Development Bootcamp' THEN ARRAY['Basic computer literacy', 'Reliable internet connection', 'Laptop or desktop computer']
        WHEN 'Digital Product Design Mastery' THEN ARRAY['No prior design experience needed', 'Computer with internet access', 'Eye for detail and aesthetics']
        WHEN 'Data Science for Business' THEN ARRAY['Basic mathematics knowledge', 'No programming experience needed', 'Analytical mindset']
        WHEN 'Social Media Marketing Pro' THEN ARRAY['Basic social media knowledge', 'Smartphone or computer', 'Interest in business growth']
    END,
    CASE title
        WHEN 'Full-Stack Web Development Bootcamp' THEN ARRAY['Build responsive websites with HTML5, CSS3, and JavaScript', 'Create interactive user interfaces with React', 'Develop server-side applications with Node.js']
        WHEN 'Digital Product Design Mastery' THEN ARRAY['Conduct user research and create personas', 'Design wireframes and user flows', 'Create high-fidelity mockups in Figma']
        WHEN 'Data Science for Business' THEN ARRAY['Python programming for data science', 'Statistical analysis and hypothesis testing', 'Machine learning algorithms']
        WHEN 'Social Media Marketing Pro' THEN ARRAY['Create engaging social media content', 'Run profitable Facebook and Instagram ads', 'Develop content marketing strategies']
    END,
    CASE title
        WHEN 'Full-Stack Web Development Bootcamp' THEN ARRAY['JavaScript', 'React', 'Node.js', 'MongoDB', 'Full-Stack']
        WHEN 'Digital Product Design Mastery' THEN ARRAY['UI/UX', 'Figma', 'Design Systems', 'User Research', 'Prototyping']
        WHEN 'Data Science for Business' THEN ARRAY['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'SQL']
        WHEN 'Social Media Marketing Pro' THEN ARRAY['Social Media', 'Facebook Ads', 'Instagram', 'Content Marketing', 'Digital Marketing']
    END,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM course_data;

-- Insert course modules for each course
INSERT INTO course_modules (course_id, title, description, sort_order, duration_minutes)
SELECT 
    c.id,
    module_title,
    module_description,
    module_order,
    module_duration
FROM courses c
CROSS JOIN (
    VALUES 
        ('Web Fundamentals', 'Learn HTML5, CSS3, and JavaScript basics', 1, 1440),
        ('Advanced JavaScript & React', 'Master modern JavaScript and React development', 2, 2160),
        ('Backend Development', 'Build server-side applications with Node.js', 3, 2016),
        ('Database & Deployment', 'Work with databases and deploy your applications', 4, 1440),
        ('Portfolio Projects', 'Build 5 real-world projects for your portfolio', 5, 1440)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'full-stack-web-development-bootcamp'

UNION ALL

SELECT 
    c.id,
    module_title,
    module_description,
    module_order,
    module_duration
FROM courses c
CROSS JOIN (
    VALUES 
        ('Design Fundamentals', 'Learn design principles, color theory, and typography', 1, 1080),
        ('User Research & Strategy', 'Understand users and define design problems', 2, 900),
        ('Wireframing & Prototyping', 'Create wireframes and interactive prototypes', 3, 1200),
        ('Visual Design & Systems', 'Master visual design and create design systems', 4, 1320),
        ('Portfolio Development', 'Build your design portfolio and prepare for interviews', 5, 720)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'digital-product-design-mastery'

UNION ALL

SELECT 
    c.id,
    module_title,
    module_description,
    module_order,
    module_duration
FROM courses c
CROSS JOIN (
    VALUES 
        ('Python Fundamentals', 'Learn Python programming from scratch', 1, 1200),
        ('Data Analysis with Pandas', 'Master data manipulation and analysis', 2, 1440),
        ('Statistics & Visualization', 'Statistical analysis and data visualization', 3, 1320),
        ('Machine Learning', 'Build and deploy ML models', 4, 1800),
        ('Capstone Projects', 'Work on real business problems', 5, 960)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'data-science-for-business'

UNION ALL

SELECT 
    c.id,
    module_title,
    module_description,
    module_order,
    module_duration
FROM courses c
CROSS JOIN (
    VALUES 
        ('Social Media Fundamentals', 'Master the basics of social media marketing', 1, 900),
        ('Content Creation & Strategy', 'Create compelling content that converts', 2, 1080),
        ('Paid Advertising', 'Master Facebook and Instagram ads', 3, 1440),
        ('Analytics & Optimization', 'Measure and improve campaign performance', 4, 720)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'social-media-marketing-pro';
