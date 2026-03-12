import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BookOpen, Upload, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [bookFile, setBookFile] = useState<File | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (user) {
      loadProfile();
      loadSubmissions();
    }
  }, [user, authLoading, navigate]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
      setFullName(data.full_name);
      setEmail(data.email);
      setMobileNumber(data.mobile_number || '');
    }
  };

  const loadSubmissions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('book_submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setSubmissions(data);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        email: email,
        mobile_number: mobileNumber,
      })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully!');
      loadProfile();
    }
  };

  const handleSubmitBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !bookFile) {
      toast.error('Please select a file');
      return;
    }

    setLoading(true);

    // Upload file to storage
    const fileExt = bookFile.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('manuscripts')
      .upload(fileName, bookFile);

    if (uploadError) {
      toast.error('Failed to upload file');
      setLoading(false);
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('manuscripts')
      .getPublicUrl(fileName);

    // Create submission record
    const { error: insertError } = await supabase
      .from('book_submissions')
      .insert({
        user_id: user.id,
        title: bookTitle,
        description: bookDescription,
        file_url: publicUrl,
        file_name: bookFile.name,
      });

    setLoading(false);

    if (insertError) {
      toast.error('Failed to submit book');
    } else {
      toast.success('Book submitted for review!', {
        description: 'Your book is under review. Track the status in the Track Status tab.',
      });
      setBookTitle('');
      setBookDescription('');
      setBookFile(null);
      loadSubmissions();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Clock className="h-4 w-4" />;
      case 'approved':
      case 'published':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
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

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your profile and book submissions</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="submit">Publish Book</TabsTrigger>
              <TabsTrigger value="track">Track Status</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Publish Your Book
                  </CardTitle>
                  <CardDescription>
                    Submit your manuscript for review. Accepted formats: PDF, DOCX, DOC
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitBook} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bookTitle">Book Title</Label>
                      <Input
                        id="bookTitle"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        placeholder="Enter your book title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bookDescription">Description</Label>
                      <Textarea
                        id="bookDescription"
                        value={bookDescription}
                        onChange={(e) => setBookDescription(e.target.value)}
                        placeholder="Brief description of your book"
                        rows={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bookFile">Upload Manuscript</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="bookFile"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setBookFile(e.target.files?.[0] || null)}
                          required
                        />
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Accepted formats: PDF, DOCX, DOC (Max 50MB)
                      </p>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Submitting...' : 'Publish My Book'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="track">
              <Card>
                <CardHeader>
                  <CardTitle>Track Submission Status</CardTitle>
                  <CardDescription>View the status of your book submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {submissions.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No submissions yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissions.map((submission) => (
                        <Card key={submission.id} className="border-l-4" style={{ borderLeftColor: `hsl(var(--${submission.status === 'approved' || submission.status === 'published' ? 'accent' : submission.status === 'rejected' ? 'destructive' : 'secondary'}))` }}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-lg">{submission.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  Submitted on {new Date(submission.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                {getStatusIcon(submission.status)}
                                {submission.status.replace('_', ' ')}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm">{submission.description}</p>
                            {submission.admin_comments && (
                              <div className="mt-4 p-4 bg-muted rounded-lg">
                                <p className="text-sm font-semibold mb-2">Admin Comments:</p>
                                <p className="text-sm text-muted-foreground">{submission.admin_comments}</p>
                              </div>
                            )}
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

export default Dashboard;