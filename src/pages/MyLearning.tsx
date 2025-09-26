import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  PlayCircle, 
  CheckCircle, 
  Star, 
  Trophy,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Download,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

// Demo course data
const demoCourses = [
  {
    id: 1,
    title: "Complete JavaScript Mastery",
    instructor: "John Smith",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop&auto=format",
    progress: 75,
    totalLessons: 45,
    completedLessons: 34,
    duration: "12 hours",
    category: "Programming",
    level: "Intermediate",
    rating: 4.8,
    lastAccessed: "2 days ago",
    certificate: true,
    status: "in-progress"
  },
  {
    id: 2,
    title: "React.js Fundamentals",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b96c?w=40&h=40&fit=crop&crop=face&auto=format",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop&auto=format",
    progress: 100,
    totalLessons: 32,
    completedLessons: 32,
    duration: "8 hours",
    category: "Frontend",
    level: "Beginner",
    rating: 4.9,
    lastAccessed: "1 week ago",
    certificate: true,
    status: "completed"
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    instructor: "Mike Chen",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop&auto=format",
    progress: 25,
    totalLessons: 28,
    completedLessons: 7,
    duration: "15 hours",
    category: "Design",
    level: "Beginner",
    rating: 4.7,
    lastAccessed: "3 days ago",
    certificate: true,
    status: "in-progress"
  },
  {
    id: 4,
    title: "Python Data Science",
    instructor: "Dr. Emily Davis",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop&auto=format",
    progress: 0,
    totalLessons: 52,
    completedLessons: 0,
    duration: "20 hours",
    category: "Data Science",
    level: "Advanced",
    rating: 4.6,
    lastAccessed: "Never",
    certificate: true,
    status: "not-started"
  }
];

const MyLearning = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Filter courses based on active tab and search
  const filteredCourses = demoCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (activeTab) {
      case 'in-progress':
        return course.status === 'in-progress';
      case 'completed':
        return course.status === 'completed';
      case 'not-started':
        return course.status === 'not-started';
      default:
        return true;
    }
  });

  // Calculate stats
  const stats = {
    totalCourses: demoCourses.length,
    inProgress: demoCourses.filter(c => c.status === 'in-progress').length,
    completed: demoCourses.filter(c => c.status === 'completed').length,
    certificates: demoCourses.filter(c => c.status === 'completed' && c.certificate).length,
    totalHours: demoCourses.reduce((acc, course) => acc + parseInt(course.duration), 0)
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
      default:
        return null;
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[level] || 'bg-gray-100 text-gray-800'}>{level}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold font-display">My Learning</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name || 'Student'}!</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stats.totalCourses}</div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <PlayCircle className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{stats.inProgress}</div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{stats.completed}</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">{stats.certificates}</div>
                <p className="text-sm text-muted-foreground">Certificates</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, instructors, or categories..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[120px]">
                <Filter className="h-4 w-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy('recent')}>Recently Accessed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('progress')}>Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('title')}>Title A-Z</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('rating')}>Highest Rated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Course Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="not-started">Not Started</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'Start learning by enrolling in a course'}
                </p>
                <Link to="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          // Fallback to a solid color background with course icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      {/* Fallback content */}
                      <div 
                        className="w-full h-48 bg-gradient-to-br from-primary to-primary/80 rounded-t-lg flex items-center justify-center"
                        style={{ display: 'none' }}
                      >
                        <div className="text-center text-white">
                          <BookOpen className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm font-medium">{course.category}</p>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(course.status)}
                      </div>
                      <div className="absolute top-3 right-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="bg-black/20 hover:bg-black/40 text-white">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download for offline
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {course.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
                          <div className="flex items-center justify-between text-white text-sm mb-1">
                            <span>{course.progress}% complete</span>
                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{course.category}</Badge>
                        {getLevelBadge(course.level)}
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                          <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{course.instructor}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Last accessed {course.lastAccessed}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {course.status === 'completed' ? (
                          <>
                            <Button size="sm" className="flex-1">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                            {course.certificate && (
                              <Button size="sm" variant="outline">
                                <Trophy className="h-4 w-4 mr-2" />
                                Certificate
                              </Button>
                            )}
                          </>
                        ) : course.status === 'in-progress' ? (
                          <Button size="sm" className="flex-1">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Continue
                          </Button>
                        ) : (
                          <Button size="sm" className="flex-1">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Start Course
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default MyLearning;