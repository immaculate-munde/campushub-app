import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FileTextIcon, LinkIcon, FolderIcon, PlusIcon, XIcon, GridIcon, ListIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Resources = () => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState('grid');
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    type: 'document',
    category: '',
    description: '',
    url: ''
  });
  const [filter, setFilter] = useState('');

  // Mock resources data
  const [resources, setResources] = useState([
    {
      id: '1',
      title: 'Calculus Textbook',
      type: 'document',
      category: 'Mathematics',
      description: 'Complete calculus textbook with practice problems',
      dateAdded: '2023-10-28'
    },
    {
      id: '2',
      title: 'Psychology Research Methods',
      type: 'link',
      url: 'https://example.com/psychology',
      category: 'Psychology',
      description: 'Guide to research methods in psychology',
      dateAdded: '2023-10-30'
    },
    {
      id: '3',
      title: 'History Timeline References',
      type: 'document',
      category: 'History',
      description: 'Comprehensive timeline of world history events',
      dateAdded: '2023-11-02'
    },
    {
      id: '4',
      title: 'Programming Tutorial Videos',
      type: 'link',
      url: 'https://example.com/programming',
      category: 'Computer Science',
      description: 'Collection of tutorial videos for Java programming',
      dateAdded: '2023-11-05'
    },
    {
      id: '5',
      title: 'Literature Analysis Guide',
      type: 'document',
      category: 'English',
      description: 'Guide for analyzing classic literature',
      dateAdded: '2023-11-07'
    },
    {
      id: '6',
      title: 'Chemistry Lab Notes',
      type: 'document',
      category: 'Chemistry',
      description: 'Notes and procedures for all chemistry lab experiments',
      dateAdded: '2023-11-10'
    }
  ]);

  const categories = [...new Set(resources.map((resource) => resource.category))];
  const filteredResources = resources.filter(
    (resource) => filter === '' || resource.category === filter
  );

  const handleAddResource = () => {
    if (newResource.title && newResource.category) {
      const resource = {
        ...newResource,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setResources([...resources, resource]);
      setIsAddingResource(false);
      setNewResource({
        title: '',
        type: 'document',
        category: '',
        description: '',
        url: ''
      });
    }
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileTextIcon className="h-5 w-5" />;
      case 'link':
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <FolderIcon className="h-5 w-5" />;
    }
  };

  const getResourceTypeColor = (type, isDark) => {
    switch (type) {
      case 'document':
        return isDark ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100';
      case 'link':
        return isDark ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-100';
      default:
        return isDark ? 'text-gray-400 bg-gray-700' : 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Study Resources
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 border rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${
                viewMode === 'grid'
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-gray-800'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-400'
                  : 'bg-white text-gray-500'
              }`}
              aria-label="Grid view"
            >
              <GridIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${
                viewMode === 'list'
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-gray-800'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-400'
                  : 'bg-white text-gray-500'
              }`}
              aria-label="List view"
            >
              <ListIcon className="h-5 w-5" />
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingResource(true)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Resource
          </motion.button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex flex-nowrap space-x-2 pb-2">
          <button
            onClick={() => setFilter('')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              filter === ''
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            All Resources
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                filter === category
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5 }}
                className={`p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex justify-between items-start">
                  <div className={`p-2 rounded-md ${getResourceTypeColor(resource.type, theme === 'dark')}`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <button
                    onClick={() => handleDeleteResource(resource.id)}
                    className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    aria-label="Delete resource"
                  >
                    <XIcon className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  </button>
                </div>
                <h3 className="font-semibold text-lg mt-3 mb-2">{resource.title}</h3>
                {resource.description && (
                  <p className={`text-sm mb-3 line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {resource.description}
                  </p>
                )}
                <div className="flex justify-between items-center mt-4">
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Added {resource.dateAdded}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {resource.category}
                  </span>
                </div>
                {resource.url && (
                  <div className="mt-3">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm flex items-center ${
                        theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <LinkIcon className="h-3 w-3 mr-1" />
                      Open Resource
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      {/* List View */}
      {viewMode === 'list' && (
        <div className={`rounded-lg overflow-hidden shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Resource
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date Added
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
              <AnimatePresence>
                {filteredResources.map((resource) => (
                  <motion.tr
                    key={resource.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-md mr-3 ${getResourceTypeColor(resource.type, theme === 'dark')}`}>
                          {getResourceIcon(resource.type)}
                        </div>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          {resource.description && (
                            <div className={`text-sm truncate max-w-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              {resource.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {resource.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{resource.dateAdded}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        {resource.url && (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1 rounded ${
                              theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                            }`}
                            aria-label="Open resource"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteResource(resource.id)}
                          className={`p-1 rounded ${
                            theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'
                          }`}
                          aria-label="Delete resource"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
      {/* Add Resource Modal */}
      <AnimatePresence>
        {isAddingResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsAddingResource(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`rounded-lg shadow-xl p-6 max-w-md w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Resource</h3>
                <button onClick={() => setIsAddingResource(false)}>
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    className={`w-full p-2 rounded-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Resource title"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Type
                  </label>
                  <select
                    value={newResource.type}
                    onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                    className={`w-full p-2 rounded-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="document">Document</option>
                    <option value="link">Link</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    value={newResource.category}
                    onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                    className={`w-full p-2 rounded-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="E.g. Mathematics, History, etc."
                  />
                </div>
                {newResource.type === 'link' && (
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      URL
                    </label>
                    <input
                      type="url"
                      value={newResource.url || ''}
                      onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                      className={`w-full p-2 rounded-md ${
                        theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="https://example.com"
                    />
                  </div>
                )}
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    value={newResource.description || ''}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    className={`w-full p-2 rounded-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    rows={3}
                    placeholder="Add a brief description"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddResource}
                  className={`w-full py-2 rounded-md ${
                    theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Add Resource
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resources;
