import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { User, BookOpen, Upload, FileText, Loader2, Eye, MessageSquare, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface BookSubmission {
  _id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  status: 'under_review' | 'approved' | 'published' | 'rejected';
  createdAt: string;
  adminComments?: string;
}

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  currentPassword?: string;
  newPassword?: string;
}

const UserDashboard = () => {
  const { user } = useAuth();
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissions, setSubmissions] = useState<BookSubmission[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    underReview: 0,
    approved: 0,
    published: 0,
    rejected: 0,
  });
  
  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: user?.email || '',
    mobile: '',
  });

  // Book submission form state
  const [bookForm, setBookForm] = useState({
    title: '',
    description: '',
    file: null as File | null,
  });

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchSubmissions();
      fetchStats();
    }
  }, [user]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch profile');

      const data = await response.json();
      if (data.success) {
        setProfile({
          name: data.data.name || '',
          email: data.data.email || '',
          mobile: data.data.mobile || '',
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${API_URL}/books/my-submissions`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Failed to fetch submissions');

      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data);
      }
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/books/stats`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Failed to fetch stats');

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error: any) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const updateData: any = {
        name: profile.name,
        mobile: profile.mobile,
      };

      // Only include password if user wants to update it
      if (profile.currentPassword && profile.newPassword) {
        updateData.currentPassword = profile.currentPassword;
        updateData.newPassword = profile.newPassword;
      }

      const response = await fetch(`${API_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      toast.success('Profile updated successfully!');
      
      // Clear password fields
      setProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
      }));
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload PDF, DOC, or DOCX files only');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }
      
      setBookForm({ ...bookForm, file });
    }
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookForm.title || !bookForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!bookForm.file) {
      toast.error('Please upload a document');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', bookForm.title);
      formData.append('description', bookForm.description);
      formData.append('manuscript', bookForm.file);

      const response = await fetch(`${API_URL}/books/submit`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit book');
      }

      toast.success('Your book is under review. You can track it from Track Status section!', {
        description: 'We will notify you once the review is complete.',
      });

      setIsPublishDialogOpen(false);
      setBookForm({ title: '', description: '', file: null });
      
      // Refresh submissions and stats
      fetchSubmissions();
      fetchStats();
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit book');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      under_review: { label: 'Under Review', variant: 'default' as const, icon: Clock, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
      approved: { label: 'Approved', variant: 'default' as const, icon: CheckCircle, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      published: { label: 'Published', variant: 'default' as const, icon: BookOpen, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      rejected: { label: 'Rejected', variant: 'destructive' as const, icon: XCircle, color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
    };

    const badge = badges[status as keyof typeof badges] || badges.under_review;
    const Icon = badge.icon;

    return (
      <Badge className={`${badge.color} border-0`}>
        <Icon className="h-3 w-3 mr-1" />
        {badge.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your profile, submissions, and track your publishing journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: FileText, color: 'from-slate-500 to-slate-600' },
            { label: 'Under Review', value: stats.underReview, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
            { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'from-green-500 to-green-600' },
            { label: 'Published', value: stats.published, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
            { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'from-red-500 to-red-600' },
          ].map((stat, i) => (
            <Card key={i} className="border-2 border-slate-200 dark:border-slate-700">
              <CardContent className="pt-6 pb-4">
                <div className={`mx-auto p-3 bg-gradient-to-br ${stat.color} rounded-xl w-fit mb-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-center mb-1">{stat.value}</div>
                <div className="text-xs text-center text-slate-600 dark:text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="publish" className="gap-2">
              <Upload className="h-4 w-4" />
              Publish Book
            </TabsTrigger>
            <TabsTrigger value="track" className="gap-2">
              <FileText className="h-4 w-4" />
              Track Status
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-teal-600" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder="John Doe"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled
                        className="h-11 bg-slate-100 dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={profile.mobile}
                      onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="h-11"
                    />
                  </div>

                  <div className="border-t pt-5 mt-5">
                    <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-sm font-medium">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={profile.currentPassword || ''}
                          onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                          placeholder="Enter current password"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={profile.newPassword || ''}
                          onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                          placeholder="Enter new password"
                          className="h-11"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Leave password fields empty if you don't want to change your password
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-700 hover:via-blue-700 hover:to-indigo-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Profile'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publish Book Tab */}
          <TabsContent value="publish">
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-teal-600" />
                  Publish Your Book
                </CardTitle>
                <CardDescription>Submit your manuscript for review and publication</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full md:w-auto bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-700 hover:via-blue-700 hover:to-indigo-700 h-12">
                      <Upload className="mr-2 h-5 w-5" />
                      Publish My Book
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Submit Your Manuscript</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to submit your book for review
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleBookSubmit} className="space-y-5 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">Book Title *</Label>
                        <Input
                          id="title"
                          value={bookForm.title}
                          onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                          placeholder="Enter your book title"
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                        <Textarea
                          id="description"
                          value={bookForm.description}
                          onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                          placeholder="Provide a brief description of your book (max 2000 characters)"
                          required
                          rows={5}
                          maxLength={2000}
                          className="resize-none"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {bookForm.description.length}/2000 characters
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="file" className="text-sm font-medium">Upload Manuscript *</Label>
                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                          <Input
                            id="file"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <Label
                            htmlFor="file"
                            className="cursor-pointer flex flex-col items-center gap-2"
                          >
                            <Upload className="h-10 w-10 text-slate-400" />
                            <span className="text-sm font-medium">
                              {bookForm.file ? bookForm.file.name : 'Click to upload or drag and drop'}
                            </span>
                            <span className="text-xs text-slate-500">PDF, DOC, DOCX (Max 10MB)</span>
                          </Label>
                        </div>
                      </div>

                      <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg">
                        <div className="flex gap-3">
                          <AlertCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                          <div className="text-sm text-slate-700 dark:text-slate-300">
                            <p className="font-semibold mb-1">What happens next?</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              <li>Your submission will be reviewed by our team</li>
                              <li>You'll receive updates via email and dashboard</li>
                              <li>Track your submission status in the "Track Status" tab</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsPublishDialogOpen(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-700 hover:via-blue-700 hover:to-indigo-700"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Publish My Book
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-600" />
                    Submission Guidelines
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Ensure your manuscript is properly formatted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Accepted formats: PDF, DOC, DOCX (Maximum 10MB)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Provide a clear and concise description</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Review typically takes 3-7 business days</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Track Status Tab */}
          <TabsContent value="track">
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-600" />
                  Track Your Submissions
                </CardTitle>
                <CardDescription>Monitor the status of all your book submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {submissions.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Get started by publishing your first book!
                    </p>
                    <Button
                      onClick={() => setIsPublishDialogOpen(true)}
                      className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-700 hover:via-blue-700 hover:to-indigo-700"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Publish Your Book
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Book Title</TableHead>
                          <TableHead>Date Submitted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Admin Comments</TableHead>
                          <TableHead>File</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map((submission) => (
                          <TableRow key={submission._id}>
                            <TableCell className="font-medium">
                              <div>
                                <div className="font-semibold">{submission.title}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                                  {submission.description}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatDate(submission.createdAt)}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(submission.status)}
                            </TableCell>
                            <TableCell>
                              {submission.adminComments ? (
                                <div className="max-w-xs">
                                  <div className="flex items-start gap-2">
                                    <MessageSquare className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                      {submission.adminComments}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-sm text-slate-400">No comments yet</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <a
                                href={`http://localhost:5000${submission.fileUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>

    setIsLoading(true);
    setFileUploadProgress(0);

    try {
      // Upload file to Supabase Storage
      const fileExt = bookForm.file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('book-manuscripts')
        .upload(fileName, bookForm.file, {
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setFileUploadProgress(percent);
          },
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('book-manuscripts')
        .getPublicUrl(fileName);

      // Save submission to database
      const { error: dbError } = await supabase
        .from('book_submissions')
        .insert({
          user_id: user?.id,
          title: bookForm.title,
          description: bookForm.description,
          file_url: publicUrl,
          status: 'under_review',
        });

      if (dbError) throw dbError;

      toast.success('Book submitted successfully!', {
        description: 'Your book is under review. You can track its status.',
      });
      
      setBookForm({ title: '', description: '', file: null });
      setIsPublishDialogOpen(false);
      fetchSubmissions();
    } catch (error: any) {
      toast.error('Failed to submit book: ' + error.message);
    } finally {
      setIsLoading(false);
      setFileUploadProgress(0);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('book_submissions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch submissions: ' + error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under_review':
        return 'bg-yellow-500';
      case 'approved':
        return 'bg-green-500';
      case 'published':
        return 'bg-blue-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Fetch submissions on mount
  useState(() => {
    if (user) {
      fetchSubmissions();
      // Fetch user profile
      supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setProfile({
              ...profile,
              name: data.name || '',
              mobile: data.mobile || '',
            });
          }
        });
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Author Dashboard
          </h1>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="publish" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Publish Book
              </TabsTrigger>
              <TabsTrigger value="track" className="gap-2">
                <Eye className="h-4 w-4" />
                Track Status
              </TabsTrigger>
            </TabsList>

            {/* Profile Section */}
            <TabsContent value="profile">
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    My Profile
                  </CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="h-11"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          disabled
                          className="h-11 bg-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input
                          id="mobile"
                          type="tel"
                          value={profile.mobile}
                          onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                          className="h-11"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Change Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={profile.password}
                          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                          placeholder="Leave blank to keep current"
                          className="h-11"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Publish Book Section */}
            <TabsContent value="publish">
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    Publish Your Book
                  </CardTitle>
                  <CardDescription>Submit your manuscript for review and publishing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6">
                        <Upload className="mr-2 h-5 w-5" />
                        Submit New Book
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Submit Your Manuscript</DialogTitle>
                        <DialogDescription>
                          Fill in the details below and upload your manuscript document
                        </DialogDescription>
                      </DialogHeader>
                      
                      <form onSubmit={handleBookSubmit} className="space-y-6 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="book-title">Book Title *</Label>
                          <Input
                            id="book-title"
                            value={bookForm.title}
                            onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                            placeholder="Enter your book title"
                            className="h-11"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="book-description">Description *</Label>
                          <Textarea
                            id="book-description"
                            value={bookForm.description}
                            onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                            placeholder="Brief description of your book (synopsis, genre, target audience)"
                            rows={6}
                            className="resize-none"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="book-file">Upload Manuscript *</Label>
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center hover:border-primary transition-colors">
                            <Input
                              id="book-file"
                              type="file"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              required
                            />
                            <Label htmlFor="book-file" className="cursor-pointer">
                              <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm font-medium mb-1">
                                {bookForm.file ? bookForm.file.name : 'Click to upload or drag and drop'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF, DOC, or DOCX (MAX. 10MB)
                              </p>
                            </Label>
                          </div>
                          
                          {fileUploadProgress > 0 && fileUploadProgress < 100 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                              <div 
                                className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all"
                                style={{ width: `${fileUploadProgress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 h-11"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Upload className="mr-2 h-4 w-4" />
                                Publish My Book
                              </>
                            )}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setIsPublishDialogOpen(false)}
                            disabled={isLoading}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="mt-8 grid md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900">
                      <CardContent className="pt-6">
                        <p className="text-3xl font-bold text-primary mb-1">{submissions.length}</p>
                        <p className="text-sm text-muted-foreground">Total Submissions</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-gray-900">
                      <CardContent className="pt-6">
                        <p className="text-3xl font-bold text-green-600 mb-1">
                          {submissions.filter(s => s.status === 'published').length}
                        </p>
                        <p className="text-sm text-muted-foreground">Published Books</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950/20 dark:to-gray-900">
                      <CardContent className="pt-6">
                        <p className="text-3xl font-bold text-yellow-600 mb-1">
                          {submissions.filter(s => s.status === 'under_review').length}
                        </p>
                        <p className="text-sm text-muted-foreground">Under Review</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Track Status Section */}
            <TabsContent value="track">
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Eye className="h-6 w-6 text-primary" />
                    Track Your Submissions
                  </CardTitle>
                  <CardDescription>Monitor the status of your book submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {submissions.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg text-muted-foreground mb-2">No submissions yet</p>
                      <p className="text-sm text-muted-foreground">Submit your first book to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissions.map((submission) => (
                        <Card key={submission.id} className="border-2 hover:border-primary/50 transition-all">
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2">{submission.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {submission.description}
                                </p>
                                <div className="flex flex-wrap gap-2 items-center">
                                  <Badge className={`${getStatusColor(submission.status)} text-white`}>
                                    {getStatusText(submission.status)}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    Submitted on {new Date(submission.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                
                                {submission.admin_comments && (
                                  <div className="mt-4 p-4 bg-muted rounded-lg">
                                    <div className="flex items-start gap-2">
                                      <MessageSquare className="h-4 w-4 text-primary mt-0.5" />
                                      <div>
                                        <p className="text-sm font-semibold mb-1">Admin Comments:</p>
                                        <p className="text-sm text-muted-foreground">{submission.admin_comments}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(submission.file_url, '_blank')}
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  View File
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
