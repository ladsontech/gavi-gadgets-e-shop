
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const allItems = [{ name: 'Home', url: '/' }, ...items];

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600 mb-4 overflow-x-auto">
      {allItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
          {index === 0 ? (
            <Link 
              to={item.url} 
              className="flex items-center gap-1 hover:text-pink-600 transition-colors whitespace-nowrap"
            >
              <Home className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          ) : index === allItems.length - 1 ? (
            <span className="text-gray-900 font-medium whitespace-nowrap">{item.name}</span>
          ) : (
            <Link 
              to={item.url} 
              className="hover:text-pink-600 transition-colors whitespace-nowrap"
            >
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
