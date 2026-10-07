import React, { useState, useMemo } from 'react';
import { Movie } from '../types/movie';
import { generateMoviePdf } from '../utils/pdfExport';
import {
  Film,
  Trash2,
  Copy,
  Download,
  ArrowUpRight,
  Clock,
  MapPin,
  Sparkles,
  AlertCircle,
  FileText,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  X,
} from 'lucide-react';

interface MyProjectsSectionProps {
  projects: Movie[];
  onSelectProject: (movie: Movie) => void;
  onDeleteProject: (movieId: string) => void;
  onDuplicateProject: (movie: Movie) => void;
  onOpenCreator: () => void;
}

type SortOption = 'newest' | 'oldest' | 'title_asc' | 'title_desc' | 'scenes_desc' | 'runtime_desc';

const STANDARD_GENRES = [
  'All',
  'Psychological Horror',
  'Supernatural Horror',
  'Creature Horror',
  'Survival Horror',
  'Sci-Fi Horror',
  'Thriller Horror',
];

export const MyProjectsSection: React.FC<MyProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
  onDuplicateProject,
  onOpenCreator,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Compute available genres dynamically based on current projects + standards
  const availableGenres = useMemo(() => {
    const projectGenres = projects.map((p) => p.genre);
    const combined = Array.from(new Set(['All', ...STANDARD_GENRES, ...projectGenres]));
    return combined;
  }, [projects]);

  // Compute genre counts
  const genreCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    availableGenres.forEach((g) => {
      if (g === 'All') return;
      counts[g] = projects.filter((p) => {
        const pGenre = p.genre.toLowerCase();
        const gLow = g.toLowerCase();
        return pGenre === gLow || pGenre.includes(gLow) || gLow.includes(pGenre);
      }).length;
    });
    return counts;
  }, [projects, availableGenres]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let result = projects.filter((p) => {
      // Search query filter
      const matchesSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.logline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.mainThreat?.name?.toLowerCase().includes(searchQuery.toLowerCase());

      // Genre filter (flexible matching for 'Supernatural' vs 'Supernatural Horror', etc.)
      const matchesGenre =
        selectedGenre === 'All' ||
        p.genre.toLowerCase() === selectedGenre.toLowerCase() ||
        p.genre.toLowerCase().includes(selectedGenre.toLowerCase()) ||
        selectedGenre.toLowerCase().includes(p.genre.toLowerCase());

      return matchesSearch && matchesGenre;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'oldest':
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        case 'scenes_desc':
          return (b.scenes?.length || 0) - (a.scenes?.length || 0);
        case 'runtime_desc': {
          const parseRuntime = (r: string) => {
            const match = r.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
          };
          return parseRuntime(b.runtime) - parseRuntime(a.runtime);
        }
        default:
          return 0;
      }
    });

    return result;
  }, [projects, searchQuery, selectedGenre, sortBy]);

  const handleExport = (e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(movie, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${movie.title.replace(/\s+/g, '_')}_WHISPER_DOSSIER.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportPdf = (e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation();
    try {
      generateMoviePdf(movie, 'full');
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  const hasActiveFilters = selectedGenre !== 'All' || Boolean(searchQuery.trim());

  const resetFilters = () => {
    setSelectedGenre('All');
    setSearchQuery('');
  };

  return (
    <section id="my-projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800/80">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
              Studio Vault
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-neutral-100">
            MY PROJECTS
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Archive of your horror screenplays, mythos rules, and cinematic scene breakdowns.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search titles, threats, lore..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-2 text-xs bg-[#121217] border border-neutral-800 focus:border-red-600 rounded text-neutral-200 placeholder-neutral-500 focus:outline-none w-full sm:w-56 transition-colors"
          />

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#121217] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="font-mono text-[11px] text-neutral-500 uppercase shrink-0">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs text-neutral-200 focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-[#121217] text-neutral-200">Newest Created</option>
              <option value="oldest" className="bg-[#121217] text-neutral-200">Oldest Created</option>
              <option value="title_asc" className="bg-[#121217] text-neutral-200">Title (A to Z)</option>
              <option value="title_desc" className="bg-[#121217] text-neutral-200">Title (Z to A)</option>
              <option value="scenes_desc" className="bg-[#121217] text-neutral-200">Most Scenes</option>
              <option value="runtime_desc" className="bg-[#121217] text-neutral-200">Longest Runtime</option>
            </select>
          </div>
        </div>
      </div>

      {/* Genre Filter Tabs Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-red-500" />
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Filter by Genre:
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-500">
              Showing {filteredAndSortedProjects.length} of {projects.length}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors font-mono"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Genre Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {availableGenres.map((genreName) => {
            const count = genreCounts[genreName] || 0;
            const isSelected = selectedGenre.toLowerCase() === genreName.toLowerCase();

            return (
              <button
                key={genreName}
                onClick={() => setSelectedGenre(genreName)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs rounded border transition-all whitespace-nowrap font-medium ${
                  isSelected
                    ? 'bg-red-950/40 border-red-700/80 text-white shadow-[0_0_12px_rgba(220,38,38,0.25)]'
                    : 'bg-[#121217] border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <span>{genreName}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-red-900/60 text-red-200'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredAndSortedProjects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-neutral-800/80 rounded-lg bg-[#0e0e14]/40">
          <Film className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
          <h3 className="font-cinzel text-lg font-bold text-neutral-300 mb-2">No Movies Found</h3>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">
            {hasActiveFilters
              ? `No movies match the genre "${selectedGenre}" or your search terms.`
              : 'Your studio archive is empty. Begin by creating your first horror feature.'}
          </p>
          <div className="flex items-center justify-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded transition-colors"
              >
                Show All Movies
              </button>
            )}
            <button
              onClick={onOpenCreator}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-700 hover:bg-red-600 rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            >
              Create {selectedGenre !== 'All' ? selectedGenre : 'A'} Movie
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSelectProject(movie)}
              className="group cursor-pointer bg-[#0e0e13] hover:bg-[#121219] border border-neutral-800/90 hover:border-red-900/80 rounded-lg p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Meta details with zero-pill unboxed typography */}
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 pb-3 border-b border-neutral-800/60 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-400 font-semibold">{movie.genre}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{movie.tone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-500">
                    <Clock className="w-3 h-3" />
                    <span>{movie.runtime}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div className="mb-4">
                  <h3 className="font-cinzel text-xl font-bold text-neutral-100 group-hover:text-red-400 transition-colors line-clamp-1 mb-1">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-red-500/90 italic font-cinzel line-clamp-1">
                    &ldquo;{movie.tagline}&rdquo;
                  </p>
                </div>

                {/* Logline */}
                <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                  {movie.logline}
                </p>

                {/* Threat teaser */}
                <div className="bg-[#09090c] border border-neutral-900 rounded p-3 text-xs mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                    Threat Encounter:
                  </span>
                  <span className="text-neutral-300 font-medium line-clamp-1">
                    {movie.mainThreat?.name || 'Unknown Entity'}
                  </span>
                  <span className="text-neutral-500 text-[11px] line-clamp-1">
                    {movie.mainThreat?.classification}
                  </span>
                </div>
              </div>

              {/* Footer card actions */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-neutral-500 font-mono text-[11px]">
                  <span>{movie.scenes?.length || 5} Scenes</span>
                  <span aria-hidden="true">·</span>
                  <span>{movie.characters?.length || 3} Characters</span>
                </div>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleExportPdf(e, movie)}
                    title="Export Full PDF Script & Dossier"
                    className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleExport(e, movie)}
                    title="Export Production Dossier JSON"
                    className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDuplicateProject(movie)}
                    title="Duplicate Project"
                    className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteProject(movie.id)}
                    title="Delete Project"
                    className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectProject(movie)}
                    className="ml-1 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors flex items-center gap-1"
                  >
                    <span>Open</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

