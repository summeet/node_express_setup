import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { getNotifications, markAllNotificationsAsRead } from '../services/api';

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchNotifications();

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await getNotifications();
            const notifs = response.data.notifications || [];
            setNotifications(notifs);

            // Count unread notifications
            const unread = notifs.filter(n => !n.isRead).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            // If API fails, set empty notifications
            setNotifications([]);
            setUnreadCount(0);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();
            // Update local state
            setNotifications(notifications.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Failed to mark notifications as read:', error);
            alert('Failed to mark notifications as read');
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchNotifications();
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Icon Button */}
            <button
                onClick={toggleDropdown}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <Bell className="w-6 h-6 text-text" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-[600px] flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>

                    {/* Mark all as read button */}
                    {unreadCount > 0 && (
                        <div className="px-4 py-2 border-b border-slate-200">
                            <button
                                onClick={handleMarkAllAsRead}
                                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                            >
                                <Check className="w-4 h-4" />
                                Mark all as read
                            </button>
                        </div>
                    )}

                    {/* Notifications List */}
                    <div className="overflow-y-auto flex-1">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-indigo-600"></div>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                    <Bell className="w-8 h-8 text-slate-400" />
                                </div>
                                <p className="text-slate-600 text-center">No notifications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {notifications.map((notification, index) => (
                                    <div
                                        key={notification.id || index}
                                        className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-indigo-50/50' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {!notification.isRead && (
                                                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm ${!notification.isRead ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                                                    {notification.title || notification.message}
                                                </p>
                                                {notification.body && notification.title && (
                                                    <p className="text-sm text-slate-600 mt-1">
                                                        {notification.body}
                                                    </p>
                                                )}
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {formatTime(notification.createdAt || notification.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-slate-200 text-center">
                            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                                View all notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
