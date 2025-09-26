import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, TrendingUp, Star, PlayCircle, CheckCircle, BookOpen, Brain, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import heroImage from '@/assets/hero-astronaut.jpg';
import studentsImage from '@/assets/students-learning.jpg';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "AI-powered assessments that adapt to your learning pace and style for optimal results."
    },
    {
      icon: Target,
      title: "Personalized Tests",
      description: "Customized exam experiences tailored to your skill level and learning objectives."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Comprehensive analytics and insights to monitor your learning journey."
    },
    {
      icon: Award,
      title: "Skill Certification",
      description: "Earn verified certificates upon successful completion of assessments."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Students", icon: Users },
    { number: "1000+", label: "Expert Tests", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: Award },
    { number: "4.9/5", label: "User Rating", icon: Star }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "Orchid helped me identify my weak areas and improve systematically. The adaptive learning is incredible!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Professional Developer",
      content: "The platform's comprehensive tests prepared me perfectly for my certification exams. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Mathematics Teacher",
      content: "I use Orchid to track my students' progress. The analytics provide invaluable insights.",
      rating: 5
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Choose Your Path",
      description: "Select from our comprehensive library of subjects and skill assessments."
    },
    {
      step: "2",
      title: "Take Adaptive Tests",
      description: "Experience personalized assessments that adapt to your learning level."
    },
    {
      step: "3",
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics and performance insights."
    },
    {
      step: "4",
      title: "Achieve Goals",
      description: "Earn certifications and achieve your academic or professional objectives."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8 animate-slideInLeft">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight">
                  Master Your Skills with
                  <span className="text-secondary block">Adaptive Learning</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Transform your learning journey with personalized assessments, 
                  real-time progress tracking, and AI-powered recommendations.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button size="lg" className="btn-hero-primary group">
                    Start Learning Today
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="group">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Free Trial Available</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slideInRight">
              <img 
                src={heroImage} 
                alt="Student learning with adaptive technology" 
                className="w-full h-auto rounded-2xl shadow-2xl float-animation"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Learning Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center space-y-2 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center">
                  <stat.icon className="h-8 w-8 text-primary mb-2" />
                </div>
                <div className="text-3xl font-bold font-display text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
              Why Choose Orchid?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of education with our cutting-edge features designed 
              to maximize your learning potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="learning-card animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
              How Orchid Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started on your learning journey in just four simple steps
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {howItWorks.map((step, index) => (
                <div 
                  key={step.step} 
                  className="flex space-x-4 animate-fadeInUp"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <img 
                src={studentsImage} 
                alt="Students taking online assessments" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of successful learners who have transformed their skills with Orchid
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name} 
                className="learning-card animate-fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                  <div className="space-y-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-white">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join Orchid today and experience personalized education that adapts to your unique learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="btn-hero-secondary">
                  Browse Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;