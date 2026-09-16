// Design tokens - single source of truth
export const colors = {
  bg: '#050505',
  card: '#0f0f0f',
  cardBorder: 'rgba(255,255,255,0.06)',
  primary: '#7c3aed',
  primaryLight: '#a855f7',
  primaryGlow: 'rgba(124,58,237,0.25)',
  secondary: '#00B4D8',
  secondaryGlow: 'rgba(0,180,216,0.2)',
  success: '#10B981',
  successGlow: 'rgba(16,185,129,0.2)',
  textMuted: '#6b7280',
  textSub: '#9ca3af',
};

export const styles = {
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: colors.bg,
    padding: '0',
    minHeight: '100%',
  },
  primaryBtn: {
    width: '100%',
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
    color: '#fff',
    fontWeight: '600',
    fontSize: '15px',
    padding: '16px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: `0 0 30px ${colors.primaryGlow}`,
    transition: 'transform 0.1s, box-shadow 0.2s',
    letterSpacing: '0.02em',
  },
  card: {
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '20px',
    padding: '20px',
  },
};
