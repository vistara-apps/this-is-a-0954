import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";
import CodeEditor from "~/components/CodeEditor";

export const meta = () => {
  return [
    { title: "AnimeForge | Code Editor" },
    { name: "description", content: "Edit your Remix anime website code with our integrated editor." },
  ];
};

export const loader = async () => {
  // In a real app, we would fetch the user's projects and files from a database
  const files = [
    {
      id: 1,
      name: "app/routes/index.jsx",
      language: "jsx",
      content: `import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AnimeGrid from "~/components/AnimeGrid";

export const loader = async () => {
  const animeData = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: \`
        query {
          Page(page: 1, perPage: 12) {
            media(type: ANIME, sort: POPULARITY_DESC) {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
              }
              genres
              averageScore
            }
          }
        }
      \`
    })
  }).then(res => res.json());

  return json({ anime: animeData.data.Page.media });
};

export default function Index() {
  const { anime } = useLoaderData();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Popular Anime</h1>
      <AnimeGrid anime={anime} />
    </div>
  );
}`,
    },
    {
      id: 2,
      name: "app/components/AnimeGrid.jsx",
      language: "jsx",
      content: `import { Link } from "@remix-run/react";

export default function AnimeGrid({ anime }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {anime.map((item) => (
        <Link 
          key={item.id} 
          to={\`/anime/\${item.id}\`}
          className="bg-surface rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all"
        >
          <div className="aspect-[3/4] relative">
            <img 
              src={item.coverImage.large} 
              alt={item.title.english || item.title.romaji} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-accent/90 text-white text-xs font-bold px-2 py-1 rounded-md">
              {item.averageScore}%
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold truncate">
              {item.title.english || item.title.romaji}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1">
              {item.genres.slice(0, 3).map((genre) => (
                <span 
                  key={genre} 
                  className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full"
                >
                  {genre}
                </span>
              ))}
              {item.genres.length > 3 && (
                <span className="text-xs text-muted">+{item.genres.length - 3}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}`,
    },
    {
      id: 3,
      name: "app/routes/anime/$animeId.jsx",
      language: "jsx",
      content: `import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Star, Calendar, Clock, Tag } from "lucide-react";

export const loader = async ({ params }) => {
  const { animeId } = params;
  
  const animeData = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: \`
        query ($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
            description
            coverImage {
              large
              extraLarge
            }
            bannerImage
            genres
            averageScore
            episodes
            duration
            status
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            studios {
              nodes {
                name
              }
            }
          }
        }
      \`,
      variables: {
        id: parseInt(animeId)
      }
    })
  }).then(res => res.json());

  return json({ anime: animeData.data.Media });
};

export default function AnimeDetail() {
  const { anime } = useLoaderData();
  
  return (
    <div>
      {/* Banner */}
      <div 
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: \`url(\${anime.bannerImage || anime.coverImage.extraLarge})\` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="w-40 h-56 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={anime.coverImage.large} 
              alt={anime.title.english || anime.title.romaji} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">
              {anime.title.english || anime.title.romaji}
            </h1>
            {anime.title.native && (
              <p className="text-muted mt-1">{anime.title.native}</p>
            )}
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{anime.averageScore}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-muted" />
                <span>{anime.startDate.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-muted" />
                <span>{anime.episodes} episodes · {anime.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4 text-muted" />
                <span>{anime.status}</span>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <span 
                  key={genre} 
                  className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <div 
              className="mt-6 text-sm text-muted"
              dangerouslySetInnerHTML={{ __html: anime.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}`,
    },
  ];

  return json({ files });
};

export default function Editor() {
  const { files } = useLoaderData();
  
  return (
    <div className="min-h-screen bg-bg text-text flex">
      <Sidebar activeView="editor" />
      <main className="flex-1 ml-64">
        <CodeEditor files={files} />
      </main>
    </div>
  );
}

