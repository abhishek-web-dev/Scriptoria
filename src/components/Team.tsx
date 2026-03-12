import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Linkedin, Loader2 } from 'lucide-react';

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
}

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/team`);
        if (response.ok) {
          const data = await response.json();
          setMembers(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (members.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member) => (
        <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              {member.photoUrl ? (
                <img
                  src={`${API_URL}${member.photoUrl}`}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-primary/10"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-4 ring-4 ring-primary/10">
                  <span className="text-4xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-3">{member.role}</p>
              {member.bio && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {member.bio}
                </p>
              )}
              <div className="flex gap-3 mt-auto">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors"
                    aria-label="Phone"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
