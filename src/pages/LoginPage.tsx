import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Building2, UserCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const roles = [
    { value: '', label: 'Select Role' },
    { value: 'CEO', label: 'CEO' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Team Lead', label: 'Team Lead' },
    { value: 'Developer', label: 'Developer' },
    { value: 'Non-Tech', label: 'Non-Tech Staff' }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || (isRegistering && !selectedRole)) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-orange-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all hover:scale-105">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500">
            FlowSync
          </h1>
          <p className="mt-2 text-gray-600">
            {isRegistering ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isRegistering && (
              <Select
                label="Role"
                options={roles}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
            )}
            
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
              label="Email Address"
            />
            
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
              label="Password"
            />
          </div>
          
          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              className="group relative"
            >
              {isRegistering ? 'Create Account' : 'Sign In'}
            </Button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isRegistering
                ? 'Already have an account? Sign in'
                : "Don't have an account? Register"}
            </button>
          </div>
        </form>
        
        {!isRegistering && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo accounts</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-2">
              {roles.slice(1).map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setEmail(`${role.value.toLowerCase()}@example.com`)}
                  className="text-left px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{role.label}</span>
                  <span className="text-gray-500 ml-2">
                    ({role.value.toLowerCase()}@example.com)
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
