'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bell,
  CalendarPlus,
  CalendarX,
  Clock,
  Edit2,
  ClipboardList,
  ClipboardCheck,
  UserCheck,
  RefreshCw,
  FileText,
  Send,
  Eye,
  ThumbsUp,
  ThumbsDown,
  FileCheck,
  FileOutput,
  Inbox,
  AlertCircle,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/context/AuthContext'
import {
  getNotificationsForUser,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from '@/lib/calendar-data'
import type { Notification, NotificationType } from '@/lib/calendar-types'

// =============================================================================
// Helpers
// =============================================================================

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    // Booking events
    case 'booking_created':     return CalendarPlus
    case 'booking_cancelled':   return CalendarX
    case 'booking_updated':     return Edit2
    case 'booking_reminder':    return Clock
    // Survey events
    case 'survey_created':      return ClipboardList
    case 'survey_assigned':     return UserCheck
    case 'survey_completed':    return ClipboardCheck
    case 'survey_status_changed': return RefreshCw
    // Quotation events
    case 'quotation_generated': return FileText
    case 'quotation_sent':      return Send
    case 'quotation_viewed':    return Eye
    case 'quotation_accepted':  return ThumbsUp
    case 'quotation_declined':  return ThumbsDown
    // Report events
    case 'report_generated':    return FileCheck
    case 'report_published':    return FileOutput
    // Enquiry events
    case 'enquiry_created':     return Inbox
    // System
    case 'system_alert':        return AlertCircle
    default:                    return Bell
  }
}

function getNotificationColors(type: NotificationType): {
  border: string
  icon: string
} {
  switch (type) {
    // Booking — green/red/amber/blue
    case 'booking_created':      return { border: 'border-l-emerald-500', icon: 'text-emerald-400' }
    case 'booking_cancelled':    return { border: 'border-l-red-500',     icon: 'text-red-400'     }
    case 'booking_updated':      return { border: 'border-l-amber-500',   icon: 'text-amber-400'   }
    case 'booking_reminder':     return { border: 'border-l-blue-500',    icon: 'text-blue-400'    }
    // Survey — teal/cyan
    case 'survey_created':       return { border: 'border-l-teal-500',    icon: 'text-teal-400'    }
    case 'survey_assigned':      return { border: 'border-l-cyan-500',    icon: 'text-cyan-400'    }
    case 'survey_completed':     return { border: 'border-l-emerald-500', icon: 'text-emerald-400' }
    case 'survey_status_changed': return { border: 'border-l-teal-500',   icon: 'text-teal-400'    }
    // Quotation — purple/violet
    case 'quotation_generated':  return { border: 'border-l-purple-500',  icon: 'text-purple-400'  }
    case 'quotation_sent':       return { border: 'border-l-violet-500',  icon: 'text-violet-400'  }
    case 'quotation_viewed':     return { border: 'border-l-indigo-500',  icon: 'text-indigo-400'  }
    case 'quotation_accepted':   return { border: 'border-l-emerald-500', icon: 'text-emerald-400' }
    case 'quotation_declined':   return { border: 'border-l-red-500',     icon: 'text-red-400'     }
    // Report — sky
    case 'report_generated':     return { border: 'border-l-sky-500',     icon: 'text-sky-400'     }
    case 'report_published':     return { border: 'border-l-sky-500',     icon: 'text-sky-400'     }
    // Enquiry — amber
    case 'enquiry_created':      return { border: 'border-l-amber-500',   icon: 'text-amber-400'   }
    // System — red/warning
    case 'system_alert':         return { border: 'border-l-red-500',     icon: 'text-red-400'     }
    default:                     return { border: 'border-l-white/20',    icon: 'text-white/40'    }
  }
}

function formatRelativeTime(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
  } catch {
    return ''
  }
}

// =============================================================================
// Component
// =============================================================================

