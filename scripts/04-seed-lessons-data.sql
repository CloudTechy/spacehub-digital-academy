-- Seed course modules and lessons

-- Insert course modules
WITH course_refs AS (
    SELECT id as course_id, title FROM courses
)
INSERT INTO course_modules (id, course_id, title, description, order_index)
SELECT 
    uuid_generate_v4(),
    cr.course_id,
    module_data.title,
    module_data.description,
    module_data.order_index
FROM (VALUES
    -- Web Development Course Modules
    ('Complete Web Development Bootcamp', 'HTML & CSS Fundamentals', 'Learn the building blocks of web development', 1),
    ('Complete Web Development Bootcamp', 'JavaScript Essentials', 'Master JavaScript programming concepts', 2),
    ('Complete Web Development Bootcamp', 'React.js Frontend', 'Build modern user interfaces with React', 3),
    ('Complete Web Development Bootcamp', 'Backend with Node.js', 'Create server-side applications', 4),
    ('Complete Web Development Bootcamp', 'Database & Deployment', 'Store data and deploy your applications', 5),
    
    -- UI/UX Design Course Modules
    ('UI/UX Design Masterclass', 'Design Principles', 'Fundamental design concepts and theory', 1),
    ('UI/UX Design Masterclass', 'User Research', 'Understanding your users and their needs', 2),
    ('UI/UX Design Masterclass', 'Figma Mastery', 'Complete guide to Figma design tool', 3),
    ('UI/UX Design Masterclass', 'Prototyping', 'Create interactive prototypes', 4),
    ('UI/UX Design Masterclass', 'Design Systems', 'Build scalable design systems', 5),
    
    -- Data Science Course Modules
    ('Data Science with Python', 'Python Fundamentals', 'Python programming for data science', 1),
    ('Data Science with Python', 'Data Analysis', 'Working with pandas and numpy', 2),
    ('Data Science with Python', 'Data Visualization', 'Creating charts and graphs', 3),
    ('Data Science with Python', 'Machine Learning', 'Building predictive models', 4),
    ('Data Science with Python', 'Advanced Topics', 'Deep learning and advanced techniques', 5)
) AS module_data(course_title, title, description, order_index)
JOIN course_refs cr ON cr.title = module_data.course_title;

-- Insert course lessons
WITH module_refs AS (
    SELECT cm.id as module_id, cm.title as module_title, c.title as course_title 
    FROM course_modules cm 
    JOIN courses c ON cm.course_id = c.id
)
INSERT INTO course_lessons (id, module_id, title, description, content_type, video_url, video_duration, order_index, is_free)
SELECT 
    uuid_generate_v4(),
    mr.module_id,
    lesson_data.title,
    lesson_data.description,
    'video',
    lesson_data.video_url,
    lesson_data.duration,
    lesson_data.order_index,
    lesson_data.is_free
FROM (VALUES
    -- HTML & CSS Fundamentals lessons
    ('HTML & CSS Fundamentals', 'Introduction to HTML', 'Learn HTML structure and basic tags', 'https://www.youtube.com/watch?v=UB1O30fR-EE', 1200, 1, true),
    ('HTML & CSS Fundamentals', 'CSS Styling Basics', 'Style your HTML with CSS', 'https://www.youtube.com/watch?v=yfoY53QXEnI', 1500, 2, true),
    ('HTML & CSS Fundamentals', 'Responsive Design', 'Make your websites mobile-friendly', 'https://www.youtube.com/watch?v=srvUrASNdxk', 1800, 3, true),
    ('HTML & CSS Fundamentals', 'CSS Grid and Flexbox', 'Modern layout techniques', 'https://www.youtube.com/watch?v=jV8B24rSN5o', 2100, 4, false),
    
    -- JavaScript Essentials lessons
    ('JavaScript Essentials', 'JavaScript Basics', 'Variables, functions, and control flow', 'https://www.youtube.com/watch?v=hdI2bqOjy3c', 1800, 1, true),
    ('JavaScript Essentials', 'DOM Manipulation', 'Interact with HTML elements', 'https://www.youtube.com/watch?v=0ik6X4DJKCc', 2000, 2, false),
    ('JavaScript Essentials', 'Async JavaScript', 'Promises, async/await, and APIs', 'https://www.youtube.com/watch?v=PoRJizFvM7s', 2200, 3, false),
    ('JavaScript Essentials', 'ES6+ Features', 'Modern JavaScript features', 'https://www.youtube.com/watch?v=nZ1DMMsyVyI', 1900, 4, false),
    
    -- React.js Frontend lessons
    ('React.js Frontend', 'React Introduction', 'Getting started with React', 'https://www.youtube.com/watch?v=Ke90Tje7VS0', 1600, 1, true),
    ('React.js Frontend', 'Components and Props', 'Building reusable components', 'https://www.youtube.com/watch?v=9D1x7-2FmTA', 1800, 2, false),
    ('React.js Frontend', 'State and Hooks', 'Managing component state', 'https://www.youtube.com/watch?v=O6P86uwfdR0', 2100, 3, false),
    ('React.js Frontend', 'React Router', 'Navigation in React apps', 'https://www.youtube.com/watch?v=Law7wfdg_ls', 1700, 4, false),
    
    -- Design Principles lessons
    ('Design Principles', 'Color Theory', 'Understanding color in design', 'https://www.youtube.com/watch?v=_2LLXnUdUIc', 1400, 1, true),
    ('Design Principles', 'Typography', 'Choosing and using fonts effectively', 'https://www.youtube.com/watch?v=sByzHoiYFX0', 1600, 2, true),
    ('Design Principles', 'Layout and Composition', 'Arranging elements effectively', 'https://www.youtube.com/watch?v=a5KYlHNKQB8', 1800, 3, true),
    ('Design Principles', 'Visual Hierarchy', 'Guiding user attention', 'https://www.youtube.com/watch?v=qZWDJqY27bw', 1500, 4, false),
    
    -- Python Fundamentals lessons
    ('Python Fundamentals', 'Python Basics', 'Variables, data types, and syntax', 'https://www.youtube.com/watch?v=rfscVS0vtbw', 2000, 1, true),
    ('Python Fundamentals', 'Control Structures', 'Loops and conditional statements', 'https://www.youtube.com/watch?v=6iF8Xb7Z3wQ', 1800, 2, true),
    ('Python Fundamentals', 'Functions and Modules', 'Organizing your Python code', 'https://www.youtube.com/watch?v=9Os0o3wzS_I', 2100, 3, true),
    ('Python Fundamentals', 'File Handling', 'Working with files in Python', 'https://www.youtube.com/watch?v=Uh2ebFW8OYM', 1700, 4, false)
) AS lesson_data(module_title, title, description, video_url, duration, order_index, is_free)
JOIN module_refs mr ON mr.module_title = lesson_data.module_title;
