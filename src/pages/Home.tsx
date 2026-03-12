import { Navbar } from '@/components/Navbar';
import { Gallery } from '@/components/Gallery';
import Team from '@/components/Team';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, Pen, Mail, Phone, MapPin, Star, TrendingUp, CheckCircle, Sparkles, ArrowRight, Globe, Zap, Send, Target, Rocket, Shield, Clock, DollarSign, Package, FileCheck, Palette, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [heroForm, setHeroForm] = useState({
    name: '',
    email: '',
    phone: '',
    bookTitle: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!', {
      description: 'We will get back to you soon.',
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleHeroFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Form submitted successfully!', {
      description: 'Our team will contact you shortly.',
    });
    setHeroForm({ name: '', email: '', phone: '', bookTitle: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-950">
      <Navbar />
      
      {/* Hero Section with Form */}
      <section className="relative pt-28 pb-24 px-4 overflow-hidden">
        {/* Enhanced Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.07] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200)',
          }}
        ></div>
        
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.12),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(99,102,241,0.08),transparent_50%)]"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Publisher Badge */}
              <div className="flex items-center gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 w-fit shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col">
                  <Badge className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-3 py-1 text-xs font-medium w-fit mb-1">
                    <Sparkles className="h-3 w-3 mr-1 inline" />
                    Trusted Publisher
                  </Badge>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Scriptoria Publication House</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Publish Your{' '}
                <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 dark:from-teal-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient">
                  Masterpiece
                </span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  with Confidence
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Transform your groundbreaking research into a published masterpiece. Join hundreds of authors who trust Scriptoria Publication House with their academic and literary work.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-teal-200 dark:border-teal-800 shadow-md hover:shadow-lg transition-all">
                  <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-sm">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">100% Author Rights</span>
                </div>
                <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-blue-200 dark:border-blue-800 shadow-md hover:shadow-lg transition-all">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Global Distribution</span>
                </div>
                <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-indigo-200 dark:border-indigo-800 shadow-md hover:shadow-lg transition-all">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-sm">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Fast Publishing</span>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Form */}
            <Card className="border-2 border-slate-300 dark:border-slate-600 shadow-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-md animate-slide-up hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500/20 to-blue-500/20 blur-3xl"></div>
              <CardHeader className="text-center pb-4 space-y-2 relative z-10">
                <div className="inline-flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400 mb-2">
                  <Rocket className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wide">Get Started</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Start Your Publishing Journey
                </CardTitle>
                <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                  Fill out the form and get a free consultation within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleHeroFormSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="hero-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name *</Label>
                    <Input
                      id="hero-name"
                      value={heroForm.name}
                      onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                      placeholder="Dr. John Doe"
                      className="h-12 border-slate-300 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hero-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address *</Label>
                    <Input
                      id="hero-email"
                      type="email"
                      value={heroForm.email}
                      onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                      placeholder="john.doe@university.edu"
                      className="h-12 border-slate-300 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hero-phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number *</Label>
                    <Input
                      id="hero-phone"
                      type="tel"
                      value={heroForm.phone}
                      onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="h-12 border-slate-300 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hero-book" className="text-sm font-medium text-slate-700 dark:text-slate-300">Research/Book Title</Label>
                    <Input
                      id="hero-book"
                      value={heroForm.bookTitle}
                      onChange={(e) => setHeroForm({ ...heroForm, bookTitle: e.target.value })}
                      placeholder="Advanced Quantum Mechanics"
                      className="h-12 border-slate-300 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 transition-colors"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-700 hover:via-blue-700 hover:to-indigo-700 text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Free Consultation
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                    By submitting, you agree to our Terms & Conditions
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-12 px-4 bg-gradient-to-r from-teal-50/50 via-blue-50/50 to-indigo-50/50 dark:from-teal-950/20 dark:via-blue-950/20 dark:to-indigo-950/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Pen, value: '75+', label: 'Authors', color: 'from-teal-500 to-teal-600' },
              { icon: BookOpen, value: '100+', label: 'Books', color: 'from-blue-500 to-blue-600' },
              { icon: DollarSign, value: '₹15L+', label: 'Royalty Paid', color: 'from-indigo-500 to-indigo-600' },
              { icon: Users, value: '10K+', label: 'Readers', color: 'from-cyan-500 to-cyan-600' },
            ].map((stat, i) => (
              <Card key={i} className="text-center hover:scale-105 transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <CardContent className="pt-8 pb-6">
                  <div className={`mx-auto p-4 bg-gradient-to-br ${stat.color} rounded-2xl w-fit mb-4 shadow-md`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-base font-semibold text-slate-700 dark:text-slate-300">{stat.label}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Empowering research excellence
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Scriptoria Publication House - Your Trusted Publisher
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p className="text-lg md:text-xl">
              Have you ever dreamed of having your name on the cover of a publication? Imagine holding your own published book, sharing your knowledge with the world, and inspiring future generations. At <strong className="text-teal-600 dark:text-teal-400">Scriptoria Publication House</strong>, we make that dream a reality!
            </p>

            <p className="text-lg">
              Whether you're an aspiring author with groundbreaking ideas to share or a seasoned writer looking for the perfect publishing partner, we provide a smooth, transparent, and rewarding publishing experience. From professional editing and stunning book design to global distribution and marketing, we handle everything—so you can focus on what truly matters: your work, your creativity, your legacy.
            </p>

            <Card className="border-2 border-teal-100 dark:border-teal-900 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 my-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  <Rocket className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  Self Publication Platform - Empowering Authors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base text-slate-700 dark:text-slate-300">
                  Looking to take control of your publishing journey? As a <strong>self publication platform</strong>, we help authors publish their work independently while keeping <strong className="text-teal-600 dark:text-teal-400">100% ownership and royalties</strong>. Our online publication platform makes it easy to track progress, monitor sales, and manage royalties in real time.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {[
                    'Retain full creative control over your work',
                    'Set your own pricing and distribution strategy',
                    'Publish both in print and digital formats',
                    'Access real-time analytics and sales metrics'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-teal-600 dark:text-teal-400 mt-1 shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                <p className="text-base pt-4 text-slate-700 dark:text-slate-300">
                  For those who want complete flexibility in <strong>publishing their books</strong>, our platform ensures that your work is edited, formatted, distributed, and marketed effectively to reach readers worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="outline" className="px-4 py-2 mb-4 border-2 border-teal-500">
              <Package className="h-4 w-4 mr-2 inline text-teal-600" />
              Our Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Comprehensive <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Publishing Services</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From manuscript to market, we provide everything you need to successfully publish and distribute your work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Pen,
                title: 'Professional Editing & Proofreading',
                description: 'Expert editors polish your manuscript for grammar, style, structure, and academic standards. We ensure your ideas shine with clarity and precision.',
                features: ['Line editing', 'Copy editing', 'Proofreading', 'Formatting'],
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-50 dark:bg-blue-950/30'
              },
              {
                icon: Palette,
                title: 'Cover Design & Layout',
                description: 'Eye-catching, professional cover designs that reflect your work\'s essence. Our designers create covers that stand out in any marketplace.',
                features: ['Custom cover design', 'Interior layout', 'Typography', 'Brand identity'],
                color: 'from-purple-500 to-pink-500',
                bgColor: 'bg-purple-50 dark:bg-purple-950/30'
              },
              {
                icon: FileCheck,
                title: 'Peer Review & Quality Assurance',
                description: 'Rigorous peer review process by subject matter experts. We ensure academic integrity and publishing excellence.',
                features: ['Expert review', 'Plagiarism check', 'Citation verification', 'Quality control'],
                color: 'from-emerald-500 to-teal-500',
                bgColor: 'bg-emerald-50 dark:bg-emerald-950/30'
              },
              {
                icon: Globe,
                title: 'ISBN & Global Distribution',
                description: 'Get your ISBN and distribute worldwide through major retailers like Amazon, Google Books, and academic databases.',
                features: ['ISBN registration', 'Global distribution', 'Online presence', 'Database indexing'],
                color: 'from-orange-500 to-red-500',
                bgColor: 'bg-orange-50 dark:bg-orange-950/30'
              },
              {
                icon: TrendingUp,
                title: 'Marketing & Promotion',
                description: 'Strategic marketing campaigns to maximize your book\'s reach. We help you connect with your target audience effectively.',
                features: ['Social media marketing', 'Email campaigns', 'Press releases', 'Author branding'],
                color: 'from-indigo-500 to-blue-500',
                bgColor: 'bg-indigo-50 dark:bg-indigo-950/30'
              },
              {
                icon: Package,
                title: 'Print & Digital Publishing',
                description: 'Publish in both print and digital formats. We handle printing, e-book conversion, and distribution across all major platforms.',
                features: ['Print-on-demand', 'E-book formats', 'Hardcover & paperback', 'Multi-platform'],
                color: 'from-rose-500 to-pink-500',
                bgColor: 'bg-rose-50 dark:bg-rose-950/30'
              },
            ].map((service, i) => (
              <Card 
                key={i} 
                className={`group hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-600 hover:-translate-y-2 ${service.bgColor} overflow-hidden relative`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" style={{
                  background: `linear-gradient(to bottom right, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})`
                }}></div>
                
                <CardHeader className="relative z-10">
                  <div className={`inline-block p-4 bg-gradient-to-br ${service.color} rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 border-2 border-teal-200 dark:border-teal-800 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                  Need a Custom Package?
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  We offer flexible, customized publishing packages tailored to your specific needs and budget. 
                  Let's discuss how we can help bring your book to life!
                </p>
                <Button 
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-700 hover:via-blue-700 hover:to-indigo-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Image Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800" 
                alt="Scientific Research Publishing"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">
                Publish Your Research with <span className="text-primary">Confidence</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join a community of over 500 researchers and authors who have successfully published their work through our platform. We provide end-to-end support from manuscript submission to global distribution.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Target, text: 'Targeted audience reach in your field' },
                  { icon: Shield, text: 'Rigorous peer review process' },
                  { icon: Globe, text: 'International indexing and recognition' },
                  { icon: TrendingUp, text: 'Maximize your research impact' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-base font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                Start Publishing Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How We Make Publishing Easy - 5 Steps */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="outline" className="px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 mr-2 inline text-primary" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How We Make Publishing <span className="text-primary">Easy</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From manuscript to publication in just 5 simple steps
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-accent transform -translate-x-1/2"></div>

            <div className="space-y-12">
              {[
                {
                  step: '01',
                  icon: Upload,
                  title: 'Submit Your Manuscript',
                  description: 'Upload your research paper through our secure platform. We accept all major file formats including PDF, DOC, and LaTeX.',
                  color: 'from-blue-500 to-cyan-500',
                  side: 'left'
                },
                {
                  step: '02',
                  icon: Package,
                  title: 'Select Your Package',
                  description: 'Choose from our flexible publishing packages tailored to your needs—from basic peer review to premium services with extensive marketing.',
                  color: 'from-purple-500 to-pink-500',
                  side: 'right'
                },
                {
                  step: '03',
                  icon: Palette,
                  title: 'Professional Formatting',
                  description: 'Our expert team formats your manuscript to international standards, creates professional layouts, and ensures compliance with academic guidelines.',
                  color: 'from-green-500 to-emerald-500',
                  side: 'left'
                },
                {
                  step: '04',
                  icon: FileCheck,
                  title: 'Review & Approval',
                  description: 'Rigorous peer review by subject matter experts. You receive detailed feedback and retain full control over final approval before publication.',
                  color: 'from-orange-500 to-red-500',
                  side: 'right'
                },
                {
                  step: '05',
                  icon: Rocket,
                  title: 'Global Distribution',
                  description: 'Your research goes live on major academic databases, indexing services, and our global distribution network. Track citations and impact in real-time.',
                  color: 'from-indigo-500 to-purple-500',
                  side: 'left'
                }
              ].map((item, i) => (
                <div key={i} className={`relative grid md:grid-cols-2 gap-8 items-center ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  {/* Left Side Card */}
                  <div className={`${item.side === 'left' ? 'md:text-right' : 'md:order-2'}`}>
                    <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 bg-white dark:bg-gray-800">
                      <CardHeader>
                        <div className={`flex items-center gap-4 ${item.side === 'left' ? 'md:flex-row-reverse' : ''}`}>
                          <div className={`p-4 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg group-hover:shadow-xl transition-all group-hover:rotate-6`}>
                            <item.icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-muted-foreground mb-1">STEP {item.step}</div>
                            <CardTitle className="text-2xl">{item.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Circle (Desktop Only) */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-4 border-primary rounded-full items-center justify-center shadow-xl z-10">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>

                  {/* Right Side (Empty for alternating layout) */}
                  <div className={`${item.side === 'right' ? 'md:text-right' : 'md:order-1'} hidden md:block`}></div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-primary via-purple-600 to-accent hover:opacity-90 text-lg px-8 py-6"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="outline" className="px-4 py-2 mb-4">
              <Award className="h-4 w-4 mr-2 inline text-accent" />
              Our Advantages
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Why Choose <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Scriptoria Publication House</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We combine cutting-edge technology with personalized support to accelerate your publishing success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: '100% Author Royalties',
                description: 'Keep all your earnings. No hidden fees, no revenue sharing. You retain complete financial control over your work.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Shield,
                title: 'Full Copyright Protection',
                description: 'Maintain 100% ownership and intellectual property rights. Your research, your rules, always.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Globe,
                title: 'Global Distribution',
                description: 'Reach readers worldwide through major bookstores, libraries, and online platforms.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Clock,
                title: 'Fast Publication',
                description: 'Publish in weeks, not years. Our streamlined process gets your book out quickly without compromising quality.',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: Target,
                title: 'Expert Editing',
                description: 'Professional editing and review ensures your work meets the highest publishing standards.',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: TrendingUp,
                title: 'Sales Tracking',
                description: 'Real-time analytics dashboard to monitor sales, downloads, and the global reach of your book.',
                color: 'from-pink-500 to-rose-500'
              }
            ].map((item, i) => (
              <Card key={i} className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 hover:border-primary/50 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardHeader>
                  <div className={`p-4 bg-gradient-to-br ${item.color} rounded-2xl w-fit mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:rotate-6`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-3">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="outline" className="px-4 py-2 mb-4">
              <Users className="h-4 w-4 mr-2 inline text-primary" />
              Meet Our Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Expert Team Behind Your Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our dedicated professionals bring decades of combined experience in academic publishing
            </p>
          </div>

          <Team />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="outline" className="px-4 py-2 mb-4">
              <ImageIcon className="h-4 w-4 mr-2 inline text-accent" />
              Our Gallery
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Moments & Milestones
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our visual journey of successful publications, events, and author celebrations
            </p>
          </div>

          <Gallery />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="outline" className="px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 mr-2 inline text-accent" />
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about publishing with us
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: 'How long does the publication process take?',
                answer: 'Our streamlined process typically takes 4-8 weeks from manuscript submission to publication. This includes peer review, formatting, and final approval. Rush services are available for urgent publications.'
              },
              {
                question: 'Do I retain copyright of my research?',
                answer: 'Absolutely! You retain 100% copyright and intellectual property rights. We believe researchers should maintain full ownership of their work. You can republish, share, or license your work as you see fit.'
              },
              {
                question: 'What publishing packages do you offer?',
                answer: 'We offer three main packages: Basic (peer review + publication), Professional (includes formatting and basic marketing), and Premium (comprehensive services with extensive promotion, indexing, and dedicated support).'
              },
              {
                question: 'How do royalties work?',
                answer: 'You keep 100% of all royalties from your publication sales. We provide a real-time dashboard where you can track sales, citations, and earnings. Payments are processed monthly with no minimum threshold.'
              },
              {
                question: 'Is my research indexed in major databases?',
                answer: 'Yes! We ensure your publication is indexed in major academic databases including Google Scholar, ResearchGate, Academia.edu, and discipline-specific repositories. Premium packages include additional indexing services.'
              },
              {
                question: 'What file formats do you accept?',
                answer: 'We accept manuscripts in PDF, DOC, DOCX, LaTeX, and most standard document formats. Our team will work with you to ensure proper formatting regardless of your original file type.'
              },
              {
                question: 'Can I track the impact of my publication?',
                answer: 'Yes! Our platform provides comprehensive analytics including citation tracking, download statistics, geographic reach, and reader engagement metrics. You can monitor your research impact in real-time.'
              },
              {
                question: 'What support do you provide to authors?',
                answer: 'Every author gets dedicated support throughout the publication process. This includes editorial guidance, formatting assistance, peer review coordination, and post-publication marketing support.'
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-2 rounded-lg px-6 bg-white dark:bg-gray-800 hover:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to share your work with the world?
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-700 hover:via-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Publish Your Book
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              For general enquiries, please use our contact form or reach out via email
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-16 px-4 border-t-4 border-teal-500">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <p className="text-xl font-bold bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Scriptoria Press
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                Empowering authors worldwide to share their stories and knowledge through professional publication services.
              </p>
              <div className="flex gap-3 pt-2">
                {[
                  { icon: Mail, href: 'mailto:info@scientisticera.com', label: 'Email' },
                  { icon: Phone, href: 'tel:+919876543210', label: 'Phone' },
                  { icon: Globe, href: 'https://scientisticera.com', label: 'Website' }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    className="p-2.5 bg-white/10 rounded-lg hover:bg-gradient-to-br hover:from-teal-500 hover:to-blue-500 transition-all duration-300 hover:scale-110 shadow-md"
                    title={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-teal-400">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Our Services', 'Pricing', 'Success Stories', 'Blog'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Our Services</h3>
              <ul className="space-y-3">
                {['Professional Editing', 'Cover Design', 'Peer Review', 'Global Distribution', 'Marketing & Promotion', 'ISBN Registration'].map((service, i) => (
                  <li key={i}>
                    <a href="#services" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-indigo-400">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">
                    Bahadurgarh, Haryana 124507, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <a href="mailto:contact@scientisticera.com" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    contact@scientisticera.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <a href="tel:+917068507857" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    +91 7068507857
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-2">
                <p className="text-gray-400 text-sm text-center md:text-left">
                  © 2025 Scriptoria Publication House. All rights reserved. Built with passion for empowering authors.
                </p>
                <p className="text-gray-500 text-xs text-center md:text-left">
                  This site is powered by SCIENTISTICERA PRIVATE LIMTED
                </p>
              </div>
              <div className="flex gap-6">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, i) => (
                  <a key={i} href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
