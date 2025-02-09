import React, { useState, useEffect } from 'react';
import { AppShell, Header, Container, Group, TextInput, ActionIcon, Box, Burger, Drawer, Image, useMantineTheme } from '@mantine/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IconSearch, IconX, IconBrandGithub, IconMessage } from '@tabler/icons-react';
import { config, uiConfig } from '../config';
import { useClickOutside } from '@mantine/hooks';
import { useSearch } from '../contexts/SearchContext';

export function Layout({ children }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [mobileSearchOpened, setMobileSearchOpened] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { 
    searchQuery, 
    setSearchQuery, 
    performSearch, 
    clearSearch 
  } = useSearch();

  const handleClickOutside = () => {
    setIsSearchFocused(false);
    if (!searchQuery && !location.pathname.startsWith('/search')) {
      setMobileSearchOpened(false);
    }
  };

  const searchRef = useClickOutside(handleClickOutside);

  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      clearSearch();
      setIsSearchFocused(false);
      setMobileSearchOpened(false);
    }
  }, [location.pathname, clearSearch]);

  const handleSearch = (e) => {
    e?.preventDefault();
    performSearch();
  };

  const handleSearchIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (searchQuery.trim()) {
      performSearch();
    } else {
      const input = e.currentTarget.closest('form').querySelector('input');
      input.focus();
    }
  };

  const handleClearSearch = () => {
    clearSearch();
    setIsSearchFocused(true);
    if (!location.pathname.startsWith('/search')) {
      setMobileSearchOpened(false);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const commonInputProps = {
    placeholder: "Search files...",
    value: searchQuery,
    onChange: (e) => setSearchQuery(e.target.value),
    onFocus: handleSearchFocus,
    onBlur: (e) => {
      const isSearchIconClick = e.relatedTarget?.closest('[data-search-icon="true"]');
      if (!isSearchIconClick && !searchQuery.trim()) {
        setIsSearchFocused(false);
      }
    },
    autoComplete: "off",
    icon: (
      <ActionIcon
        data-search-icon="true"
        onClick={handleSearchIconClick}
        size="sm"
        variant="transparent"
        tabIndex={-1}
        sx={{
          cursor: 'pointer',
          opacity: isSearchFocused ? 1 : 0.6,
          transition: 'all 0.3s ease-in-out',
          transform: isSearchFocused ? 'translateX(236px)' : 'translateX(0)',
          pointerEvents: 'auto',
          '&:hover': {
            opacity: 0.8
          }
        }}
      >
        <IconSearch size={16} />
      </ActionIcon>
    ),
    rightSection: searchQuery && (
      <ActionIcon 
        onClick={handleClearSearch} 
        size="sm" 
        variant="transparent"
        sx={(theme) => ({
          opacity: isSearchFocused ? 1 : 0,
          transform: isSearchFocused ? 'translateX(0)' : 'translateX(32px)',
          transition: 'all 0.3s ease-in-out',
          color: theme.colorScheme === 'dark' 
            ? theme.fn.rgba(theme.colors.red[9], 0.85)
            : theme.fn.rgba(theme.colors.red[7], 0.85),
          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark'
              ? theme.fn.rgba(theme.colors.red[9], 0.15)
              : theme.fn.rgba(theme.colors.red[7], 0.15),
          }
        })}
      >
        <IconX size={16} />
      </ActionIcon>
    ),
    styles: (theme) => ({
      root: { 
        position: 'relative',
      },
      input: {
        transition: 'all 0.3s ease-in-out',
        paddingLeft: isSearchFocused ? '16px' : '42px',
        '&:focus': {
          borderColor: theme.colors.blue[5],
        },
      },
      rightSection: {
        width: searchQuery ? 76 : 32,
        transition: 'width 0.3s ease-in-out',
        justifyContent: 'flex-end',
        paddingRight: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }
    })
  };

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} fixed={uiConfig.fixed_header} 
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
          })}
        >
          <Container size="lg" h="100%">
            <Group position="apart" h="100%" spacing="xl">
              <Group spacing="xl">
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={uiConfig.logo_link_name}
                    alt={config.siteName}
                    width={35}
                    height={35}
                    sx={{ borderRadius: '50%' }}
                  />
                </Link>
              </Group>

              {/* Desktop Navigation */}
              <Group spacing="xl" sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
                <form onSubmit={handleSearch} style={{ display: 'flex' }} ref={searchRef}>
                  <TextInput
                    {...commonInputProps}
                    styles={(theme) => ({
                      ...commonInputProps.styles(theme),
                      root: { 
                        ...commonInputProps.styles(theme).root,
                        minWidth: 300,
                      },
                    })}
                  />
                </form>
                <ActionIcon
                  component="a"
                  href="https://github.com/AdityaKotkar47/notes"
                  target="_blank"
                  size="lg"
                  variant="subtle"
                  color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                >
                  <IconBrandGithub size={22} />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href={uiConfig.contact_link}
                  target="_blank"
                  size="lg"
                  variant="subtle"
                  color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                >
                  <IconMessage size={22} />
                </ActionIcon>
              </Group>

              {/* Mobile Navigation */}
              <Box sx={{ '@media (min-width: 769px)': { display: 'none' } }}>
                <Group spacing="sm">
                  {!mobileSearchOpened ? (
                    <ActionIcon 
                      onClick={() => {
                        setMobileSearchOpened(true);
                        setIsSearchFocused(true);
                      }}
                      size="lg"
                      variant="subtle"
                      color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                    >
                      <IconSearch size={22} />
                    </ActionIcon>
                  ) : (
                    <form onSubmit={handleSearch} style={{ display: 'flex' }} ref={searchRef}>
                      <TextInput
                        {...commonInputProps}
                        autoFocus
                        size="sm"
                        styles={(theme) => ({
                          ...commonInputProps.styles(theme),
                          root: { 
                            ...commonInputProps.styles(theme).root,
                            width: 200,
                          },
                        })}
                        icon={{
                          ...commonInputProps.icon,
                          props: {
                            ...commonInputProps.icon.props,
                            sx: {
                              ...commonInputProps.icon.props.sx,
                              transform: isSearchFocused ? 'translateX(138px)' : 'translateX(0)',
                            }
                          }
                        }}
                      />
                    </form>
                  )}
                  <Burger
                    opened={mobileMenuOpened}
                    onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
                    size="sm"
                    color={theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[6]}
                  />
                </Group>
              </Box>
            </Group>
          </Container>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          paddingTop: '60px',
          minHeight: '100vh',
        },
      })}
    >
      {/* Mobile Menu Drawer */}
      <Drawer
        opened={mobileMenuOpened}
        onClose={() => setMobileMenuOpened(false)}
        position="right"
        size="xs"
        styles={{
          drawer: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          },
        }}
      >
        <Box p="md">
          <Group mb="xl">
            <ActionIcon
              component="a"
              href="https://github.com/AdityaKotkar47/notes"
              target="_blank"
              size="xl"
              variant="light"
              color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
            >
              <IconBrandGithub size={24} />
            </ActionIcon>
            <ActionIcon
              component="a"
              href={uiConfig.contact_link}
              target="_blank"
              size="xl"
              variant="light"
              color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
            >
              <IconMessage size={24} />
            </ActionIcon>
          </Group>
        </Box>
      </Drawer>

      <Container size="lg">
        {children}
      </Container>
    </AppShell>
  );
} 