-- Create useful views and functions for the SpaceHub platform

-- View: Course statistics with instructor info
CREATE VIEW course_stats AS
SELECT 
    c.id,
    c.title,
    c.slug,
    c.price,
    c.thumbnail_url,
    c.is_published,
    c.enrollment_count,
    c.average_rating,
    c.total_reviews,
    cat.name as category_name,
    cat.slug as category_slug,
    u.first_name || ' ' || u.last_name as instructor_name,
    i.average_rating as instructor_rating,
    COUNT(DISTINCT cm.id) as total_modules,
    COUNT(DISTINCT cl.id) as total_lessons,
    COUNT(DISTINCT CASE WHEN cl.is_free THEN cl.id END) as free_lessons,
    SUM(cl.video_duration) as total_duration_seconds
FROM courses c
LEFT JOIN categories cat ON c.category_id = cat.id
LEFT JOIN instructors i ON c.instructor_id = i.id
LEFT JOIN users u ON i.user_id = u.id
LEFT JOIN course_modules cm ON c.id = cm.course_id
LEFT JOIN course_lessons cl ON cm.id = cl.module_id
GROUP BY c.id, cat.name, cat.slug, u.first_name, u.last_name, i.average_rating;

-- View: Student progress overview
CREATE VIEW student_progress AS
SELECT 
    u.id as user_id,
    u.first_name || ' ' || u.last_name as student_name,
    c.id as course_id,
    c.title as course_title,
    e.enrollment_date,
    e.progress_percentage,
    e.is_completed,
    e.completion_date,
    COUNT(lp.id) as lessons_completed,
    COUNT(cl.id) as total_lessons,
    CASE 
        WHEN COUNT(cl.id) > 0 THEN 
            ROUND((COUNT(lp.id)::decimal / COUNT(cl.id)) * 100, 2)
        ELSE 0 
    END as calculated_progress
FROM users u
JOIN enrollments e ON u.id = e.user_id
JOIN courses c ON e.course_id = c.id
JOIN course_modules cm ON c.id = cm.course_id
JOIN course_lessons cl ON cm.id = cl.module_id
LEFT JOIN lesson_progress lp ON e.id = lp.enrollment_id AND cl.id = lp.lesson_id AND lp.is_completed = true
WHERE u.role = 'student'
GROUP BY u.id, u.first_name, u.last_name, c.id, c.title, e.enrollment_date, e.progress_percentage, e.is_completed, e.completion_date;

-- View: Instructor dashboard stats
CREATE VIEW instructor_dashboard AS
SELECT 
    u.id as instructor_id,
    u.first_name || ' ' || u.last_name as instructor_name,
    COUNT(DISTINCT c.id) as total_courses,
    COUNT(DISTINCT e.id) as total_students,
    COALESCE(AVG(cr.rating), 0) as average_rating,
    COUNT(DISTINCT cr.id) as total_reviews,
    COALESCE(SUM(p.amount), 0) as total_revenue,
    COUNT(DISTINCT CASE WHEN e.is_completed THEN e.id END) as completed_enrollments
FROM users u
JOIN instructors i ON u.id = i.user_id
LEFT JOIN courses c ON i.id = c.instructor_id
LEFT JOIN enrollments e ON c.id = e.course_id
LEFT JOIN course_reviews cr ON c.id = cr.course_id
LEFT JOIN payments p ON c.id = p.course_id AND p.status = 'success'
WHERE u.role = 'instructor'
GROUP BY u.id, u.first_name, u.last_name;

-- Function: Get next lesson for a student
CREATE OR REPLACE FUNCTION get_next_lesson(p_user_id UUID, p_course_id UUID)
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
    FROM course_lessons cl
    JOIN course_modules cm ON cl.module_id = cm.id
    JOIN courses c ON cm.course_id = c.id
    JOIN enrollments e ON c.id = e.course_id AND e.user_id = p_user_id
    LEFT JOIN lesson_progress lp ON cl.id = lp.lesson_id AND lp.enrollment_id = e.id
    WHERE c.id = p_course_id 
    AND (lp.is_completed IS NULL OR lp.is_completed = false)
    AND cl.is_published = true
    ORDER BY cm.order_index, cl.order_index
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function: Calculate course completion rate
CREATE OR REPLACE FUNCTION calculate_completion_rate(p_course_id UUID)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    total_enrollments INTEGER;
    completed_enrollments INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_enrollments
    FROM enrollments 
    WHERE course_id = p_course_id;
    
    SELECT COUNT(*) INTO completed_enrollments
    FROM enrollments 
    WHERE course_id = p_course_id AND is_completed = true;
    
    IF total_enrollments = 0 THEN
        RETURN 0.00;
    END IF;
    
    RETURN ROUND((completed_enrollments::decimal / total_enrollments) * 100, 2);
END;
$$ LANGUAGE plpgsql;

-- Function: Update course statistics (to be called after reviews/enrollments)
CREATE OR REPLACE FUNCTION update_course_stats(p_course_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE courses 
    SET 
        enrollment_count = (
            SELECT COUNT(*) FROM enrollments WHERE course_id = p_course_id
        ),
        average_rating = (
            SELECT COALESCE(AVG(rating), 0) FROM course_reviews 
            WHERE course_id = p_course_id AND is_published = true
        ),
        total_reviews = (
            SELECT COUNT(*) FROM course_reviews 
            WHERE course_id = p_course_id AND is_published = true
        ),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_course_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update course stats when reviews are added
CREATE OR REPLACE FUNCTION trigger_update_course_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        PERFORM update_course_stats(NEW.course_id);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM update_course_stats(OLD.course_id);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER course_reviews_stats_trigger
    AFTER INSERT OR UPDATE OR DELETE ON course_reviews
    FOR EACH ROW EXECUTE FUNCTION trigger_update_course_stats();

CREATE TRIGGER enrollments_stats_trigger
    AFTER INSERT OR UPDATE OR DELETE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION trigger_update_course_stats();
