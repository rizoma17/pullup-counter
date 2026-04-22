import { useEffect, useState } from 'react';
import type { TrainingSession } from '../types/app';
import { getRecentSessions } from '../lib/db';

export function useSessionHistory(limit = 20) {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const rows = await getRecentSessions(limit);
      setSessions(rows);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, [limit]);

  return { sessions, loading, refresh };
}
