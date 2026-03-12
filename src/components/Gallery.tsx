import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Play, X, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  displayOrder: number;
}

export const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery`);
      if (response.ok) {
        const data = await response.json();
        setItems(data.data || []);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => 
    filter === 'all' ? true : item.mediaType === filter
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <div className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Don't show section if no items
  }

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-gradient-to-r from-teal-600 to-blue-600' : ''}
        >
          All Media ({items.length})
        </Button>
        <Button
          variant={filter === 'image' ? 'default' : 'outline'}
          onClick={() => setFilter('image')}
          className={filter === 'image' ? 'bg-gradient-to-r from-teal-600 to-blue-600' : ''}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Images ({items.filter(i => i.mediaType === 'image').length})
        </Button>
        <Button
          variant={filter === 'video' ? 'default' : 'outline'}
          onClick={() => setFilter('video')}
          className={filter === 'video' ? 'bg-gradient-to-r from-teal-600 to-blue-600' : ''}
        >
          <VideoIcon className="h-4 w-4 mr-2" />
          Videos ({items.filter(i => i.mediaType === 'video').length})
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card 
            key={item._id} 
            className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-2 hover:border-primary/50"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
              {item.mediaType === 'image' ? (
                <img 
                  src={`${API_URL}${item.mediaUrl}`} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video 
                    src={`${API_URL}${item.mediaUrl}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary" fill="currentColor" />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg">
                  {item.mediaType === 'image' ? (
                    <ImageIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <VideoIcon className="h-3 w-3 mr-1" />
                  )}
                  {item.mediaType}
                </Badge>
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-white/90 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 overflow-hidden bg-black/95 border-none">
          {selectedItem && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={() => setSelectedItem(null)}
              >
                <X className="h-6 w-6" />
              </Button>

              {selectedItem.mediaType === 'image' ? (
                <div className="flex items-center justify-center min-h-[60vh] max-h-[85vh] p-4">
                  <img 
                    src={`${API_URL}${selectedItem.mediaUrl}`} 
                    alt={selectedItem.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[60vh] p-4">
                  <video 
                    src={`${API_URL}${selectedItem.mediaUrl}`}
                    controls
                    autoPlay
                    className="max-w-full max-h-[80vh]"
                  />
                </div>
              )}

              {/* Info Bar */}
              <div className="bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                {selectedItem.description && (
                  <p className="text-white/80">{selectedItem.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
