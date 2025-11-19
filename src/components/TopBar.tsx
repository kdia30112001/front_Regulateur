import { Bell, Search, User } from 'lucide-react';

interface TopBarProps {
  onProfileClick: () => void;
}

export function TopBar({ onProfileClick }: TopBarProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button
            onClick={onProfileClick}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm text-[#1A1A1A]">Admin Principal</p>
              <p className="text-xs text-gray-500">admin@yoonubus.sn</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
