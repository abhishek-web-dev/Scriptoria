import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BookOpen, Users, FileText, Loader2, Eye, MessageSquare, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

interface BookSubmission {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_name: string;
  status: 'under_review' | 'approved' | 'published' | 'rejected';
  created_at: string;
  admin_comments?: string;
  user_id: string;
}

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState<BookSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<BookSubmission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  
  const [reviewForm, setReviewForm] = useState({
    status: '',
    comments: '',
  });

  const [stats, setStats] = useState({
    total: 0,
    underReview: 0,
    approved: 0,
    published: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [submissions]);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('book_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch submissions: ' + error.message);
    }
  };

  const calculateStats = () => {
    setStats({
      total: submissions.length,
      underReview: submissions.filter(s => s.status === 'under_review').length,
      approved: submissions.filter(s => s.status === 'approved').length,
      published: submissions.filter(s => s.status === 'published').length,
      rejected: submissions.filter(s => s.status === 'rejected').length,
    });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('book_submissions')
        .update({
          status: reviewForm.status,
          admin_comments: reviewForm.comments,
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      toast.success('Book status updated successfully!');
      setIsDialogOpen(false);
      setSelectedSubmission(null);
      setReviewForm({ status: '', comments: '' });
      fetchSubmissions();
    } catch (error: any) {
      toast.error('Failed to update status: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openReviewDialog = (submission: BookSubmission) => {
    setSelectedSubmission(submission);
    setReviewForm({
      status: submission.status,
      comments: submission.admin_comments || '',
    });
    setIsDialogOpen(true);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'published':
        return <TrendingUp className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const filteredSubmissions = filter === 'all' 
    ? submissions 
    : submissions.filter(s => s.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Admin Dashboard
          </h1>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total Books</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-yellow-500/50 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.underReview}</p>
                    <p className="text-xs text-muted-foreground">Under Review</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500/50 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.approved}</p>
                    <p className="text-xs text-muted-foreground">Approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500/50 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.published}</p>
                    <p className="text-xs text-muted-foreground">Published</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-red-500/50 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
                    <XCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.rejected}</p>
                    <p className="text-xs text-muted-foreground">Rejected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 shadow-xl">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">Manage Submissions</CardTitle>
                  <CardDescription>Review and update book submission status</CardDescription>
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Submissions</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                          No submissions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSubmissions.map((submission) => (
                        <TableRow key={submission.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <div className="max-w-xs">
                              <p className="font-semibold truncate">{submission.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {submission.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(submission.status)} text-white gap-1`}>
                              {getStatusIcon(submission.status)}
                              {getStatusText(submission.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(submission.file_url, '_blank')}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => openReviewDialog(submission)}
                                className="bg-gradient-to-r from-primary to-accent"
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Review Submission</DialogTitle>
            <DialogDescription>
              Update the status and add comments for: <strong>{selectedSubmission?.title}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleReviewSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={reviewForm.status} onValueChange={(value) => setReviewForm({ ...reviewForm, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under_review">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Under Review
                    </div>
                  </SelectItem>
                  <SelectItem value="approved">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Approved
                    </div>
                  </SelectItem>
                  <SelectItem value="published">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Published
                    </div>
                  </SelectItem>
                  <SelectItem value="rejected">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Rejected
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={reviewForm.comments}
                onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                placeholder="Add comments for the author (optional)"
                rows={6}
                className="resize-none"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={isLoading || !reviewForm.status}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Status'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
