-- Seed courses and related data

-- Get category and instructor IDs for reference
WITH category_refs AS (
    SELECT id as cat_id, slug FROM categories
),
instructor_refs AS (
    SELECT i.id as inst_id, u.first_name FROM instructors i 
    JOIN users u ON i.user_id = u.id
)

-- Insert courses
INSERT INTO courses (id, instructor_id, category_id, title, slug, description, short_description, thumbnail_url, preview_video_url, price, original_price, difficulty_level, duration_hours, requirements, what_you_learn, is_published, is_featured, enrollment_count, average_rating, total_reviews)
SELECT 
    uuid_generate_v4(),
    ir.inst_id,
    cr.cat_id,
    course_data.title,
    course_data.slug,
    course_data.description,
    course_data.short_description,
    course_data.thumbnail_url,
    course_data.preview_video_url,
    course_data.price,
    course_data.original_price,
    course_data.difficulty_level,
    course_data.duration_hours,
    course_data.requirements,
    course_data.what_you_learn,
    course_data.is_published,
    course_data.is_featured,
    course_data.enrollment_count,
    course_data.average_rating,
    course_data.total_reviews
FROM (VALUES
    ('Full-Stack Web Development Bootcamp', 'full-stack-web-development-bootcamp', 'Learn to build modern web applications from scratch using React, Node.js, and MongoDB', 'Learn full-stack web development with hands-on projects', '/placeholder.svg?height=200&width=300&text=Web+Dev', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 180000.00, 200000.00, 'Beginner', 24, ARRAY['Basic computer literacy', 'Reliable internet connection', 'Laptop or desktop computer'], ARRAY['Build responsive websites with HTML5, CSS3, and JavaScript', 'Create interactive user interfaces with React', 'Develop server-side applications with Node.js'], true, true, 1247, 4.9, 324),
    
    ('Digital Product Design Mastery', 'digital-product-design-mastery', 'Master UI/UX design with Figma, user research, and design systems', 'Complete guide to modern UI/UX design', '/placeholder.svg?height=200&width=300&text=UI%2FUX', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 150000.00, 170000.00, 'Beginner', 16, ARRAY['No prior design experience needed', 'Computer with internet access', 'Eye for detail and aesthetics'], ARRAY['Conduct user research and create personas', 'Design wireframes and user flows', 'Create high-fidelity mockups in Figma'], true, true, 892, 4.9, 267),
    
    ('Data Science for Business', 'data-science-for-business', 'Learn Python, machine learning, and data analysis for business applications', 'Transform raw data into business insights with this comprehensive data science course.', '/placeholder.svg?height=200&width=300&text=Data+Science', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 200000.00, 220000.00, 'Beginner', 20, ARRAY['Basic mathematics knowledge', 'No programming experience needed', 'Analytical mindset'], ARRAY['Python programming for data science', 'Statistical analysis and hypothesis testing', 'Machine learning algorithms'], true, false, 634, 4.8, 189),
    
    ('Social Media Marketing Pro', 'social-media-marketing-pro', 'Master Facebook Ads, Instagram marketing, and content strategy', 'Become a digital marketing expert who can grow brands and drive sales online.', '/placeholder.svg?height=200&width=300&text=Marketing', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 100000.00, 120000.00, 'Beginner', 12, ARRAY['Basic social media knowledge', 'Smartphone or computer', 'Interest in business growth'], ARRAY['Create engaging social media content', 'Run profitable Facebook and Instagram ads', 'Develop content marketing strategies'], true, false, 1456, 4.7, 412),
    
    ('Complete Web Development Bootcamp', 'complete-web-development-bootcamp', 'Master modern web development from frontend to backend with React, Node.js, and databases. Build real-world projects and deploy to production.', 'Learn full-stack web development with hands-on projects', '/placeholder.svg?height=200&width=300&text=Web+Dev', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 89.99, 149.99, 'beginner', 40, ARRAY['Basic computer skills', 'No programming experience required'], ARRAY['HTML, CSS, JavaScript fundamentals', 'React.js and modern frontend development', 'Node.js and Express.js backend', 'Database design with PostgreSQL', 'Deployment and DevOps basics'], true, true, 1250, 4.8, 324),
    
    ('UI/UX Design Masterclass', 'ui-ux-design-masterclass', 'Learn user interface and user experience design from scratch. Master Figma, design systems, and create stunning user experiences.', 'Complete guide to modern UI/UX design', '/placeholder.svg?height=200&width=300&text=UI%2FUX', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 79.99, 129.99, 'beginner', 35, ARRAY['Basic computer skills', 'Creative mindset'], ARRAY['Design principles and theory', 'Figma mastery', 'User research and testing', 'Prototyping and wireframing', 'Design systems creation'], true, true, 890, 4.9, 267),
    
    ('Data Science with Python', 'data-science-with-python', 'Comprehensive data science course covering Python, machine learning, and statistical analysis. Work with real datasets and build predictive models.', 'Master data science and machine learning', '/placeholder.svg?height=200&width=300&text=Data+Science', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 99.99, 179.99, 'intermediate', 50, ARRAY['Basic Python knowledge', 'High school mathematics'], ARRAY['Python for data analysis', 'Pandas and NumPy mastery', 'Machine learning algorithms', 'Data visualization', 'Statistical analysis'], true, false, 650, 4.7, 189),
    
    ('React Native Mobile Development', 'react-native-mobile-development', 'Build cross-platform mobile apps with React Native. Learn navigation, state management, and publish to app stores.', 'Create mobile apps with React Native', '/placeholder.svg?height=200&width=300&text=Mobile+Dev', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 94.99, 159.99, 'intermediate', 45, ARRAY['JavaScript knowledge', 'Basic React experience'], ARRAY['React Native fundamentals', 'Navigation and routing', 'State management with Redux', 'Native device features', 'App store deployment'], true, false, 420, 4.6, 128),
    
    ('Digital Marketing Strategy', 'digital-marketing-strategy', 'Master digital marketing from SEO to social media. Learn to create effective campaigns and measure ROI across all digital channels.', 'Complete digital marketing guide', '/placeholder.svg?height=200&width=300&text=Marketing', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 69.99, 119.99, 'beginner', 30, ARRAY['Basic computer skills', 'Interest in marketing'], ARRAY['SEO and content marketing', 'Social media strategy', 'Google Ads and Facebook Ads', 'Email marketing automation', 'Analytics and ROI measurement'], true, false, 780, 4.5, 203),
    
    ('Cybersecurity Fundamentals', 'cybersecurity-fundamentals', 'Learn essential cybersecurity concepts, ethical hacking, and how to protect digital assets. Hands-on labs and real-world scenarios.', 'Essential cybersecurity skills', '/placeholder.svg?height=200&width=300&text=Security', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 84.99, 139.99, 'beginner', 38, ARRAY['Basic networking knowledge', 'Computer literacy'], ARRAY['Network security fundamentals', 'Ethical hacking techniques', 'Risk assessment and management', 'Incident response procedures', 'Security tools and technologies'], true, false, 340, 4.4, 95)
) AS course_data(title, slug, description, short_description, thumbnail_url, preview_video_url, price, original_price, difficulty_level, duration_hours, requirements, what_you_learn, is_published, is_featured, enrollment_count, average_rating, total_reviews)
CROSS JOIN category_refs cr
CROSS JOIN instructor_refs ir
WHERE 
    (course_data.title LIKE '%Full-Stack%' AND cr.slug = 'web-development' AND ir.first_name = 'James') OR
    (course_data.title LIKE '%Digital Product%' AND cr.slug = 'design' AND ir.first_name = 'Sarah') OR
    (course_data.title LIKE '%Data Science%' AND cr.slug = 'data-science' AND ir.first_name = 'Ada') OR
    (course_data.title LIKE '%Social Media%' AND cr.slug = 'marketing' AND ir.first_name = 'Kemi') OR
    (course_data.title LIKE '%Complete Web%' AND cr.slug = 'web-development' AND ir.first_name = 'Dr. Emily') OR
    (course_data.title LIKE '%UI/UX%' AND cr.slug = 'ui-ux-design' AND ir.first_name = 'Alex') OR
    (course_data.title LIKE '%Data Science with Python%' AND cr.slug = 'data-science' AND ir.first_name = 'Priya') OR
    (course_data.title LIKE '%React Native%' AND cr.slug = 'mobile-development' AND ir.first_name = 'Dr. Emily') OR
    (course_data.title LIKE '%Digital Marketing Strategy%' AND cr.slug = 'digital-marketing' AND ir.first_name = 'Alex') OR
    (course_data.title LIKE '%Cybersecurity%' AND cr.slug = 'cybersecurity' AND ir.first_name = 'Priya');

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
WHERE c.slug = 'social-media-marketing-pro'

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
        ('Frontend Development', 'Learn HTML5, CSS3, and JavaScript basics', 1, 1440),
        ('Advanced React', 'Master modern JavaScript and React development', 2, 2160),
        ('Backend Development', 'Build server-side applications with Node.js', 3, 2016),
        ('Database Design', 'Work with databases and deploy your applications', 4, 1440),
        ('Real-world Projects', 'Build 5 real-world projects for your portfolio', 5, 1440)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'complete-web-development-bootcamp'

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
        ('Design Principles', 'Learn design principles, color theory, and typography', 1, 1080),
        ('User Research', 'Understand users and define design problems', 2, 900),
        ('Wireframing', 'Create wireframes and interactive prototypes', 3, 1200),
        ('Visual Design', 'Master visual design and create design systems', 4, 1320),
        ('Portfolio Development', 'Build your design portfolio and prepare for interviews', 5, 720)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'ui-ux-design-masterclass'

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
        ('Python Basics', 'Learn Python programming from scratch', 1, 1200),
        ('Data Manipulation', 'Master data manipulation and analysis', 2, 1440),
        ('Statistical Analysis', 'Statistical analysis and data visualization', 3, 1320),
        ('Machine Learning Algorithms', 'Build and deploy ML models', 4, 1800),
        ('Capstone Projects', 'Work on real business problems', 5, 960)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'data-science-with-python'

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
        ('React Native Basics', 'Learn React Native fundamentals', 1, 1200),
        ('Navigation & Routing', 'Learn navigation and routing in React Native', 2, 1440),
        ('State Management', 'Learn state management with Redux', 3, 1320),
        ('Native Features', 'Learn to use native device features', 4, 1800),
        ('App Deployment', 'Learn to deploy apps to app stores', 5, 960)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'react-native-mobile-development'

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
        ('SEO Basics', 'Learn the basics of SEO', 1, 900),
        ('Content Marketing', 'Learn to create compelling content', 2, 1080),
        ('Social Media Strategy', 'Learn social media strategy', 3, 1440),
        ('Email Marketing', 'Learn email marketing automation', 4, 720),
        ('Analytics & ROI', 'Learn to measure and improve campaign performance', 5, 960)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'digital-marketing-strategy'

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
        ('Network Security', 'Learn network security fundamentals', 1, 1080),
        ('Ethical Hacking', 'Learn ethical hacking techniques', 2, 900),
        ('Risk Assessment', 'Learn risk assessment and management', 3, 1200),
        ('Incident Response', 'Learn incident response procedures', 4, 1320),
        ('Security Tools', 'Learn to use security tools and technologies', 5, 720)
) AS modules(module_title, module_description, module_order, module_duration)
WHERE c.slug = 'cybersecurity-fundamentals';
