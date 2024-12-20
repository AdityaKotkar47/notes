import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Folder } from './pages/Folder';
import { Search } from './pages/Search';
import { NotFound } from './pages/NotFound';
import { config, uiConfig } from './config';

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: uiConfig.theme === 'darkly' ? 'dark' : 'light',
        primaryColor: 'blue',
        colors: {
          dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5C5F66',
            '#373A40',
            '#2C2E33',
            '#25262B',
            '#1A1B1E',
            '#141517',
            '#101113',
          ],
          blue: [
            '#DBE5F8',
            '#B7CCF1',
            '#93B3EA',
            '#6F9AE3',
            '#4B81DC',
            '#2768D5',
            '#1A73E8',
            '#1557B0',
            '#104489',
            '#0B3162',
          ],
        },
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
        headings: {
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
        },
        components: {
          Button: {
            styles: (theme) => ({
              root: {
                fontWeight: 500,
                backgroundColor: uiConfig.header_style_class.includes('bg-primary') ? '#1a73e8' : '#343a40',
                color: 'white',
                '&:hover': {
                  backgroundColor: uiConfig.header_style_class.includes('bg-primary') ? '#1557B0' : '#23272B',
                },
              },
            }),
          },
          TextInput: {
            styles: {
              input: {
                '&:focus': {
                  borderColor: '#1A73E8',
                },
              },
            },
          },
          Anchor: {
            styles: (theme) => ({
              root: {
                color: uiConfig.css_a_tag_color,
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }),
          },
          Text: {
            styles: (theme) => ({
              root: {
                color: uiConfig.css_p_tag_color,
              },
            }),
          },
        },
      }}
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/*" element={<Folder />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </MantineProvider>
  );
}

export default App;
