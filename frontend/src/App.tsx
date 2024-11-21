import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import CitationManager from './app/projects/[project_id]/citations/page';
import Home from './app/home/page';
import LandingPage from './app/landing/oldpage';
import ProjectsPage from './app/projects/page';
import DocumentEditor from './app/document-editor/page';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Navigate replace to="/landing" />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/citations" element={<CitationManager />} />
              <Route path="/projects/:project_id/citations" element={<CitationManager />} />
              <Route path="/document-editor" element={<DocumentEditor />} />
              {/* Add other routes as needed */}
            </Routes>
          </main>
          <footer className="border-t">
            <div className="container ml-10 flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <p className="text-center text-sm leading-loose md:text-left">
                  Built by{" "}
                  <a
                    href="https://www.linkedin.com/in/josh-buckley-004743186/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Josh Buckley
                  </a>
                  .
                </p>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-left">
                &copy; 2024 Josh Buckley. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
