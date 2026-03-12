import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Upload, Trash2, Edit2, UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({ name: '', role: '', bio: '', email: '', phone: '', linkedin: '', photo: null as File | null });
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchTeamMembers(); }, []);

    const fetchTeamMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/team?includeInactive=true`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      setMembers(data.data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) { toast.error('Please enter name and role'); return; }
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('role', formData.role);
      if (formData.bio) formDataToSend.append('bio', formData.bio);
      if (formData.email) formDataToSend.append('email', formData.email);
      if (formData.phone) formDataToSend.append('phone', formData.phone);
      if (formData.linkedin) formDataToSend.append('linkedin', formData.linkedin);
      if (formData.photo) formDataToSend.append('photo', formData.photo);
      const url = editingMember ? `${API_URL}/api/team/${editingMember._id}` : `${API_URL}/api/team`;
      const response = await fetch(url, { 
        method: editingMember ? 'PUT' : 'POST', 
        headers: { 'Authorization': `Bearer ${token}` }, 
        body: formDataToSend 
      });
      if (!response.ok) { const error = await response.json(); throw new Error(error.message || 'Failed to save team member'); }
      toast.success(editingMember ? 'Team member updated successfully' : 'Team member created successfully');
      setShowDialog(false);
      resetForm();
      fetchTeamMembers();
    } catch (error: any) {
      console.error('Error saving team member:', error);
      toast.error(error.message || 'Failed to save team member');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/team/${id}`, { 
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${token}` } 
      });
      if (!response.ok) throw new Error('Failed to delete member');
      toast.success('Team member deleted successfully');
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
      toast.error('Failed to delete team member');
    }
  };

  const handleToggleActive = async (member: TeamMember) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/team/${member._id}`, { 
        method: 'PUT', 
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({ isActive: !member.isActive }) 
      });
      if (!response.ok) throw new Error('Failed to update status');
      toast.success(`Team member ${member.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchTeamMembers();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({ name: member.name, role: member.role, bio: member.bio || '', email: member.email || '', phone: member.phone || '', linkedin: member.linkedin || '', photo: null });
    setShowDialog(true);
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', bio: '', email: '', phone: '', linkedin: '', photo: null });
    setEditingMember(null);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    resetForm();
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">Manage your team members</p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {members.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No team members yet. Click "Add Team Member" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Team Members ({members.length})</CardTitle>
            <CardDescription>View and manage all team members</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>
                      {member.photoUrl ? (
                        <img 
                          src={`${API_URL}${member.photoUrl}`} 
                          alt={member.name} 
                          className="h-12 w-12 object-cover rounded-full" 
                        />
                      ) : (
                        <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                          <UserPlus className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{member.role}</Badge>
                    </TableCell>
                    <TableCell>{member.email || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={member.isActive} 
                          onCheckedChange={() => handleToggleActive(member)} 
                        />
                        <span className="text-sm text-muted-foreground">
                          {member.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(member)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDelete(member._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </DialogTitle>
            <DialogDescription>
              {editingMember ? 'Update team member details' : 'Add a new member to your team'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                placeholder="Enter name" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input 
                id="role" 
                value={formData.role} 
                onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
                placeholder="e.g., Founder, CEO, Editor" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                value={formData.bio} 
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })} 
                placeholder="Brief description" 
                rows={3} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                placeholder="email@example.com" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                placeholder="+91 XXXXXXXXXX" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input 
                id="linkedin" 
                value={formData.linkedin} 
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} 
                placeholder="https://linkedin.com/in/..." 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">
                {editingMember ? 'Replace Photo (optional)' : 'Upload Photo'}
              </Label>
              <Input 
                id="photo" 
                type="file" 
                accept="image/*" 
                onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })} 
              />
              <p className="text-xs text-muted-foreground">
                Accepted formats: JPEG, PNG, GIF, WebP
              </p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingMember ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
