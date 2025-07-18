"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Target,
  Award,
  Heart,
  Globe,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  Building,
} from "lucide-react"

interface AboutPageProps {
  onBackToHome?: () => void
  onViewCourses?: () => void
}

export function AboutPage({ onBackToHome, onViewCourses }: AboutPageProps) {
  const stats = [
    { icon: Users, value: "2,000+", label: "Students Trained", color: "text-blue-600" },
    { icon: Award, value: "85%", label: "Job Placement Rate", color: "text-green-600" },
    { icon: TrendingUp, value: "300%", label: "Average Salary Increase", color: "text-purple-600" },
    { icon: Globe, value: "15+", label: "Countries Reached", color: "text-orange-600" },
  ]

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We deliver world-class education that meets international standards while addressing local needs.",
    },
    {
      icon: Heart,
      title: "Empowerment",
      description: "We believe every Nigerian youth deserves access to opportunities that can transform their lives.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We use cutting-edge teaching methods and technology to make learning engaging and effective.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We build strong networks that support our students throughout their career journey.",
    },
  ]

  const team = [
    {
      name: "Adebayo Ogundimu",
      role: "Founder & CEO",
      bio: "Former Google engineer with 12+ years in tech. Passionate about bridging the digital skills gap in Africa.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
    },
    {
      name: "Kemi Adebisi",
      role: "Head of Curriculum",
      bio: "Ex-Microsoft product manager. Led digital transformation initiatives across 5 African countries.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
    },
    {
      name: "Chuka Okafor",
      role: "Head of Student Success",
      bio: "Former Andela talent manager. Helped 500+ developers land remote jobs with global companies.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
    },
    {
      name: "Fatima Hassan",
      role: "Head of Partnerships",
      bio: "Ex-Paystack business development. Built partnerships with 100+ companies for talent acquisition.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
    },
  ]

  const milestones = [
    {
      year: "2021",
      title: "SpaceHub Founded",
      description: "Started with a vision to democratize digital skills education in Nigeria",
    },
    {
      year: "2022",
      title: "First 100 Students",
      description: "Achieved 90% job placement rate with our pilot cohort",
    },
    {
      year: "2023",
      title: "1,000 Graduates",
      description: "Expanded to 5 courses and partnered with 50+ hiring companies",
    },
    {
      year: "2024",
      title: "Pan-African Expansion",
      description: "Launched in Ghana, Kenya, and South Africa with 2,000+ active students",
    },
  ]

  const partners = [
    { name: "Paystack", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "Flutterwave", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "Andela", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "Interswitch", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "Kuda Bank", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "PiggyVest", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">About SpaceHub</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering Africa's{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Future
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to bridge the digital skills gap in Africa by providing world-class education that
              transforms lives and creates global opportunities for African youth.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop"
              alt="Diverse team of African professionals collaborating"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To democratize access to high-quality digital skills education across Africa, enabling young people to
                build sustainable careers in the global digital economy.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We believe that talent is equally distributed, but opportunity is not. SpaceHub exists to change that by
                providing world-class education that's accessible, affordable, and relevant to the African context.
              </p>
              <Button onClick={onViewCourses} size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Our Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop"
                alt="African students learning with laptops"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our students and community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse team of educators, technologists, and business leaders are united by a shared passion for
              African development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey/Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-lg text-gray-600">From a small idea to transforming thousands of lives across Africa.</p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                </div>
                <Card className="flex-1 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{milestone.year}</Badge>
                      <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We work with leading African companies to provide real opportunities for our graduates.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-center">
                  <Building className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-600">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Real Impact, Real Stories</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Every number represents a life transformed, a family uplifted, and a community strengthened.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
                <p className="text-blue-100">Average student rating across all courses</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">₦500K+</h3>
                <p className="text-blue-100">Average starting salary for our graduates</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">60%</h3>
                <p className="text-blue-100">Of graduates work with international companies</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Future?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of African youth who have already started their journey to financial freedom and career
            success with SpaceHub.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onViewCourses} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4">
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={onBackToHome} variant="outline" size="lg" className="px-8 py-4 bg-transparent">
              Back to Home
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>30-day guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Lifetime access</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
