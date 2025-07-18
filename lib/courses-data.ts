export interface Instructor {
  id: string
  name: string
  title: string
  company: string
  avatar: string
  bio: string
  experience: string
  linkedin?: string
  twitter?: string
}

export interface CourseModule {
  id: string
  title: string
  description: string
  duration: string
  lessons: number
  isLocked?: boolean
}

export interface CourseReview {
  id: string
  studentName: string
  rating: number
  comment: string
  date: string
  avatar: string
  verified: boolean
}

export interface DetailedCourse {
  id: string
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  price: number
  originalPrice?: number
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  subcategory?: string
  thumbnail: string
  video?: string
  instructor: Instructor
  studentsEnrolled: number
  rating: number
  reviewsCount: number
  lastUpdated: string
  language: string
  certificate: boolean
  features: string[]
  requirements: string[]
  whatYouWillLearn: string[]
  modules: CourseModule[]
  reviews: CourseReview[]
  tags: string[]
  isPopular?: boolean
  isBestseller?: boolean
  isNew?: boolean
  jobOutcomes: {
    averageSalary: string
    jobTitles: string[]
    hiringCompanies: string[]
  }
}

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
  features: string[]
}

export const instructors: Instructor[] = [
  {
    id: "sarah-adebayo",
    name: "Sarah Adebayo",
    title: "Senior Product Designer",
    company: "Paystack",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    bio: "Sarah has 8+ years of experience designing digital products for millions of users across Africa. She's led design teams at Paystack, Flutterwave, and several startups.",
    experience: "8+ years",
    linkedin: "https://linkedin.com/in/sarah-adebayo",
  },
  {
    id: "james-okafor",
    name: "James Okafor",
    title: "Full-Stack Developer",
    company: "Andela",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "James is a senior developer who has built applications used by over 1M users. He specializes in React, Node.js, and cloud architecture.",
    experience: "10+ years",
    linkedin: "https://linkedin.com/in/james-okafor",
  },
  {
    id: "ada-nwosu",
    name: "Ada Nwosu",
    title: "Data Science Manager",
    company: "Jumia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    bio: "Ada leads the data science team at Jumia, where she builds ML models that drive business decisions. She has a PhD in Statistics from UI.",
    experience: "7+ years",
    linkedin: "https://linkedin.com/in/ada-nwosu",
  },
  {
    id: "kemi-johnson",
    name: "Kemi Johnson",
    title: "Digital Marketing Director",
    company: "GTBank",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Kemi has grown digital audiences from 0 to millions across multiple industries. She's an expert in social media marketing and paid advertising.",
    experience: "6+ years",
    linkedin: "https://linkedin.com/in/kemi-johnson",
  },
  {
    id: "instructor-1",
    name: "John Doe",
    title: "Full Stack Developer",
    company: "Tech Innovators",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "John is a seasoned full-stack developer with expertise in React, Node.js, and MongoDB.",
    experience: "12+ years",
    linkedin: "https://linkedin.com/in/john-doe",
  },
  {
    id: "instructor-2",
    name: "Jane Smith",
    title: "Data Scientist",
    company: "Data Analytics Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    bio: "Jane is a data scientist with a strong background in Python and machine learning.",
    experience: "10+ years",
    linkedin: "https://linkedin.com/in/jane-smith",
  },
  {
    id: "instructor-3",
    name: "Mike Johnson",
    title: "Mobile Developer",
    company: "AppWorks",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Mike specializes in mobile app development using React Native and Expo.",
    experience: "8+ years",
    linkedin: "https://linkedin.com/in/mike-johnson",
  },
]

