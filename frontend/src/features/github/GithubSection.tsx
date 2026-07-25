import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/card';
import { GitBranch, Star, Activity, GitFork, Users, Code, Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { profile } from '@/data/profile';

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  updated_at: string;
  html_url: string;
}

const fetchGitHubUser = async () => {
  const res = await fetch(`https://api.github.com/users/${profile.github}`);
  if (!res.ok) throw new Error('Failed to fetch user data');
  return res.json() as Promise<GitHubUser>;
};

const fetchGitHubRepos = async () => {
  const res = await fetch(`https://api.github.com/users/${profile.github}/repos?per_page=100&sort=updated`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json() as Promise<GitHubRepo[]>;
};

export function GithubSection() {
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useQuery({
    queryKey: ['githubUser', profile.github],
    queryFn: fetchGitHubUser,
    staleTime: 1000 * 60 * 60,
  });

  const { data: repos, isLoading: isLoadingRepos, isError: isErrorRepos } = useQuery({
    queryKey: ['githubRepos', profile.github],
    queryFn: fetchGitHubRepos,
    staleTime: 1000 * 60 * 60,
  });

  const isLoading = isLoadingUser || isLoadingRepos;
  const isError = isErrorUser || isErrorRepos;

  const starsEarned = repos?.reduce((acc, repo) => acc + repo.stargazers_count, 0) || 0;
  const totalForks = repos?.reduce((acc, repo) => acc + repo.forks_count, 0) || 0;
  const totalWatchers = repos?.reduce((acc, repo) => acc + repo.watchers_count, 0) || 0;

  const calculateScore = () => {
    if (!user || !repos) return '-';
    let score = 0;
    score += user.public_repos * 2;
    score += starsEarned * 10;
    score += user.followers * 5;
    
    if (score > 1000) return 'A+';
    if (score > 500) return 'A';
    if (score > 200) return 'B+';
    if (score > 100) return 'B';
    return 'C';
  };

  const stats = [
    { label: 'Public Repos', value: user?.public_repos || 0, icon: <GitBranch className="h-4 w-4" /> },
    { label: 'Stars Earned', value: starsEarned, icon: <Star className="h-4 w-4 text-yellow-500" /> },
    { label: 'Total Forks', value: totalForks, icon: <GitFork className="h-4 w-4 text-orange-500" /> },
    { label: 'Watchers', value: totalWatchers, icon: <Eye className="h-4 w-4 text-blue-400" /> },
    { label: 'Followers', value: user?.followers || 0, icon: <Users className="h-4 w-4 text-indigo-400" /> },
    { label: 'Activity Score', value: calculateScore(), icon: <Activity className="h-4 w-4 text-green-500" /> },
  ];

  return (
    <SectionContainer id="github" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading
          title="Open Source"
          subtitle="GitHub contributions, statistics, and public repositories."
        />

        {isError ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-destructive/10 rounded-xl border border-destructive/20">
            <Activity className="h-8 w-8 text-destructive mb-4" />
            <h3 className="text-lg font-bold text-destructive">Failed to load GitHub data</h3>
            <p className="text-sm text-destructive/80 mt-2">Please try again later or check API limits.</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col gap-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-24 w-full rounded-xl bg-muted/50 animate-pulse border border-border/50" />
                  ))
                : stats.map((stat, i) => (
                    <motion.div key={i} variants={slideUpStagger} className="h-full">
                      <Card className="h-full bg-background/50 border-border/50 shadow-sm p-4 flex flex-col justify-center gap-3 hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-2 text-muted-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                          {stat.icon} <span className="truncate">{stat.label}</span>
                        </div>
                        <span className="text-2xl sm:text-3xl font-bold font-heading">
                          {stat.value}
                        </span>
                      </Card>
                    </motion.div>
                  ))}
            </div>



            {/* Latest Repositories */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-heading font-bold flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" /> Latest Repositories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-32 w-full rounded-xl bg-muted/50 animate-pulse border border-border/50" />
                    ))
                  : repos?.slice(0, 6).map((repo) => (
                      <motion.a
                        variants={slideUpStagger}
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <Card className="h-full p-5 bg-background/50 border-border/50 hover:border-primary/50 transition-colors flex flex-col gap-3 shadow-sm group-hover:shadow-md">
                          <h4 className="font-heading font-bold text-base group-hover:text-primary transition-colors truncate">
                            {repo.name}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
                            {repo.description || 'No description provided.'}
                          </p>
                          <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground mt-2">
                            {repo.language && (
                              <span className="flex items-center gap-1">
                                <Code className="h-3 w-3" /> {repo.language}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3" /> {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="h-3 w-3" /> {repo.forks_count}
                            </span>
                          </div>
                        </Card>
                      </motion.a>
                    ))}
              </div>
            </div>

          </motion.div>
        )}
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
