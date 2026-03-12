import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Upload, Trash2, Edit2, GripVertical, Image as ImageIcon, Video, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  createdBy: { name: string; email: string; };
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    mediaType: 'image' as 'image' | 'video', 
    file: null as File | null 
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => { 
    fetchGalleryItems(); 
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/gallery?includeInactive=true`, { 
        headers: { 
          'Authorization': `Bearer ${token}` 
        } 
      });
      if (!response.ok) throw new Error('Failed to fetch gallery items');
      const data = await response.json();
      setItems(data.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast.error('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { 
      toast.error('Please enter a title'); 
      return; 
    }
    if (!editingItem && !formData.file) { 
      toast.error('Please select a file to upload'); 
      return; 
    }
    
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('mediaType', formData.mediaType);
      if (formData.file) formDataToSend.append('file', formData.file);
      
      const url = editingItem 
        ? `${API_URL}/api/gallery/${editingItem._id}` 
        : `${API_URL}/api/gallery`;
      
      const response = await fetch(url, { 
        method: editingItem ? 'PUT' : 'POST', 
        headers: { 
          'Authorization': `Bearer ${token}` 
        }, 
        body: formDataToSend 
      });
      
      if (!response.ok) { 
        const error = await response.json(); 
        throw new Error(error.message || 'Failed to save gallery item'); 
      }
      
      toast.success(editingItem ? 'Gallery item updated successfully' : 'Gallery item created successfully');
      setShowDialog(false);
      resetForm();
      fetchGalleryItems();
    } catch (error: any) {
      console.error('Error saving gallery item:', error);
      toast.error(error.message || 'Failed to save gallery item');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/gallery/${id}`, { 
        method: 'DELETE', 
        headers: { 
          'Authorization': `Bearer ${token}` 
        } 
      });
      if (!response.ok) throw new Error('Failed to delete item');
      toast.success('Gallery item deleted successfully');
      fetchGalleryItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete gallery item');
    }
  };

  const handleToggleActive = async (item: GalleryItem) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/gallery/${item._id}`, { 
        method: 'PUT', 
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({ isActive: !item.isActive }) 
      });
      if (!response.ok) throw new Error('Failed to update status');
      toast.success(`Gallery item ${item.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchGalleryItems();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const openEditDialog = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title, 
      description: item.description || '', 
      mediaType: item.mediaType, 
      file: null 
    });
    setShowDialog(true);
  };

  const resetForm = () => {
    setFormData({ 
      title: '', 
      description: '', 
      mediaType: 'image', 
      file: null 
    });
    setEditingItem(null);
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
          <h2 className="text-3xl font-bold tracking-tight">Gallery Management</h2>
          <p className="text-muted-foreground">Manage your gallery images and videos</p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Add Gallery Item
        </Button>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No gallery items yet. Click "Add Gallery Item" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Gallery Items ({items.length})</CardTitle>
            <CardDescription>View and manage all gallery items</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    </TableCell>
                    <TableCell>
                      {item.mediaType === 'image' ? (
                        <img 
                          src={`${API_URL}${item.mediaUrl}`} 
                          alt={item.title} 
                          className="h-16 w-16 object-cover rounded" 
                        />
                      ) : (
                        <div className="h-16 w-16 bg-muted rounded flex items-center justify-center">
                          <Video className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant={item.mediaType === 'image' ? 'default' : 'secondary'}>
                        {item.mediaType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={item.isActive} 
                          onCheckedChange={() => handleToggleActive(item)} 
                        />
                        <span className="text-sm text-muted-foreground">
                          {item.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(item)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDelete(item._id)}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update the gallery item details' : 'Upload a new image or video to the gallery'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                placeholder="Enter title" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                placeholder="Enter description (optional)" 
                rows={3} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mediaType">Media Type *</Label>
              <Select 
                value={formData.mediaType} 
                onValueChange={(value: 'image' | 'video') => setFormData({ ...formData, mediaType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">
                {editingItem ? 'Replace File (optional)' : 'Upload File *'}
              </Label>
              <Input 
                id="file" 
                type="file" 
                accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'} 
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })} 
                required={!editingItem} 
              />
              {formData.mediaType === 'image' && (
                <p className="text-xs text-muted-foreground">
                  Accepted formats: JPEG, PNG, GIF, WebP
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingItem ? 'Update' : 'Upload'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
