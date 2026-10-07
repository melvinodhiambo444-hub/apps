import React, { useState, useEffect } from 'react';
import { Movie } from './types/movie';
import { SAMPLE_MOVIES } from './data/sampleMovies';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MyProjectsSection } from './components/MyProjectsSection';
import { MovieCreatorModal } from './components/MovieCreatorModal';
import { MovieDossierView } from './components/MovieDossierView';

const STORAGE_KEY = 'whisper_saved_movies_v1';

export default function App() {
  const [projects, setProjects] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge in any newly introduced sample movies that aren't already present
          const existingIds = new Set(parsed.map((m: Movie) => m.id));
          const missingSamples = SAMPLE_MOVIES.filter((s) => !existingIds.has(s.id));
          return [...parsed, ...missingSamples];
        }
      }
    } catch (e) {
      console.error('Failed to load saved projects from localStorage:', e);
    }
    return SAMPLE_MOVIES;
  });

  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to persist projects to localStorage:', e);
    }
  }, [projects]);

  const handleCreateMovie = (newMovie: Movie) => {
    setProjects((prev) => [newMovie, ...prev]);
    setActiveMovie(newMovie);
  };

  const handleUpdateMovie = (updatedMovie: Movie) => {
    setProjects((prev) =>
      prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
    );
    setActiveMovie(updatedMovie);
  };

  const handleDeleteMovie = (movieId: string) => {
    setProjects((prev) => prev.filter((m) => m.id !== movieId));
    if (activeMovie?.id === movieId) {
      setActiveMovie(null);
    }
  };

  const handleDuplicateMovie = (movie: Movie) => {
    const duplicated: Movie = {
      ...movie,
      id: `movie_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: `${movie.title} (Variant)`,
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [duplicated, ...prev]);
  };

  const handleExploreSample = (sampleId: string) => {
    const found = projects.find((p) => p.id === sampleId) || SAMPLE_MOVIES.find((p) => p.id === sampleId);
    if (found) {
      setActiveMovie(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    if (activeMovie) {
      setActiveMovie(null);
      setTimeout(() => {
        const el = document.getElementById('my-projects');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('my-projects');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInspirations = () => {
    if (activeMovie) {
      setActiveMovie(null);
    }
    setIsCreatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-200 flex flex-col font-sans selection:bg-red-900/60 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Header
        onOpenCreator={() => setIsCreatorOpen(true)}
        onNavigateHome={() => {
          setActiveMovie(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToProjects={scrollToProjects}
        onScrollToInspirations={scrollToInspirations}
        activeView={activeMovie ? 'dossier' : 'home'}
        savedCount={projects.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeMovie ? (
          <MovieDossierView
            movie={activeMovie}
            onBack={() => {
              setActiveMovie(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateMovie={handleUpdateMovie}
            onDuplicateMovie={handleDuplicateMovie}
          />
        ) : (
          <>
            {/* Landing Hero Section */}
            <HeroSection
              onOpenCreator={() => setIsCreatorOpen(true)}
              onExploreSample={handleExploreSample}
            />

            {/* My Projects Studio Archive */}
            <MyProjectsSection
              projects={projects}
              onSelectProject={(m) => {
                setActiveMovie(m);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDeleteProject={handleDeleteMovie}
              onDuplicateProject={handleDuplicateMovie}
              onOpenCreator={() => setIsCreatorOpen(true)}
            />
          </>
        )}
      </main>

      {/* Movie Creator Modal Workspace */}
      <MovieCreatorModal
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        onMovieCreated={handleCreateMovie}
      />

      {/* Quiet Cinematic Footer */}
      <footer className="border-t border-neutral-900 bg-[#060608] py-12 px-4 sm:px-6 lg:px-8 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-sm font-bold tracking-[0.25em] text-neutral-300">
              WHISPER
            </span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="font-mono text-[11px] text-neutral-500">
              AI Horror Movie Creation Studio
            </span>
          </div>

          <div className="text-center sm:text-right font-mono text-[11px] text-neutral-600">
            &ldquo;Create the horror. Control the silence.&rdquo;
          </div>
        </div>
      </footer>

    </div>
  );
}