export const detailedCourses: DetailedCourse[] = [
  {
    id: "web-dev",
    title: "Full-Stack Web Development Bootcamp",
    slug: "full-stack-web-development-bootcamp",
    shortDescription: "Learn to build modern web applications from scratch using React, Node.js, and MongoDB",
    fullDescription:
      "This comprehensive bootcamp will take you from beginner to job-ready full-stack developer in 6 months. You'll learn modern web technologies including HTML5, CSS3, JavaScript ES6+, React, Node.js, Express, and MongoDB. By the end of this course, you'll have built 5 real-world projects and be ready to land your first developer job.",
    price: 180000,
    originalPrice: 200000,
    duration: "6 months",
    level: "Beginner",
    category: "Web Development",
    subcategory: "Full-Stack",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
    instructor: instructors[1],
    studentsEnrolled: 1247,
    rating: 4.9,
    reviewsCount: 324,
    lastUpdated: "December 2024",
    language: "English",
    certificate: true,
    isPopular: true,
    isBestseller: true,
    features: [
      "6 months of intensive training",
      "5 real-world projects",
      "Personal mentor assigned",
      "Job placement support",
      "Lifetime access to course materials",
      "Private student community",
      "Weekly live coding sessions",
      "Code review and feedback",
    ],
    requirements: [
      "Basic computer literacy",
      "Reliable internet connection",
      "Laptop or desktop computer",
      "Willingness to dedicate 15-20 hours per week",
    ],
    whatYouWillLearn: [
      "Build responsive websites with HTML5, CSS3, and JavaScript",
      "Create interactive user interfaces with React",
      "Develop server-side applications with Node.js and Express",
      "Work with databases using MongoDB",
      "Deploy applications to the cloud",
      "Use Git and GitHub for version control",
      "Implement user authentication and authorization",
      "Build RESTful APIs",
      "Test your applications",
      "Follow industry best practices",
    ],
    modules: [
      {
        id: "module-1",
        title: "Web Fundamentals",
        description: "Learn HTML5, CSS3, and JavaScript basics",
        duration: "4 weeks",
        lessons: 24,
      },
      {
        id: "module-2",
        title: "Advanced JavaScript & React",
        description: "Master modern JavaScript and React development",
        duration: "6 weeks",
        lessons: 32,
      },
      {
        id: "module-3",
        title: "Backend Development",
        description: "Build server-side applications with Node.js",
        duration: "6 weeks",
        lessons: 28,
      },
      {
        id: "module-4",
        title: "Database & Deployment",
        description: "Work with databases and deploy your applications",
        duration: "4 weeks",
        lessons: 20,
      },
      {
        id: "module-5",
        title: "Portfolio Projects",
        description: "Build 5 real-world projects for your portfolio",
        duration: "4 weeks",
        lessons: 16,
      },
    ],
    reviews: [
      {
        id: "review-1",
        studentName: "David Okonkwo",
        rating: 5,
        comment:
          "This course changed my life! I went from knowing nothing about coding to landing a $2,500/month remote job. James is an excellent instructor.",
        date: "2 weeks ago",
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
      {
        id: "review-2",
        studentName: "Blessing Eze",
        rating: 5,
        comment:
          "The projects are real-world and the mentorship is invaluable. I'm now working as a frontend developer at a fintech startup.",
        date: "1 month ago",
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
    ],
    tags: ["JavaScript", "React", "Node.js", "MongoDB", "Full-Stack", "Web Development"],
    jobOutcomes: {
      averageSalary: "₦300K - ₦800K monthly",
      jobTitles: ["Full-Stack Developer", "Frontend Developer", "Backend Developer", "Web Developer"],
      hiringCompanies: ["Paystack", "Flutterwave", "Andela", "Interswitch", "Konga"],
    },
  },
  {
    id: "ui-ux",
    title: "Digital Product Design Mastery",
    slug: "digital-product-design-mastery",
    shortDescription: "Master UI/UX design with Figma, user research, and design systems",
    fullDescription:
      "Become a product designer who creates beautiful, user-centered digital experiences. This course covers everything from user research and wireframing to visual design and prototyping. You'll learn industry-standard tools like Figma and build a portfolio that gets you hired.",
    price: 150000,
    originalPrice: 170000,
    duration: "4 months",
    level: "Beginner",
    category: "Design",
    subcategory: "UI/UX",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    instructor: instructors[0],
    studentsEnrolled: 892,
    rating: 4.9,
    reviewsCount: 267,
    lastUpdated: "November 2024",
    language: "English",
    certificate: true,
    isPopular: true,
    features: [
      "4 months of design training",
      "3 portfolio projects",
      "Personal design mentor",
      "Weekly design critiques",
      "Job placement guarantee",
      "Figma Pro access included",
      "Design system templates",
      "Industry networking events",
    ],
    requirements: [
      "No prior design experience needed",
      "Computer with internet access",
      "Willingness to practice daily",
      "Eye for detail and aesthetics",
    ],
    whatYouWillLearn: [
      "Conduct user research and create personas",
      "Design wireframes and user flows",
      "Create high-fidelity mockups in Figma",
      "Build interactive prototypes",
      "Design responsive interfaces",
      "Create and maintain design systems",
      "Present your designs effectively",
      "Collaborate with developers",
      "Test and iterate on designs",
      "Build a professional portfolio",
    ],
    modules: [
      {
        id: "module-1",
        title: "Design Fundamentals",
        description: "Learn design principles, color theory, and typography",
        duration: "3 weeks",
        lessons: 18,
      },
      {
        id: "module-2",
        title: "User Research & Strategy",
        description: "Understand users and define design problems",
        duration: "3 weeks",
        lessons: 15,
      },
      {
        id: "module-3",
        title: "Wireframing & Prototyping",
        description: "Create wireframes and interactive prototypes",
        duration: "4 weeks",
        lessons: 20,
      },
      {
        id: "module-4",
        title: "Visual Design & Systems",
        description: "Master visual design and create design systems",
        duration: "4 weeks",
        lessons: 22,
      },
      {
        id: "module-5",
        title: "Portfolio Development",
        description: "Build your design portfolio and prepare for interviews",
        duration: "2 weeks",
        lessons: 12,
      },
    ],
    reviews: [
      {
        id: "review-1",
        studentName: "Kemi Adebayo",
        rating: 5,
        comment:
          "Sarah's mentorship was incredible. I'm now a Product Designer at Flutterwave earning ₦800K monthly. The portfolio projects were key to getting hired.",
        date: "3 weeks ago",
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
    ],
    tags: ["UI/UX", "Figma", "Design Systems", "User Research", "Prototyping"],
    jobOutcomes: {
      averageSalary: "₦400K - ₦1.2M monthly",
      jobTitles: ["UI/UX Designer", "Product Designer", "Visual Designer", "UX Researcher"],
      hiringCompanies: ["Paystack", "Flutterwave", "Jumia", "Kuda", "PiggyVest"],
    },
  },
  {
    id: "data-science",
    title: "Data Science for Business",
    slug: "data-science-for-business",
    shortDescription: "Learn Python, machine learning, and data analysis for business applications",
    fullDescription:
      "Transform raw data into business insights with this comprehensive data science course. You'll learn Python programming, statistical analysis, machine learning, and data visualization. Perfect for beginners who want to break into the high-paying field of data science.",
    price: 200000,
    originalPrice: 220000,
    duration: "5 months",
    level: "Beginner",
    category: "Data Science",
    subcategory: "Machine Learning",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    instructor: instructors[2],
    studentsEnrolled: 634,
    rating: 4.8,
    reviewsCount: 189,
    lastUpdated: "December 2024",
    language: "English",
    certificate: true,
    isNew: true,
    features: [
      "5 months of intensive training",
      "4 real-world projects",
      "Python and R programming",
      "Machine learning algorithms",
      "Data visualization tools",
      "Industry datasets",
      "Kaggle competition participation",
      "Job placement support",
    ],
    requirements: [
      "Basic mathematics knowledge",
      "No programming experience needed",
      "Computer with 8GB+ RAM",
      "Analytical mindset",
    ],
    whatYouWillLearn: [
      "Python programming for data science",
      "Statistical analysis and hypothesis testing",
      "Data cleaning and preprocessing",
      "Exploratory data analysis",
      "Machine learning algorithms",
      "Data visualization with matplotlib and seaborn",
      "Working with databases and SQL",
      "Building predictive models",
      "Deploying ML models to production",
      "Communicating insights to stakeholders",
    ],
    modules: [
      {
        id: "module-1",
        title: "Python Fundamentals",
        description: "Learn Python programming from scratch",
        duration: "4 weeks",
        lessons: 20,
      },
      {
        id: "module-2",
        title: "Data Analysis with Pandas",
        description: "Master data manipulation and analysis",
        duration: "4 weeks",
        lessons: 24,
      },
      {
        id: "module-3",
        title: "Statistics & Visualization",
        description: "Statistical analysis and data visualization",
        duration: "4 weeks",
        lessons: 22,
      },
      {
        id: "module-4",
        title: "Machine Learning",
        description: "Build and deploy ML models",
        duration: "6 weeks",
        lessons: 30,
      },
      {
        id: "module-5",
        title: "Capstone Projects",
        description: "Work on real business problems",
        duration: "4 weeks",
        lessons: 16,
      },
    ],
    reviews: [
      {
        id: "review-1",
        studentName: "Chuka Okafor",
        rating: 5,
        comment:
          "Ada is an amazing instructor. The course is practical and I'm now working as an Analytics Manager at Jumia. The salary increase was 300%!",
        date: "1 week ago",
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
    ],
    tags: ["Python", "Machine Learning", "Data Analysis", "Statistics", "SQL"],
    jobOutcomes: {
      averageSalary: "₦500K - ₦1.5M monthly",
      jobTitles: ["Data Scientist", "Data Analyst", "ML Engineer", "Business Analyst"],
      hiringCompanies: ["Jumia", "MTN", "Access Bank", "Dangote", "Shell"],
    },
  },
  {
    id: "digital-marketing",
    title: "Social Media Marketing Pro",
    slug: "social-media-marketing-pro",
    shortDescription: "Master Facebook Ads, Instagram marketing, and content strategy",
    fullDescription:
      "Become a digital marketing expert who can grow brands and drive sales online. This course covers social media marketing, paid advertising, content creation, and analytics. You'll learn to manage campaigns that generate real ROI for businesses.",
    price: 100000,
    originalPrice: 120000,
    duration: "3 months",
    level: "Beginner",
    category: "Marketing",
    subcategory: "Social Media",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    instructor: instructors[3],
    studentsEnrolled: 1456,
    rating: 4.7,
    reviewsCount: 412,
    lastUpdated: "October 2024",
    language: "English",
    certificate: true,
    isBestseller: true,
    features: [
      "3 months of marketing training",
      "5 live client campaigns",
      "Facebook & Instagram ads",
      "Content creation tools",
      "Analytics and reporting",
      "Agency setup guidance",
      "Client acquisition strategies",
      "Ongoing community support",
    ],
    requirements: [
      "Basic social media knowledge",
      "Smartphone or computer",
      "Willingness to experiment",
      "Interest in business growth",
    ],
    whatYouWillLearn: [
      "Create engaging social media content",
      "Run profitable Facebook and Instagram ads",
      "Develop content marketing strategies",
      "Analyze campaign performance",
      "Build and manage online communities",
      "Use marketing automation tools",
      "Create sales funnels",
      "Manage client relationships",
      "Scale marketing campaigns",
      "Start your own marketing agency",
    ],
    modules: [
      {
        id: "module-1",
        title: "Social Media Fundamentals",
        description: "Master the basics of social media marketing",
        duration: "3 weeks",
        lessons: 15,
      },
      {
        id: "module-2",
        title: "Content Creation & Strategy",
        description: "Create compelling content that converts",
        duration: "3 weeks",
        lessons: 18,
      },
      {
        id: "module-3",
        title: "Paid Advertising",
        description: "Master Facebook and Instagram ads",
        duration: "4 weeks",
        lessons: 24,
      },
      {
        id: "module-4",
        title: "Analytics & Optimization",
        description: "Measure and improve campaign performance",
        duration: "2 weeks",
        lessons: 12,
      },
    ],
    reviews: [
      {
        id: "review-1",
        studentName: "Fatima Hassan",
        rating: 5,
        comment:
          "I started as a complete beginner and now I manage social media for 10 businesses. Kemi's teaching style is practical and results-focused.",
        date: "2 weeks ago",
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
    ],
    tags: ["Social Media", "Facebook Ads", "Instagram", "Content Marketing", "Digital Marketing"],
    jobOutcomes: {
      averageSalary: "₦200K - ₦600K monthly",
      jobTitles: ["Social Media Manager", "Digital Marketer", "Content Creator", "Marketing Consultant"],
      hiringCompanies: ["GTBank", "Coca-Cola", "Unilever", "Shoprite", "Various SMEs"],
    },
  },
]

export const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development with React & Node.js",
    slug: "full-stack-web-development",
    description:
      "Master modern web development with React, Node.js, and MongoDB. Build real-world applications from scratch.",
    short_description: "Learn full-stack development with React, Node.js, and MongoDB",
    thumbnail_url: "/placeholder.svg?height=200&width=300",
    price: 150000,
    original_price: 200000,
    currency: "NGN",
    duration_hours: 40,
    level: "intermediate",
    enrollment_count: 1250,
    rating: 4.8,
    total_reviews: 324,
    is_featured: true,
    is_published: true,
    category_name: "Web Development",
    instructor_name: "John Doe",
    instructor_id: "instructor-1",
    instructor_rating: 4.9,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    features: [
      "Build 5 real-world projects",
      "Master React hooks and context",
      "Learn Node.js and Express",
      "Database design with MongoDB",
      "Authentication and authorization",
      "Deploy to production",
    ],
  },
  {
    id: "2",
    title: "Data Science with Python",
    slug: "data-science-python",
    description: "Learn data analysis, machine learning, and visualization with Python, pandas, and scikit-learn.",
    short_description: "Master data science and machine learning with Python",
    thumbnail_url: "/placeholder.svg?height=200&width=300",
    price: 120000,
    original_price: 160000,
    currency: "NGN",
    duration_hours: 35,
    level: "beginner",
    enrollment_count: 890,
    rating: 4.7,
    total_reviews: 256,
    is_featured: true,
    is_published: true,
    category_name: "Data Science",
    instructor_name: "Jane Smith",
    instructor_id: "instructor-2",
    instructor_rating: 4.8,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
    features: [
      "Python fundamentals",
      "Data analysis with pandas",
      "Machine learning algorithms",
      "Data visualization",
      "Real-world projects",
      "Career guidance",
    ],
  },
  {
    id: "3",
    title: "Mobile App Development with React Native",
    slug: "react-native-mobile-development",
    description: "Build cross-platform mobile apps for iOS and Android using React Native and Expo.",
    short_description: "Create mobile apps with React Native",
    thumbnail_url: "/placeholder.svg?height=200&width=300",
    price: 130000,
    original_price: 170000,
    currency: "NGN",
    duration_hours: 30,
    level: "intermediate",
    enrollment_count: 675,
    rating: 4.6,
    total_reviews: 189,
    is_featured: false,
    is_published: true,
    category_name: "Mobile Development",
    instructor_name: "Mike Johnson",
    instructor_id: "instructor-3",
    instructor_rating: 4.7,
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
    features: [
      "React Native fundamentals",
      "Navigation and routing",
      "State management",
      "Native device features",
      "App store deployment",
      "Performance optimization",
    ],
  },
]

export const categories = [
  { id: "all", name: "All Courses", count: detailedCourses.length + sampleCourses.length },
  { id: "web-development", name: "Web Development", count: 2 },
  { id: "design", name: "Design", count: 1 },
  { id: "data-science", name: "Data Science", count: 2 },
  { id: "marketing", name: "Marketing", count: 1 },
  { id: "mobile-development", name: "Mobile Development", count: 1 },
]

export const courseCategories = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Frontend and backend web development",
    icon: "🌐",
    courseCount: 2,
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Data analysis and machine learning",
    icon: "📊",
    courseCount: 2,
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    description: "iOS and Android app development",
    icon: "📱",
    courseCount: 1,
  },
  {
    id: "design",
    name: "Design",
    description: "UI/UX and graphic design",
    icon: "🎨",
    courseCount: 1,
  },
]

export const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

export const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]