export function NotificationBell() {
  const { user, profile } = useAuth()
  const router = useRouter()

  const [isOpen, setIsOpen]           = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading]     = useState(false)
  const [isMarkingAll, setIsMarkingAll] = useState(false)
  const [pingBadge, setPingBadge]     = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef   = useRef<HTMLButtonElement>(null)

  // ------------------------------------------------------------------
  // Initial unread count on mount
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!profile?.id) return
    getUnreadCount(profile.id).then(setUnreadCount)
  }, [profile?.id])

  // ------------------------------------------------------------------
  // Fetch notification list when dropdown opens
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!isOpen || !profile?.id) return
    setIsLoading(true)
    getNotificationsForUser(profile.id, 20)
      .then(setNotifications)
      .finally(() => setIsLoading(false))
  }, [isOpen, profile?.id])

  // ------------------------------------------------------------------
  // Close dropdown on outside click
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // ------------------------------------------------------------------
  // Supabase Realtime subscription — INSERT on notifications table
  // filter uses profile.id (user_profiles PK) which is what notifications.user_id stores
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!profile?.id) return

    const supabase = createClient()
    if (!supabase) return

    const channelName = `notifications-${profile.id}`

    let retryTimeout: NodeJS.Timeout | null = null

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${profile.id}`,
        },
        (payload) => {
          const incoming = payload.new as Notification

          // Increment the unread badge
          setUnreadCount((prev) => prev + 1)

          // Prepend to list (visible immediately if dropdown is open)
          setNotifications((prev) => [incoming, ...prev])

          // Brief ping animation on the badge to draw attention
          setPingBadge(true)
          setTimeout(() => setPingBadge(false), 1500)
        }
      )
      .subscribe((status, err) => {
        if (err) {
          console.error('[NotificationBell] Realtime error:', err)
        }
        // Reconnect on channel close/error after a short delay
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.warn('[NotificationBell] Channel lost, retrying in 5s...')
          retryTimeout = setTimeout(() => {
            supabase.removeChannel(channel)
            // Re-subscribe by forcing effect re-run via unread count refresh
            getUnreadCount(profile!.id).then(setUnreadCount)
          }, 5000)
        }
      })

    return () => {
      if (retryTimeout) clearTimeout(retryTimeout)
      supabase.removeChannel(channel)
    }
  }, [profile?.id])

  // ------------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------------
  const handleNotificationClick = useCallback(
    async (notification: Notification) => {
      if (!notification.read) {
        await markAsRead(notification.id)
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
        )
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
      setIsOpen(false)

      // Navigate: prefer link_url, fall back to /calendar for booking notifications
      if (notification.link_url) {
        router.push(notification.link_url)
      } else if (notification.booking_id) {
        router.push('/calendar')
      }
      // Notifications with neither link_url nor booking_id just mark as read
    },
    [router]
  )

  const handleMarkAllAsRead = useCallback(async () => {
    if (!profile?.id || isMarkingAll) return
    setIsMarkingAll(true)
    const ok = await markAllAsRead(profile.id)
    if (ok) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    }
    setIsMarkingAll(false)
  }, [profile?.id, isMarkingAll])

  // Don't render if there's no authenticated user
  if (!user) return null

  const displayCount = unreadCount > 9 ? '9+' : unreadCount > 0 ? String(unreadCount) : null

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <div className="relative">
      {/* Bell button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Bell className="w-5 h-5" />

        {/* Unread badge */}
        {displayCount && (
          <>
            {/* Ping ripple on new notification */}
            {pingBadge && (
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-red-500 animate-ping opacity-75 pointer-events-none" />
            )}
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-0.5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
              {displayCount}
            </span>
          </>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-80 max-h-[420px] flex flex-col glass-card border border-white/10 shadow-2xl z-50 overflow-hidden rounded-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={isMarkingAll}
                className="text-xs text-brand-400 hover:text-brand-300 transition-colors disabled:opacity-50"
              >
                {isMarkingAll ? 'Marking…' : 'Mark all as read'}
              </button>
            )}
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <Bell className="w-8 h-8 text-white/20 mb-2" />
                <p className="text-sm text-white/40">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon   = getNotificationIcon(notification.type)
                const colors = getNotificationColors(notification.type)

                return (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full text-left px-4 py-3 border-l-2 ${colors.border} hover:bg-white/5 transition-colors ${
                      !notification.read ? 'bg-white/[0.04]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Type icon */}
                      <div className={`flex-shrink-0 mt-0.5 ${colors.icon}`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm leading-snug ${
                            !notification.read
                              ? 'font-semibold text-white'
                              : 'font-normal text-white/75'
                          }`}
                        >
                          {notification.title}
                        </p>
                        <p className="text-xs text-white/50 mt-0.5 line-clamp-2 leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-white/30 mt-1">
                          {formatRelativeTime(notification.created_at)}
                        </p>
                      </div>

                      {/* Unread dot */}
                      {!notification.read && (
                        <div className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-brand-400" />
                      )}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
