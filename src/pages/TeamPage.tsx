import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, AlertCircle, Mail, Phone } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import { mockUsers } from '../data/mockData';

const TeamPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-center px-4">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 max-w-md">
          You don't have permission to access the team management page.
        </p>
      </div>
    );
  }

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'CEO': return 'secondary';
      case 'Admin': return 'primary';
      case 'Team Lead': return 'warning';
      case 'Developer': return 'success';
      case 'Non-Tech': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
        <Button variant="primary" className="w-full sm:w-auto">Add Team Member</Button>
      </div>

      <Card className="mb-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUsers.map(user => (
          <Card
            key={user.id}
            className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl"
          >
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 h-24"></div>
            <div className="px-6 pb-6">
              <div className="flex justify-center -mt-12 mb-4">
                <Avatar
                  src={user.avatar}
                  name={user.name}
                  size="xl"
                  className="border-4 border-white shadow-md"
                />
              </div>

              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-500">{user.position}</p>
                <div className="flex justify-center mt-2">
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>(555) 123-4567</span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" className="hover:bg-gray-100 transition">
                  View Profile
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredUsers.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No team members found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
