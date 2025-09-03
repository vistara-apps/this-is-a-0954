import { useState } from "react";
import { 
  File, 
  FolderTree, 
  Save, 
  Play, 
  Download, 
  Share2, 
  Settings as SettingsIcon,
  ChevronRight,
  ChevronDown
} from "lucide-react";

const CodeEditor = ({ files }) => {
  const [activeFileId, setActiveFileId] = useState(files[0]?.id);
  const [expandedFolders, setExpandedFolders] = useState({
    "app": true,
    "app/routes": true,
    "app/components": true
  });
  
  const activeFile = files.find(file => file.id === activeFileId);
  
  // Group files by folder
  const fileTree = files.reduce((acc, file) => {
    const parts = file.name.split('/');
    let current = acc;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    
    const fileName = parts[parts.length - 1];
    current[fileName] = file;
    
    return acc;
  }, {});
  
  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };
  
  const renderFileTree = (tree, path = "") => {
    return Object.entries(tree).map(([key, value]) => {
      const currentPath = path ? `${path}/${key}` : key;
      
      // Check if it's a file or folder
      if (value.id) {
        // It's a file
        return (
          <div 
            key={value.id}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer ${
              activeFileId === value.id ? 'bg-primary/20 text-primary' : 'hover:bg-surface'
            }`}
            onClick={() => setActiveFileId(value.id)}
          >
            <File className="w-4 h-4" />
            <span className="truncate">{key}</span>
          </div>
        );
      } else {
        // It's a folder
        const isExpanded = expandedFolders[currentPath];
        
        return (
          <div key={currentPath}>
            <div 
              className="flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer hover:bg-surface"
              onClick={() => toggleFolder(currentPath)}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <FolderTree className="w-4 h-4" />
              <span>{key}</span>
            </div>
            
            {isExpanded && (
              <div className="pl-4">
                {renderFileTree(value, currentPath)}
              </div>
            )}
          </div>
        );
      }
    });
  };
  
  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="bg-surface border-b border-border p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-bg rounded-md transition-colors">
            <Save className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-bg rounded-md transition-colors">
            <Play className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-bg rounded-md transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-bg rounded-md transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <button className="p-1.5 hover:bg-bg rounded-md transition-colors">
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <div className="w-64 bg-surface border-r border-border overflow-y-auto">
          <div className="p-3 border-b border-border">
            <h3 className="font-semibold">Files</h3>
          </div>
          <div className="py-2">
            {renderFileTree(fileTree)}
          </div>
        </div>
        
        {/* Editor */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="bg-surface border-b border-border flex">
            {activeFile && (
              <div className="px-4 py-2 text-sm border-r border-border bg-bg">
                {activeFile.name.split('/').pop()}
              </div>
            )}
          </div>
          
          {/* Code Area */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm">
            {activeFile ? (
              <pre className="whitespace-pre-wrap">{activeFile.content}</pre>
            ) : (
              <div className="h-full flex items-center justify-center text-muted">
                Select a file to edit
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

