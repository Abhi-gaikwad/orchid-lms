import React, { useState } from 'react';
import { Search, Filter, Clock, Users, Star, Award, BookOpen, Brain, Calculator, Globe, Code, Beaker, Palette, TrendingUp, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Assuming you have a Layout component
import Layout from '@/components/Layout';
// Assuming you have a useToast hook from shadcn/ui
import { useToast } from '@/components/ui/use-toast'; 

// 💡 NEW: Import useCart and types from the Cart file
import { useCart } from './Cart'; 

// Define the Course interface locally for use in this file
interface Course {
  id: number;
  title: string;
  category?: string;
  level: string;
  duration: string;
  questions: number;
  participants: number;
  rating: number;
  price: string;
  tags?: string[];
  description?: string;
  thumbnail?: string;
}

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  // 💡 NEW: Get the addToCart function
  const { addToCart, setIsCartOpen, cartItems } = useCart(); 
  const { toast } = useToast(); // Assuming useToast is available

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen },
    { id: 'mathematics', name: 'Mathematics', icon: Calculator },
    { id: 'science', name: 'Science', icon: Beaker },
    { id: 'programming', name: 'Programming', icon: Code },
    { id: 'language', name: 'Languages', icon: Globe },
    { id: 'aptitude', name: 'Aptitude', icon: Brain },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'business', name: 'Business', icon: TrendingUp }
  ];

  // Note: I've updated the type assertion for the exams array to 'Course[]' 
  // to ensure type safety with the 'addToCart' function.
  const exams: Course[] = [
    {
      id: 1,
      title: 'Advanced Mathematics Assessment',
      category: 'mathematics',
      level: 'Advanced',
      duration: '90 minutes',
      questions: 50,
      participants: 1250,
      rating: 4.8,
      price: 'Free',
      tags: ['Calculus', 'Algebra', 'Geometry'],
      description: 'Comprehensive mathematics test covering calculus, algebra, and advanced geometric concepts.'
    },
    {
      id: 2,
      title: 'Python Programming Fundamentals',
      category: 'programming',
      level: 'Beginner',
      duration: '60 minutes',
      questions: 40,
      participants: 2100,
      rating: 4.9,
      price: '$29',
      tags: ['Python', 'Programming', 'Basics'],
      description: 'Learn and test your knowledge of Python programming basics and core concepts.'
    },
    {
      id: 3,
      title: 'Logical Reasoning & Aptitude',
      category: 'aptitude',
      level: 'Intermediate',
      duration: '75 minutes',
      questions: 60,
      participants: 3400,
      rating: 4.7,
      price: 'Free',
      tags: ['Logic', 'Reasoning', 'Problem Solving'],
      description: 'Enhance your logical reasoning skills with comprehensive aptitude questions.'
    },
    {
      id: 4,
      title: 'Chemistry Lab Simulation',
      category: 'science',
      level: 'Intermediate',
      duration: '45 minutes',
      questions: 35,
      participants: 890,
      rating: 4.6,
      price: '$19',
      tags: ['Chemistry', 'Lab', 'Experiments'],
      description: 'Virtual chemistry lab experience with interactive experiments and assessments.'
    },
    {
      id: 5,
      title: 'Business Strategy Analysis',
      category: 'business',
      level: 'Advanced',
      duration: '120 minutes',
      questions: 45,
      participants: 670,
      rating: 4.8,
      price: '$49',
      tags: ['Strategy', 'Analysis', 'MBA'],
      description: 'Advanced business strategy concepts and real-world case study analysis.'
    },
    {
      id: 6,
      title: 'English Language Proficiency',
      category: 'language',
      level: 'Intermediate',
      duration: '90 minutes',
      questions: 80,
      participants: 1800,
      rating: 4.5,
      price: 'Free',
      tags: ['English', 'Grammar', 'Vocabulary'],
      description: 'Comprehensive English language assessment covering grammar, vocabulary, and comprehension.'
    },
    {
      id: 7,
      title: 'UI/UX Design Principles',
      category: 'design',
      level: 'Beginner',
      duration: '60 minutes',
      questions: 30,
      participants: 1200,
      rating: 4.7,
      price: '$39',
      tags: ['UI', 'UX', 'Design'],
      description: 'Learn fundamental design principles and best practices for user experience.'
    },
    {
      id: 8,
      title: 'Data Structures & Algorithms',
      category: 'programming',
      level: 'Advanced',
      duration: '150 minutes',
      questions: 65,
      participants: 950,
      rating: 4.9,
      price: '$59',
      tags: ['DSA', 'Algorithms', 'Programming'],
      description: 'Master data structures and algorithms with challenging programming problems.'
    }
  ];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || exam.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // 💡 NEW: Handle adding to cart and showing a toast notification
  const handleAddToCart = (course: Course) => {
    const isAlreadyInCart = cartItems.some(item => item.id === course.id);

    if (isAlreadyInCart) {
      toast({
        title: "Already in Cart",
        description: `${course.title} is already in your shopping cart.`,
        variant: "default",
      });
      setIsCartOpen(true);
      return;
    }

    addToCart(course);
    toast({
      title: "Added to Cart!",
      description: `${course.title} has been added to your cart.`,
      action: (
        <Button 
          variant="secondary" 
          onClick={() => setIsCartOpen(true)}
          className="whitespace-nowrap"
        >
          View Cart
        </Button>
      ),
    });
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold font-display text-white">
              Explore Our Course Library
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover comprehensive assessments and courses designed to enhance your skills 
              and knowledge across various subjects.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, topics, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-lg z-50">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="hover:bg-accent">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-lg z-50">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-display mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.slice(1).map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`learning-card p-4 text-center space-y-2 transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-accent'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium">{category.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-display">
              Available Courses ({filteredExams.length})
            </h2>
            <Select defaultValue="popular">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg z-50">
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExams.map((exam, index) => {
                const isInCart = cartItems.some(item => item.id === exam.id);

                return (
                    <Card 
                      key={exam.id} 
                      className="learning-card group animate-fadeInUp"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="space-y-4">
                        <div className="flex justify-between items-start">
                          <Badge className={getLevelColor(exam.level)}>
                            {exam.level}
                          </Badge>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              {exam.price}
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {exam.title}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {exam.description}
                        </p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{exam.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>{exam.questions} questions</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{exam.participants.toLocaleString()} enrolled</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-secondary fill-current" />
                            <span>{exam.rating}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {exam.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                            {/* 💡 MODIFIED: Use Add to Cart button logic */}
                            <Button 
                                className="flex-1"
                                onClick={() => handleAddToCart(exam)}
                                disabled={isInCart}
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                {isInCart ? 'In Cart' : (exam.price === 'Free' ? 'Enroll Now' : 'Add to Cart')}
                            </Button>
                            <Button variant="outline" size="sm">
                                Preview
                            </Button>
                        </div>
                      </CardContent>
                    </Card>
                )
            })}
          </div>

          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or browse all categories.
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Courses;