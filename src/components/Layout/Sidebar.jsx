import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../../context/AuthContext'
import bulusanLogo from '../../public/bulusan-logo.png'

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const { isAdmin, isHeadOfTourism } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: HomeIcon },
    { path: '/transactions', name: 'Transactions', icon: CurrencyDollarIcon },
    { path: '/tracking', name: 'Tracking', icon: ChartBarIcon },
    { path: '/reports', name: 'Reports', icon: DocumentTextIcon },
    ...(isAdmin() ? [{ path: '/users', name: 'User Management', icon: UsersIcon }] : []),
    ...(isAdmin() || isHeadOfTourism() ? [{ path: '/system-logs', name: 'System Logs', icon: ClipboardDocumentListIcon }] : []),
  ]

  return (
    <>
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-2 left-3 sm:top-3 sm:left-4 z-30 lg:hidden p-2 rounded-lg bg-primary text-white hover:bg-primary-light transition-colors flex-shrink-0 shadow-sm w-10 h-10 flex items-center justify-center"
          aria-label="Open menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-primary-darker via-primary-dark to-primary text-white flex flex-col transition-all duration-300 z-40
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className={`p-4 border-b border-primary-light/30 ${isCollapsed ? 'flex flex-col items-center gap-2' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'flex-col gap-2' : 'justify-between gap-3'}`}>
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''} min-w-0`}>
              <div className={`rounded-full overflow-hidden ${isCollapsed ? 'w-12 h-12' : 'w-12 h-12 sm:w-14 sm:h-14'} flex-shrink-0 bg-white/10`}>
                <img 
                  src={bulusanLogo} 
                  alt="Municipality of Bulusan Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <h1 className="font-bold text-sm leading-tight truncate">Municipality of</h1>
                  <h2 className="font-bold text-base sm:text-lg leading-tight truncate">BULUSAN</h2>
                </div>
              )}
            </div>
            
            {/* Desktop collapse button */}
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors lg:inline-flex items-center justify-center min-w-[40px] min-h-[40px]"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRightIcon className="w-5 h-5" />
              ) : (
                <ChevronLeftIcon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile close button (aligned to top-right of drawer header) */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] flex-shrink-0"
              aria-label="Close menu"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          {!isCollapsed && <p className="text-xs mt-1 text-white/60">OMTO</p>}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${isCollapsed ? 'justify-center' : ''}
                ${isActive
                  ? 'bg-white/20 text-white font-medium'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-light/30">
          {!isCollapsed && (
            <p className="text-xs text-white/60 text-center">Fiscal Year {new Date().getFullYear()}</p>
          )}
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar