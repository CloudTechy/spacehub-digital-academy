export interface Course {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  thumbnail_url: string
  price: number
  original_price?: number
  currency: string
  duration_hours: number
  level: "beginner" | "intermediate" | "advanced"
  enrollment_count: number
  rating: number
  total_reviews: number
  is_featured: boolean
  is_published: boolean
  category_name: string
  instructor_name: string
  instructor_id: string
  instructor_rating: number
  created_at: string
  updated_at: string
  lessons?: Lesson[]
  reviews?: Review[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  duration_minutes: number
  video_url?: string
  content?: string
  order_index: number
  is_free: boolean
}

export interface Review {
  id: string
  user_name: string
  user_avatar?: string
  rating: number
  comment: string
  created_at: string
}

export const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    slug: "complete-web-development-bootcamp",
    description:
      "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career as a full-stack developer.",
    short_description: "Learn full-stack web development from scratch with hands-on projects",
    thumbnail_url: "/placeholder.svg?height=300&width=400",
    price: 89000,
    original_price: 120000,
    currency: "NGN",
    duration_hours: 40,
    level: "beginner",
    enrollment_count: 1250,
    rating: 4.8,
    total_reviews: 324,
    is_featured: true,
    is_published: true,
    category_name: "Web Development",
    instructor_name: "Sarah Johnson",
    instructor_id: "inst_1",
    instructor_rating: 4.9,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
    lessons: [
      {
        id: "lesson_1",
        title: "Introduction to Web Development",
        description: "Overview of web development and setting up your development environment",
        duration_minutes: 45,
        video_url: "https://example.com/video1",
        order_index: 1,
        is_free: true,
      },
      {
        id: "lesson_2",
        title: "HTML Fundamentals",
        description: "Learn the building blocks of web pages with HTML",
        duration_minutes: 60,
        video_url: "https://example.com/video2",
        order_index: 2,
        is_free: true,
      },
      {
        id: "lesson_3",
        title: "CSS Styling and Layout",
        description: "Style your web pages with CSS and create responsive layouts",
        duration_minutes: 75,
        video_url: "https://example.com/video3",
        order_index: 3,
        is_free: false,
      },
    ],
    reviews: [
      {
        id: "review_1",
        user_name: "Michael Chen",
        user_avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "Excellent course! The instructor explains everything clearly and the projects are very practical.",
        created_at: "2024-01-18T00:00:00Z",
      },
      {
        id: "review_2",
        user_name: "Emily Rodriguez",
        user_avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "This course changed my career. I went from zero coding knowledge to landing my first developer job!",
        created_at: "2024-01-17T00:00:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Data Science with Python",
    slug: "data-science-with-python",
    description:
      "Learn data science fundamentals with Python, pandas, NumPy, and machine learning. Analyze real datasets and build predictive models.",
    short_description: "Master data science and machine learning with Python",
    thumbnail_url: "/placeholder.svg?height=300&width=400",
    price: 95000,
    original_price: 130000,
    currency: "NGN",
    duration_hours: 35,
    level: "intermediate",
    enrollment_count: 890,
    rating: 4.7,
    total_reviews: 256,
    is_featured: true,
    is_published: true,
    category_name: "Data Science",
    instructor_name: "Dr. James Wilson",
    instructor_id: "inst_2",
    instructor_rating: 4.8,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    title: "Mobile App Development with React Native",
    slug: "mobile-app-development-react-native",
    description:
      "Build cross-platform mobile apps for iOS and Android using React Native. Learn navigation, state management, and app deployment.",
    short_description: "Create mobile apps for iOS and Android with React Native",
    thumbnail_url: "/placeholder.svg?height=300&width=400",
    price: 75000,
    original_price: 100000,
    currency: "NGN",
    duration_hours: 30,
    level: "intermediate",
    enrollment_count: 650,
    rating: 4.6,
    total_reviews: 189,
    is_featured: false,
    is_published: true,
    category_name: "Mobile Development",
    instructor_name: "Alex Thompson",
    instructor_id: "inst_3",
    instructor_rating: 4.7,
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-12T00:00:00Z",
  },
  {
    id: "4",
    title: "Digital Marketing Mastery",
    slug: "digital-marketing-mastery",
    description:
      "Master digital marketing strategies including SEO, social media marketing, email marketing, and paid advertising. Grow your business online.",
    short_description: "Complete guide to digital marketing and online business growth",
    thumbnail_url: "/placeholder.svg?height=300&width=400",
    price: 65000,
    original_price: 85000,
    currency: "NGN",
    duration_hours: 25,
    level: "beginner",
    enrollment_count: 1100,
    rating: 4.5,
    total_reviews: 298,
    is_featured: true,
    is_published: true,
    category_name: "Marketing",
    instructor_name: "Maria Garcia",
    instructor_id: "inst_4",
    instructor_rating: 4.6,
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-18T00:00:00Z",
  },
  {
    id: "5",
    title: "UI/UX Design Fundamentals",
    slug: "ui-ux-design-fundamentals",
    description:
      "Learn user interface and user experience design principles. Master Figma, create wireframes, prototypes, and design systems.",
    short_description: "Design beautiful and user-friendly interfaces",
    thumbnail_url: "/placeholder.svg?height=300&width=400",
    price: 70000,
    original_price: 95000,
    currency: "NGN",
    duration_hours: 28,
    level: "beginner",
    enrollment_count: 780,
    rating: 4.7,
    total_reviews: 167,
    is_featured: false,
    is_published: true,
    category_name: "Design",
    instructor_name: "David Kim",
    instructor_id: "inst_5",
    instructor_rating: 4.8,
    created_at: "2024-01-12T00:00:00Z",
    updated_at: "2024-01-19T00:00:00Z",
  },
  {
    id: "6",
    title: "Cloud Computing with AWS",
    slug: "cloud-computing-aws",
    description:
      "Master Amazon Web Services (AWS) cloud platform. Learn EC2, S3, Lambda, and deploy scalable applications in the cloud.",
    short_description: "Learn cloud computing and AWS services",
    thumbnail_url: "/placeholder.svg?height=300&width=400",
    price: 85000,
    original_price: 115000,
    currency: "NGN",
    duration_hours: 32,
    level: "intermediate",
    enrollment_count: 520,
    rating: 4.8,
    total_reviews: 143,
    is_featured: false,
    is_published: true,
    category_name: "Cloud Computing",
    instructor_name: "Robert Chen",
    instructor_id: "inst_6",
    instructor_rating: 4.9,
    created_at: "2024-01-14T00:00:00Z",
    updated_at: "2024-01-21T00:00:00Z",
  },
]

export const courseCategories = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Build modern websites and web applications",
    icon: "💻",
    courseCount: 45,
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Analyze data and build machine learning models",
    icon: "📊",
    courseCount: 28,
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    description: "Create mobile apps for iOS and Android",
    icon: "📱",
    courseCount: 22,
  },
  {
    id: "design",
    name: "Design",
    description: "UI/UX design and graphic design",
    icon: "🎨",
    courseCount: 35,
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    description: "Grow your business with digital marketing",
    icon: "📈",
    courseCount: 31,
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing",
    description: "Deploy and manage applications in the cloud",
    icon: "☁️",
    courseCount: 18,
  },
]
