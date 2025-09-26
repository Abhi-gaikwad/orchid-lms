import React from 'react';
import { Target, Users, Award, Lightbulb, Heart, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import teamImage from '@/assets/team-illustration.jpg';
import studentsImage from '@/assets/students-learning.jpg';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in educational assessment and personalized learning experiences."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making quality education accessible to learners worldwide, regardless of their background or location."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously evolving our platform with cutting-edge technology and pedagogical insights."
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every decision we make is guided by what's best for our students' learning outcomes."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description: "Orchid was founded with a vision to revolutionize online assessment and adaptive learning."
    },
    {
      year: "2021",
      title: "AI Integration",
      description: "Launched our first AI-powered adaptive assessment engine for personalized learning paths."
    },
    {
      year: "2022",
      title: "50K Students",
      description: "Reached our first major milestone of 50,000 active students across various subjects."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to serve students in over 50 countries with multi-language support."
    },
    {
      year: "2024",
      title: "100K+ Tests",
      description: "Crossed 100,000 completed assessments with 95% student satisfaction rate."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former Stanford professor with 15+ years in educational technology and adaptive learning research.",
      expertise: "Educational Psychology, AI in Education"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer specializing in machine learning and scalable educational platforms.",
      expertise: "Machine Learning, Software Architecture"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Curriculum",
      bio: "Curriculum design expert with experience at leading educational institutions worldwide.",
      expertise: "Curriculum Development, Assessment Design"
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product strategist focused on creating intuitive and effective learning experiences.",
      expertise: "Product Strategy, User Experience"
    }
  ];

  const achievements = [
    "Featured in TechCrunch as 'Most Innovative EdTech Platform 2023'",
    "Winner of the Global Education Innovation Award",
    "Recognized by UNESCO for Advancing Digital Learning",
    "4.9/5 average rating from 50,000+ student reviews",
    "Partnership with 500+ educational institutions worldwide"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold font-display text-white">
              About Orchid
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing education through adaptive learning technology, 
              making personalized assessment accessible to learners worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slideInLeft">
              <h2 className="text-3xl lg:text-4xl font-bold font-display">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Orchid, we believe every learner deserves a personalized educational 
                experience that adapts to their unique learning style, pace, and goals. 
                Our mission is to democratize access to high-quality, adaptive assessments 
                that empower students to achieve their full potential.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're building the future of education where technology and pedagogy 
                work together to create meaningful learning experiences that prepare 
                students for success in an ever-evolving world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-hero-primary">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">
                  Read Our Story
                </Button>
              </div>
            </div>
            
            <div className="relative animate-slideInRight">
              <img 
                src={studentsImage} 
                alt="Students learning together" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do at Orchid
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className="learning-card text-center animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a simple idea to a global educational platform
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year} 
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="learning-card animate-fadeInUp" style={{ animationDelay: `${index * 200}ms` }}>
                      <CardContent className="p-6 space-y-2">
                        <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                        <h3 className="text-xl font-semibold">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate educators and technologists behind Orchid
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <img 
                src={teamImage} 
                alt="Orchid team collaboration" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-display">
                Passionate About Education
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our diverse team brings together expertise from education, technology, 
                psychology, and design to create the most effective learning experiences possible.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're united by a shared belief that every student deserves personalized, 
                adaptive learning that meets them where they are and helps them reach their goals.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card 
                key={member.name} 
                className="learning-card text-center animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full mx-auto flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    <p className="text-xs text-muted-foreground font-medium">{member.expertise}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
              Recognition & Achievements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to educational excellence has been recognized globally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground leading-relaxed">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-white">
              Join Our Learning Revolution
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Be part of the future of education. Start your personalized learning journey with Orchid today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero-secondary">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;