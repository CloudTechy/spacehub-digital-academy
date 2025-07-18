-- Insert course lessons for each module

-- Web Development Course Lessons
INSERT INTO course_lessons (module_id, title, description, content_type, video_url, video_duration_seconds, sort_order, is_free)
SELECT 
    cm.id,
    lesson_title,
    lesson_description,
    'video',
    'https://www.youtube.com/watch?v=' || video_id,
    duration_seconds,
    lesson_order,
    is_free_lesson
FROM course_modules cm
JOIN courses c ON cm.course_id = c.id
CROSS JOIN (
    VALUES 
        ('Introduction to HTML', 'Learn the basics of HTML structure and elements', 'dQw4w9WgXcQ', 1800, 1, true),
        ('HTML Forms and Input Elements', 'Master form creation and validation', 'dQw4w9WgXcQ', 2400, 2, true),
        ('CSS Fundamentals', 'Style your web pages with CSS', 'dQw4w9WgXcQ', 2100, 3, true),
        ('CSS Flexbox and Grid', 'Create responsive layouts', 'dQw4w9WgXcQ', 2700, 4, false),
        ('JavaScript Variables and Functions', 'Learn JavaScript programming basics', 'dQw4w9WgXcQ', 2400, 5, false),
        ('DOM Manipulation', 'Make your pages interactive', 'dQw4w9WgXcQ', 2100, 6, false)
) AS lessons(lesson_title, lesson_description, video_id, duration_seconds, lesson_order, is_free_lesson)
WHERE c.slug = 'full-stack-web-development-bootcamp' AND cm.sort_order = 1

UNION ALL

SELECT 
    cm.id,
    lesson_title,
    lesson_description,
    'video',
    'https://www.youtube.com/watch?v=' || video_id,
    duration_seconds,
    lesson_order,
    is_free_lesson
FROM course_modules cm
JOIN courses c ON cm.course_id = c.id
CROSS JOIN (
    VALUES 
        ('React Components and JSX', 'Build your first React components', 'dQw4w9WgXcQ', 2700, 1, false),
        ('State Management with Hooks', 'Manage component state effectively', 'dQw4w9WgXcQ', 3000, 2, false),
        ('React Router for Navigation', 'Create multi-page applications', 'dQw4w9WgXcQ', 2400, 3, false),
        ('API Integration', 'Connect your app to external APIs', 'dQw4w9WgXcQ', 2700, 4, false)
) AS lessons(lesson_title, lesson_description, video_id, duration_seconds, lesson_order, is_free_lesson)
WHERE c.slug = 'full-stack-web-development-bootcamp' AND cm.sort_order = 2;

-- Design Course Lessons
INSERT INTO course_lessons (module_id, title, description, content_type, video_url, video_duration_seconds, sort_order, is_free)
SELECT 
    cm.id,
    lesson_title,
    lesson_description,
    'video',
    'https://www.youtube.com/watch?v=' || video_id,
    duration_seconds,
    lesson_order,
    is_free_lesson
FROM course_modules cm
JOIN courses c ON cm.course_id = c.id
CROSS JOIN (
    VALUES 
        ('Design Principles Overview', 'Understanding fundamental design principles', 'dQw4w9WgXcQ', 1800, 1, true),
        ('Color Theory and Psychology', 'Master color in design', 'dQw4w9WgXcQ', 2100, 2, true),
        ('Typography Fundamentals', 'Choose and pair fonts effectively', 'dQw4w9WgXcQ', 1800, 3, true),
        ('Layout and Composition', 'Create balanced and engaging layouts', 'dQw4w9WgXcQ', 2400, 4, false),
        ('Visual Hierarchy', 'Guide user attention through design', 'dQw4w9WgXcQ', 1800, 5, false)
) AS lessons(lesson_title, lesson_description, video_id, duration_seconds, lesson_order, is_free_lesson)
WHERE c.slug = 'digital-product-design-mastery' AND cm.sort_order = 1;

-- Data Science Course Lessons
INSERT INTO course_lessons (module_id, title, description, content_type, video_url, video_duration_seconds, sort_order, is_free)
SELECT 
    cm.id,
    lesson_title,
    lesson_description,
    'video',
    'https://www.youtube.com/watch?v=' || video_id,
    duration_seconds,
    lesson_order,
    is_free_lesson
FROM course_modules cm
JOIN courses c ON cm.course_id = c.id
CROSS JOIN (
    VALUES 
        ('Python Installation and Setup', 'Get your development environment ready', 'dQw4w9WgXcQ', 1200, 1, true),
        ('Python Syntax and Variables', 'Learn Python programming basics', 'dQw4w9WgXcQ', 1800, 2, true),
        ('Data Types and Structures', 'Work with lists, dictionaries, and more', 'dQw4w9WgXcQ', 2100, 3, true),
        ('Control Flow and Functions', 'Write efficient Python code', 'dQw4w9WgXcQ', 2400, 4, false),
        ('Working with Libraries', 'Import and use Python libraries', 'dQw4w9WgXcQ', 1800, 5, false)
) AS lessons(lesson_title, lesson_description, video_id, duration_seconds, lesson_order, is_free_lesson)
WHERE c.slug = 'data-science-for-business' AND cm.sort_order = 1;

-- Marketing Course Lessons
INSERT INTO course_lessons (module_id, title, description, content_type, video_url, video_duration_seconds, sort_order, is_free)
SELECT 
    cm.id,
    lesson_title,
    lesson_description,
    'video',
    'https://www.youtube.com/watch?v=' || video_id,
    duration_seconds,
    lesson_order,
    is_free_lesson
FROM course_modules cm
JOIN courses c ON cm.course_id = c.id
CROSS JOIN (
    VALUES 
        ('Social Media Marketing Overview', 'Introduction to social media marketing', 'dQw4w9WgXcQ', 1500, 1, true),
        ('Platform-Specific Strategies', 'Tailor content for each platform', 'dQw4w9WgXcQ', 1800, 2, true),
        ('Building Your Brand Voice', 'Develop consistent brand messaging', 'dQw4w9WgXcQ', 1500, 3, true),
        ('Community Management', 'Engage with your audience effectively', 'dQw4w9WgXcQ', 2100, 4, false),
        ('Social Media Analytics', 'Measure your social media success', 'dQw4w9WgXcQ', 1800, 5, false)
) AS lessons(lesson_title, lesson_description, video_id, duration_seconds, lesson_order, is_free_lesson)
WHERE c.slug = 'social-media-marketing-pro' AND cm.sort_order = 1;
