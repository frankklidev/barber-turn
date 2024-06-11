import { useEffect } from 'react';
import { supabase } from '../supabaseClient';

const useNotifications = (userId: string) => {
  useEffect(() => {
    const subscription = supabase
      .channel('public:notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, (payload) => {
        new Notification('Nueva Reserva', {
          body: payload.new.message,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);
};

export default useNotifications;

