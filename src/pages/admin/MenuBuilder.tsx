import { useState } from 'react';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: 'Link' | 'Subelement';
  parentId?: string;
  order: number;
}

interface Menu {
  id: string;
  name: string;
  items: MenuItem[];
}

const MenuBuilder = () => {
  const [menus, setMenus] = useState<Menu[]>([
    {
      id: '1',
      name: 'Nav Menu',
      items: [
        { id: '1', label: 'Home', url: '/', type: 'Link', order: 1 },
        { id: '2', label: 'Courses', url: '/courses', type: 'Link', order: 2 },
        { id: '3', label: 'About Us', url: '/about', type: 'Link', order: 3 },
        { id: '4', label: 'Blog', url: '/blog', type: 'Link', order: 4 },
        { id: '5', label: 'Contact', url: '/contact', type: 'Link', order: 5 },
        { id: '6', label: 'Instructors', url: '/instructors', type: 'Link', order: 6 },
        { id: '7', label: 'More', url: '#', type: 'Link', order: 7 },
        { id: '8', label: 'Terms and Conditions', url: '/terms', type: 'Subelement', parentId: '7', order: 8 },
        { id: '9', label: 'Privacy Policy', url: '/privacy', type: 'Subelement', parentId: '7', order: 9 },
      ],
    },
  ]);

  const [selectedMenuId, setSelectedMenuId] = useState<string>('1');
  const [addLinkExpanded, setAddLinkExpanded] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [newMenuItem, setNewMenuItem] = useState({
    page: 'Custom Menu',
    url: '',
    label: '',
  });

  const selectedMenu = menus.find((m) => m.id === selectedMenuId) || menus[0];

  const handleChooseMenu = () => {
    // Menu selection logic - in a real app, this would load the selected menu
    console.log('Selected menu:', selectedMenuId);
  };

  const handleAddMenuItem = () => {
    if (!newMenuItem.label || !newMenuItem.url) {
      alert('Please fill in both Label and URL fields');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      label: newMenuItem.label,
      url: newMenuItem.url,
      type: 'Link',
      order: selectedMenu.items.length + 1,
    };

    setMenus((prev) =>
      prev.map((menu) =>
        menu.id === selectedMenuId
          ? { ...menu, items: [...menu.items, newItem] }
          : menu
      )
    );

    // Reset form
    setNewMenuItem({ page: 'Custom Menu', url: '', label: '' });
  };

  const handleSaveMenu = () => {
    console.log('Saving menu:', selectedMenu);
    alert('Menu saved successfully!');
  };

  const handleUpdateMenuName = (name: string) => {
    setMenus((prev) =>
      prev.map((menu) => (menu.id === selectedMenuId ? { ...menu, name } : menu))
    );
  };

  const toggleItemExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenus((prev) =>
        prev.map((menu) =>
          menu.id === selectedMenuId
            ? {
                ...menu,
                items: menu.items
                  .filter((item) => item.id !== itemId && item.parentId !== itemId)
                  .map((item, index) => ({ ...item, order: index + 1 })),
              }
            : menu
        )
      );
    }
  };

  const handleMoveItem = (itemId: string, direction: 'up' | 'down') => {
    setMenus((prev) =>
      prev.map((menu) => {
        if (menu.id !== selectedMenuId) return menu;

        const items = [...menu.items];
        const currentIndex = items.findIndex((item) => item.id === itemId);
        if (currentIndex === -1) return menu;

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= items.length) return menu;

        // Swap items
        [items[currentIndex], items[targetIndex]] = [items[targetIndex], items[currentIndex]];
        // Update order
        items.forEach((item, index) => {
          item.order = index + 1;
        });

        return { ...menu, items };
      })
    );
  };

  const handleMakeSubelement = (itemId: string, parentId: string) => {
    setMenus((prev) =>
      prev.map((menu) =>
        menu.id === selectedMenuId
          ? {
              ...menu,
              items: menu.items.map((item) =>
                item.id === itemId ? { ...item, type: 'Subelement' as const, parentId } : item
              ),
            }
          : menu
      )
    );
  };

  const handleMakeTopLevel = (itemId: string) => {
    setMenus((prev) =>
      prev.map((menu) =>
        menu.id === selectedMenuId
          ? {
              ...menu,
              items: menu.items.map((item) =>
                item.id === itemId ? { ...item, type: 'Link' as const, parentId: undefined } : item
              ),
            }
          : menu
      )
    );
  };

  // Organize items hierarchically
  const topLevelItems = selectedMenu.items.filter((item) => item.type === 'Link');
  const subItems = selectedMenu.items.filter((item) => item.type === 'Subelement');

  const getSubItems = (parentId: string) => {
    return subItems.filter((item) => item.parentId === parentId);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Menu Builder</h1>
      </div>

      {/* Menu Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Select the menu you want to edit:</label>
          <select
            value={selectedMenuId}
            onChange={(e) => setSelectedMenuId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleChooseMenu}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Choose
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Add Link */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <button
            onClick={() => setAddLinkExpanded(!addLinkExpanded)}
            className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900">Add Link</h2>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${addLinkExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {addLinkExpanded && (
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
                <select
                  value={newMenuItem.page}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, page: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Custom Menu">Custom Menu</option>
                  <option value="Home">Home</option>
                  <option value="Courses">Courses</option>
                  <option value="About Us">About Us</option>
                  <option value="Blog">Blog</option>
                  <option value="Contact">Contact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <input
                  type="text"
                  value={newMenuItem.url}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, url: e.target.value })}
                  placeholder="URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={newMenuItem.label}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
                  placeholder="Menu Label"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <button
                onClick={handleAddMenuItem}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add menu item
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Menu Structure */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={selectedMenu.name}
                onChange={(e) => handleUpdateMenuName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSaveMenu}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors self-end"
            >
              Save Menu
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Menu Structure</h2>
            <p className="text-sm text-gray-600 mb-4">
              Place each item in the order you prefer. Click on the arrow to the right of the item to display more
              configuration options.
            </p>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {topLevelItems
                .sort((a, b) => a.order - b.order)
                .map((item) => {
                  const itemSubItems = getSubItems(item.id);
                  const isExpanded = expandedItems.has(item.id);

                  return (
                    <div key={item.id}>
                      {/* Top Level Item */}
                      <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded">
                        <div className="flex-1 flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-900">{item.label}</span>
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">{item.type}</span>
                        </div>
                        <button
                          onClick={() => toggleItemExpanded(item.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <svg
                            className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Expanded Options */}
                      {isExpanded && (
                        <div className="ml-4 mt-2 p-3 bg-white border border-gray-200 rounded space-y-2">
                          <div className="text-sm text-gray-700">
                            <strong>Label:</strong> {item.label}
                          </div>
                          <div className="text-sm text-gray-700">
                            <strong>URL:</strong> {item.url}
                          </div>
                          {topLevelItems.filter((i) => i.id !== item.id).length > 0 && (
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Make subelement of:</label>
                              <select
                                onChange={(e) => {
                                  if (e.target.value) {
                                    handleMakeSubelement(item.id, e.target.value);
                                    e.target.value = '';
                                  }
                                }}
                                className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                                defaultValue=""
                              >
                                <option value="">Select parent...</option>
                                {topLevelItems
                                  .filter((i) => i.id !== item.id)
                                  .map((parent) => (
                                    <option key={parent.id} value={parent.id}>
                                      {parent.label}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          )}
                          <div className="flex gap-2 pt-2 flex-wrap">
                            <button
                              onClick={() => handleMoveItem(item.id, 'up')}
                              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
                            >
                              Move Up
                            </button>
                            <button
                              onClick={() => handleMoveItem(item.id, 'down')}
                              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
                            >
                              Move Down
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Sub Items */}
                      {itemSubItems.length > 0 && (
                        <div className="ml-6 mt-2 space-y-2">
                          {itemSubItems
                            .sort((a, b) => a.order - b.order)
                            .map((subItem) => {
                              const isSubExpanded = expandedItems.has(subItem.id);
                              return (
                                <div key={subItem.id}>
                                  <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded">
                                    <div className="flex-1 flex items-center gap-3">
                                      <span className="text-sm font-medium text-gray-900">{subItem.label}</span>
                                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                                        {subItem.type}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => toggleItemExpanded(subItem.id)}
                                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                                    >
                                      <svg
                                        className={`w-4 h-4 text-gray-600 transition-transform ${
                                          isSubExpanded ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </button>
                                  </div>

                                  {/* Expanded Options for Sub Item */}
                                  {isSubExpanded && (
                                    <div className="ml-4 mt-2 p-3 bg-white border border-gray-200 rounded space-y-2">
                                      <div className="text-sm text-gray-700">
                                        <strong>Label:</strong> {subItem.label}
                                      </div>
                                      <div className="text-sm text-gray-700">
                                        <strong>URL:</strong> {subItem.url}
                                      </div>
                                      <div className="flex gap-2 pt-2">
                                        <button
                                          onClick={() => handleMoveItem(subItem.id, 'up')}
                                          className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
                                        >
                                          Move Up
                                        </button>
                                        <button
                                          onClick={() => handleMoveItem(subItem.id, 'down')}
                                          className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
                                        >
                                          Move Down
                                        </button>
                                        <button
                                          onClick={() => handleMakeTopLevel(subItem.id)}
                                          className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded transition-colors"
                                        >
                                          Make Top Level
                                        </button>
                                        <button
                                          onClick={() => handleDeleteItem(subItem.id)}
                                          className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded transition-colors"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBuilder;
