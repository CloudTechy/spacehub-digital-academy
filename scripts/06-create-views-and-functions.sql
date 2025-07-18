-- Create useful views and functions for the application

-- View for course statistics
CREATE VIEW course_stats AS
SELECT 
    c.id,
    c.title,
    c.slug,
    c.price,
    c.students_enrolled,
    c.rating,
    c.reviews_count,
    COUNT(DISTINCT e.id) as actual_enrollments,
    COUNT(DISTINCT cr.id) as actual_reviews,
    AVG(cr.rating) as calculated_rating,
    SUM(CASE WHEN p.status = 'successful' THEN p.amount ELSE 0 END) as total_revenue,
    i.user_id as instructor_user_id,
    u.first_name || ' ' || u.last_name as instructor_name
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
LEFT JOIN course_reviews cr ON c.id = cr.course_id
LEFT JOIN payments p ON c.id = p.course_id
LEFT JOIN instructors i ON c.instructor_id = i.id
LEFT JOIN users u ON i.user_id = u.id
GROUP BY c.id, c.title, c.slug, c.price, c.students_enrolled, c.rating, c.reviews_count, i.user_id, u.first_name, u.last_name;

-- View for student progress
CREATE VIEW student_progress AS
SELECT 
    e.id as enrollment_id,
    e.student_id,
    u.first_name || ' ' || u.last_name as student_name,
    c.id as course_id,
    c.title as course_title,
    e.enrollment_date,
    e.progress_percentage,
    e.is_completed,
    COUNT(cl.id) as total_lessons,
    COUNT(lp.id) as completed_lessons,
    CASE 
        WHEN COUNT(cl.id) > 0 THEN (COUNT(lp.id)::decimal / COUNT(cl.id) * 100)
        ELSE 0 
    END as calculated_progress
FROM enrollments e
JOIN users u ON e.student_id = u.id
JOIN courses c ON e.course_id = c.id
JOIN course_modules cm ON c.id = cm.course_id
JOIN course_lessons cl ON cm.id = cl.module_id
LEFT JOIN lesson_progress lp ON e.id = lp.enrollment_id AND cl.id = lp.lesson_id AND lp.is_completed = true
GROUP BY e.id, e.student_id, u.first_name, u.last_name, c.id, c.title, e.enrollment_date, e.progress_percentage, e.is_completed;

-- View for instructor dashboard
CREATE VIEW instructor_dashboard AS
SELECT 
    i.id as instructor_id,
    u.id as user_id,
    u.first_name || ' ' || u.last_name as instructor_name,
    COUNT(DISTINCT c.id) as total_courses,
    COUNT(DISTINCT e.id) as total_students,
    SUM(CASE WHEN p.status = 'successful' THEN p.amount ELSE 0 END) as total_earnings,
    AVG(cr.rating) as average_rating,
    COUNT(DISTINCT cr.id) as total_reviews
FROM instructors i
JOIN users u ON i.user_id = u.id
LEFT JOIN courses c ON i.id = c.instructor_id
LEFT JOIN enrollments e ON c.id = e.course_id
LEFT JOIN payments p ON c.id = p.course_id
LEFT JOIN course_reviews cr ON c.id = cr.course_id
GROUP BY i.id, u.id, u.first_name, u.last_name;

-- Function to calculate course completion rate
CREATE OR REPLACE FUNCTION get_course_completion_rate(course_uuid UUID)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    completion_rate DECIMAL(5,2);
BEGIN
    SELECT 
        CASE 
            WHEN COUNT(*) > 0 THEN (COUNT(CASE WHEN is_completed THEN 1 END)::decimal / COUNT(*) * 100)
            ELSE 0 
        END INTO completion_rate
    FROM enrollments 
    WHERE course_id = course_uuid;
    
    RETURN COALESCE(completion_rate, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to get student's next lesson
CREATE OR REPLACE FUNCTION get_next_lesson(enrollment_uuid UUID)
RETURNS TABLE(
    lesson_id UUID,
    lesson_title VARCHAR(255),
    module_title VARCHAR(255),
    video_url TEXT,
    is_free BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cl.id,
        cl.title,
        cm.title,
        cl.video_url,
        cl.is_free
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    JOIN course_modules cm ON c.id = cm.course_id
    JOIN course_lessons cl ON cm.id = cl.module_id
    LEFT JOIN lesson_progress lp ON e.id = lp.enrollment_id AND cl.id = lp.lesson_id
    WHERE e.id = enrollment_uuid
    AND (lp.id IS NULL OR lp.is_completed = false)
    ORDER BY cm.sort_order, cl.sort_order
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to update course statistics
CREATE OR REPLACE FUNCTION update_course_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update course enrollment count and rating
    UPDATE courses SET
        students_enrolled = (
            SELECT COUNT(*) FROM enrollments WHERE course_id = NEW.course_id
        ),
        rating = (
            SELECT COALESCE(AVG(rating), 0) FROM course_reviews WHERE course_id = NEW.course_id
        ),
        reviews_count = (
            SELECT COUNT(*) FROM course_reviews WHERE course_id = NEW.course_id
        )
    WHERE id = NEW.course_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update course stats
CREATE TRIGGER update_course_stats_on_enrollment
    AFTER INSERT OR DELETE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION update_course_stats();

CREATE TRIGGER update_course_stats_on_review
    AFTER INSERT OR UPDATE OR DELETE ON course_reviews
    FOR EACH ROW EXECUTE FUNCTION update_course_stats();
