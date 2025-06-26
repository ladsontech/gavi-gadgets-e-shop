
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Real-time search
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for iPhone, Samsung, Pixel..."
            value={searchQuery}
            onChange={handleInputChange}
            className="pl-10 pr-4 py-3 w-full rounded-xl border-pink-200 focus:border-pink-400 focus:ring-pink-400"
          />
        </div>
      </form>
    </div>
  );
};
