import React from 'react';
import { BookOpen, Trophy, Clock, Star, TrendingUp, ChevronRight, BarChart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext'; // 💡 Use useAuth for user name
import { Link } from 'react-router-dom';

// Demo Data (Replace with actual data fetching logic)
const DEMO_DASHBOARD_DATA = {
    totalCourses: 5,
    inProgress: 2,
    completed: 3,
    totalHours: 45.5,
    lastTestScore: 88,
    studyStreak: 12,
    currentCourse: {
        id: 2,
        title: 'Python Programming Fundamentals',
        progress: 65,
        level: 'Intermediate',
        nextTopic: 'Conditional Logic & Loops',
        rating: 4.9
    }
};

const Dashboard = () => {
    // 💡 Get user details
    const { user } = useAuth();
    const userName = user?.name.split(' ')[0] || 'Learner';

    return (
        <Layout showFooter={false}>
            <div className="bg-muted/30 min-h-screen py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-display">Welcome back, {userName}!</h1>
                        <p className="text-muted-foreground">Your learning journey continues here.</p>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid lg:grid-cols-4 gap-6 mb-8">
                        <Card className="learning-card">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                                        <p className="text-2xl font-bold">{DEMO_DASHBOARD_DATA.totalCourses}</p>
                                    </div>
                                    <BookOpen className="h-8 w-8 text-primary/80" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="learning-card">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Hours Studied</p>
                                        <p className="text-2xl font-bold">{DEMO_DASHBOARD_DATA.totalHours}h</p>
                                    </div>
                                    <Clock className="h-8 w-8 text-indigo-500/80" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="learning-card">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Latest Score</p>
                                        <p className="text-2xl font-bold text-green-600">{DEMO_DASHBOARD_DATA.lastTestScore}%</p>
                                    </div>
                                    <Trophy className="h-8 w-8 text-green-500/80" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="learning-card">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Study Streak</p>
                                        <p className="text-2xl font-bold">{DEMO_DASHBOARD_DATA.studyStreak} days</p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-yellow-500/80" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Column 1: Continue Learning */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="learning-card">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Continue Learning
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-col md:flex-row items-start md:items-center p-4 bg-primary-foreground/5 rounded-lg border">
                                        <div className="flex-1 space-y-2">
                                            <Badge variant="outline" className="text-xs">
                                                {DEMO_DASHBOARD_DATA.currentCourse.level}
                                            </Badge>
                                            <h3 className="text-lg font-bold">{DEMO_DASHBOARD_DATA.currentCourse.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Next up: {DEMO_DASHBOARD_DATA.currentCourse.nextTopic}
                                            </p>
                                            <div className="flex items-center space-x-2">
                                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                <span className="text-sm font-medium">{DEMO_DASHBOARD_DATA.currentCourse.rating} Rating</span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-64 mt-4 md:mt-0 md:ml-6">
                                            <div className="flex justify-between mb-1 text-sm font-medium">
                                                <span>Progress</span>
                                                <span>{DEMO_DASHBOARD_DATA.currentCourse.progress}%</span>
                                            </div>
                                            <Progress value={DEMO_DASHBOARD_DATA.currentCourse.progress} className="h-2" />
                                            <Button asChild className="w-full mt-4 btn-hero-primary">
                                                <Link to="/my-learning">Resume Course <ChevronRight className="w-4 h-4 ml-2" /></Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            {/* Course Progress Overview */}
                            <Card className="learning-card">
                                <CardHeader>
                                    <CardTitle className="text-xl">My Course Progress</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        { subject: "Advanced Mathematics", progress: 78, link: "/my-learning" },
                                        { subject: "Python Programming", progress: 65, link: "/my-learning" },
                                        { subject: "Chemistry Lab Simulation", progress: 42, link: "/my-learning" }
                                    ].map((item, index) => (
                                        <Link to={item.link} key={index} className="flex items-center hover:bg-muted/50 p-3 rounded-lg transition-colors">
                                            <BarChart className="h-5 w-5 mr-3 text-primary" />
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between">
                                                    <span className="font-medium">{item.subject}</span>
                                                    <span className="text-sm text-muted-foreground">{item.progress}%</span>
                                                </div>
                                                <Progress value={item.progress} className="h-2" />
                                            </div>
                                            <ChevronRight className="h-4 w-4 ml-4 text-muted-foreground" />
                                        </Link>
                                    ))}
                                    <Button asChild variant="outline" className="w-full mt-4">
                                        <Link to="/my-learning">View All Progress</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Column 2: Quick Links & Recommendations */}
                        <div className="lg:col-span-1 space-y-8">
                             <Card className="learning-card">
                                <CardHeader>
                                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button asChild className="w-full justify-start" variant="secondary">
                                        <Link to="/my-learning"><BookOpen className="w-4 h-4 mr-2" /> Go to My Learning</Link>
                                    </Button>
                                    <Button asChild className="w-full justify-start" variant="secondary">
                                        <Link to="/courses"><Users className="w-4 h-4 mr-2" /> Find New Courses</Link>
                                    </Button>
                                    <Button asChild className="w-full justify-start" variant="secondary">
                                        <Link to="/contact"><Clock className="w-4 h-4 mr-2" /> View Certifications</Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="learning-card">
                                <CardHeader>
                                    <CardTitle className="text-xl">Recommended for You</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        { title: "Business Strategy Analysis", price: "$49" },
                                        { title: "UI/UX Design Principles", price: "$39" },
                                    ].map((rec, index) => (
                                        <div key={index} className="flex justify-between items-center pb-2 border-b last:border-b-0">
                                            <p className="font-medium text-sm">{rec.title}</p>
                                            <Badge>{rec.price}</Badge>
                                        </div>
                                    ))}
                                    <Button asChild variant="ghost" className="w-full text-primary">
                                        <Link to="/courses">See all recommendations</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;