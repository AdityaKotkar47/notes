import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  wrapper: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  table: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    minWidth: '100%',
    '& th, & td': {
      '@media (max-width: 768px)': {
        padding: '8px',
      },
    },
  },
  emptyStateWrapper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    minHeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    '@media (max-width: 768px)': {
      minHeight: 250,
      padding: theme.spacing.md,
    },
  },
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },
  link: {
    color: theme.colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.blue[6],
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  fileName: {
    userSelect: 'text',
    WebkitUserSelect: 'text',
    msUserSelect: 'text',
  }
})); 