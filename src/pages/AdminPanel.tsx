import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { BookOpen, Users, FileText, Loader2, Eye, MessageSquare, CheckCircle, XCircle, Clock, TrendingUp, Filter, Image as ImageIcon, UserPlus, Upload, Trash2, Edit, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TeamManager from '@/components/TeamManager';
import GalleryManager from '@/components/GalleryManager';

interface BookSubmission {
  _id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  status: 'under_review' | 'approved' | 'published' | 'rejected';
  createdAt: string;
  adminComments?: string;
  user: {
    _id: string;
    name: string;
    email: string;
    mobile?: string;
  };
}

const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  
  const [submissions, setSubmissions] = useState<BookSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<BookSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<BookSubmission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('submissions');
  
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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast.error('Access Denied', {
        description: 'You do not have permission to access the admin panel.',
      });
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    fetchSubmissions();
    fetchStats();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [filter, submissions]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${API_URL}/api/books/admin/all`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Failed to fetch submissions');

      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data);
      }
    } catch (error: any) {
      toast.error('Failed to fetch submissions: ' + error.message);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/books/stats`, {
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

  const filterSubmissions = () => {
    if (filter === 'all') {
      setFilteredSubmissions(submissions);
    } else {
      setFilteredSubmissions(submissions.filter(s => s.status === filter));
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    if (!reviewForm.status) {
      toast.error('Please select a status');
      return;
    }

    setIsLoading(true);

    try {
            const response = await fetch(`${API_URL}/api/books/admin/${selectedSubmission._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          status: reviewForm.status,
          adminComments: reviewForm.comments,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update submission');
      }

      toast.success('Book status updated successfully!');
      setIsDialogOpen(false);
      setSelectedSubmission(null);
      setReviewForm({ status: '', comments: '' });
      fetchSubmissions();
      fetchStats();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update submission');
    } finally {
      setIsLoading(false);
    }
  };

  const openReviewDialog = (submission: BookSubmission) => {
    setSelectedSubmission(submission);
    setReviewForm({
      status: submission.status,
      comments: submission.adminComments || '',
    });
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      under_review: { label: 'Under Review', icon: Clock, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
      approved: { label: 'Approved', icon: CheckCircle, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      published: { label: 'Published', icon: BookOpen, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      rejected: { label: 'Rejected', icon: XCircle, color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
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
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Manage submissions, team members, and gallery</p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8">
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Book Submissions</span>
              <span className="sm:hidden">Books</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team Members</span>
              <span className="sm:hidden">Team</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
              <span className="sm:hidden">Gallery</span>
            </TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Total Submissions', value: stats.total, icon: FileText, color: 'from-slate-500 to-slate-600' },
                { label: 'Under Review', value: stats.underReview, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
                { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'from-green-500 to-green-600' },
                { label: 'Published', value: stats.published, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
                { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'from-red-500 to-red-600' },
              ].map((stat, i) => (
                <Card key={i} className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
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

        {/* Submissions Table */}
        <Card className="border-2 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="h-6 w-6 text-teal-600" />
                  Book Submissions
                </CardTitle>
                <CardDescription>Review and manage all manuscript submissions</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
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
            </div>
          </CardHeader>
          <CardContent>
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No submissions found</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {filter === 'all' ? 'There are no book submissions yet.' : `No submissions with status "${filter}".`}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Details</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission._id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold text-base">{submission.title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 max-w-md">
                              {submission.description}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              <FileText className="h-3 w-3 inline mr-1" />
                              {submission.fileName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{submission.user.name}</div>
                            <div className="text-xs text-slate-500">{submission.user.email}</div>
                            {submission.user.mobile && (
                              <div className="text-xs text-slate-500">{submission.user.mobile}</div>
                            )}
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
                                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                                  {submission.adminComments}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">No comments</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openReviewDialog(submission)}
                              className="hover:bg-teal-50 dark:hover:bg-teal-950"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            <a
                              href={`${API_URL}${submission.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-950">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </a>
                          </div>
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

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <TeamManager />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <GalleryManager />
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Review Submission</DialogTitle>
            <DialogDescription>
              Update the status and add comments for this submission
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{selectedSubmission.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{selectedSubmission.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Author:</span>{' '}
                    <span className="font-medium">{selectedSubmission.user.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Email:</span>{' '}
                    <span className="font-medium">{selectedSubmission.user.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Date:</span>{' '}
                    <span className="font-medium">{formatDate(selectedSubmission.createdAt)}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">Update Status *</Label>
                  <Select
                    value={reviewForm.status}
                    onValueChange={(value) => setReviewForm({ ...reviewForm, status: value })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under_review">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          Under Review
                        </div>
                      </SelectItem>
                      <SelectItem value="approved">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Approved
                        </div>
                      </SelectItem>
                      <SelectItem value="published">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          Published
                        </div>
                      </SelectItem>
                      <SelectItem value="rejected">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Rejected
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-sm font-medium">Admin Comments</Label>
                  <Textarea
                    id="comments"
                    value={reviewForm.comments}
                    onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                    placeholder="Add feedback or comments for the author..."
                    rows={6}
                    maxLength={1000}
                    className="resize-none"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {reviewForm.comments.length}/1000 characters
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
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
                        Updating...
                      </>
                    ) : (
                      'Update Status'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
