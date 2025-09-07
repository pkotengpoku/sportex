import React, { useState, useRef, useEffect } from 'react';

const SubHeader = () => {
  const menuItems = [
    { title: 'Acquatici', links: ['Surf', 'Kayak', 'SUP', 'Windsurf', 'Kitesurf'] },
    { title: 'Invernali', links: ['Sci', 'Snowboard', 'Pattinaggio', 'Ciaspole', 'Motoslitta'] },
    { title: 'Terra', links: ['Golf', 'Bowling', 'Tennis', 'Pickleball'] },
    { title: 'Avventura', links: ['Arrampicata', 'Trekking', 'Camping', 'Rafting'] },
    { title: 'Squadra', links: ['Calcio', 'Basket', 'Pallavolo', 'Football'] },
    { title: 'Ciclismo', links: ['Bici da corsa', 'Mountain Bike', 'E-bike'] }
  ];

  const [hoveredItem, setHoveredItem] = useState(null);
  const [submenuTop, setSubmenuTop] = useState(0);
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const timeoutRef = useRef(null);
  const headerRef = useRef(null);

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (headerRef.current) {
      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      setSubmenuTop(headerBottom);
    }
    
    setHoveredItem(index);
    setIsSubmenuVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsSubmenuVisible(false);
      setHoveredItem(null);
    }, 300); // 300ms delay before closing
  };

  const handleSubmenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleSubmenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsSubmenuVisible(false);
      setHoveredItem(null);
    }, 300);
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">

        
        {/* Navigation Component */}
        <div 
          ref={headerRef}
          className="subheader-container w-fullrounded-lg shadow-b-md"
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto flex justify-between text-lg py-1 relative">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative cursor-pointer px-6 py-1"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <span className="font-semibold text-gray-800">{item.title}</span>
              </div>
            ))}
          </div>
          
          {/* Full-width Submenu */}
          {isSubmenuVisible && hoveredItem !== null && (
            <div 
              className="fixed left-0 w-full bg-gray-100 z-20 transition-all duration-300"
              style={{ top: `${submenuTop}px` }}
              onMouseEnter={handleSubmenuEnter}
              onMouseLeave={handleSubmenuLeave}
            >
              <div className="max-w-7xl mx-auto flex flex-wrap px-4 py-4 gap-4">
                {menuItems[hoveredItem].links.map((link, i) => (
                  <a
                    key={i}
                    href="#"
                    className="px-4 py-2 hover:bg-amber-400 rounded transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SubHeader;