import React, { useState } from 'react';
import { Play, Save, Download, RefreshCw, Terminal, FileText } from 'lucide-react';

const CodeEditor = () => {
  const [activeFile, setActiveFile] = useState('app/root.tsx');
  const [code, setCode] = useState(`import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/styles/app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}`);

  const files = [
    { name: 'app/root.tsx', type: 'tsx' },
    { name: 'app/routes/_index.tsx', type: 'tsx' },
    { name: 'app/routes/anime.$id.tsx', type: 'tsx' },
    { name: 'app/components/AnimeCard.tsx', type: 'tsx' },
    { name: 'app/styles/app.css', type: 'css' },
    { name: 'package.json', type: 'json' },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Code Editor</h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm">
              <Play className="w-3 h-3" />
              Run
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-bg border border-border rounded-md hover:bg-border/20 transition-colors text-sm">
              <Save className="w-3 h-3" />
              Save
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-bg border border-border rounded-md hover:bg-border/20 transition-colors text-sm">
              <Download className="w-3 h-3" />
              Export
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">Auto-save enabled</span>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* File Explorer */}
        <div className="w-64 bg-surface border-r border-border">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-medium">Files</h3>
          </div>
          <div className="p-2">
            {files.map((file) => (
              <button
                key={file.name}
                onClick={() => setActiveFile(file.name)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm text-left hover:bg-border/20 transition-colors ${
                  activeFile === file.name ? 'bg-primary/20 text-primary' : 'text-muted'
                }`}
              >
                <FileText className="w-3 h-3" />
                {file.name}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {/* Editor Tabs */}
          <div className="flex items-center bg-bg border-b border-border">
            <div className="px-4 py-2 bg-surface border-r border-border text-sm">
              {activeFile}
            </div>
          </div>

          {/* Code Area */}
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-bg text-text font-mono text-sm resize-none border-none outline-none"
              placeholder="Start coding your anime website..."
              spellCheck={false}
            />
            
            {/* Line numbers would go here in a real editor */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-surface border-r border-border flex flex-col text-xs text-muted">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="px-2 py-0.5 text-right">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="w-80 bg-bg border-l border-border flex flex-col">
          <div className="p-3 border-b border-border flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <h3 className="text-sm font-medium">Terminal</h3>
            <button className="ml-auto p-1 hover:bg-surface rounded">
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1 p-4 font-mono text-sm space-y-2">
            <div className="text-green-400">$ npm run dev</div>
            <div className="text-muted">
              > animeforge@1.0.0 dev<br/>
              > remix dev
            </div>
            <div className="text-blue-400">
              💿 Building...<br/>
              💿 Built in 127ms<br/>
              🎉 App started at http://localhost:3000
            </div>
            <div className="text-muted">
              Watching for changes...
            </div>
            <div className="flex items-center">
              <span className="text-primary">$</span>
              <input 
                type="text" 
                className="flex-1 ml-2 bg-transparent border-none outline-none text-text"
                placeholder="Type a command..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;