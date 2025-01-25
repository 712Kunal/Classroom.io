import React, { useState } from 'react';

export function Accordion({ children, type = 'single', collapsible = false }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    if (collapsible && activeIndex === index) {
      setActiveIndex(null); // Collapse if the same item is clicked
    } else {
      setActiveIndex(index); // Expand the clicked item
    }
  };

  return (
    <div className="accordion">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isActive: activeIndex === index,
          onToggle: () => handleToggle(index),
        });
      })}
    </div>
  );
}

export function AccordionItem({ children, isActive, onToggle }) {
  return (
    <div className="accordion-item">
      <div
        className="accordion-trigger"
        onClick={onToggle}
        style={{ cursor: 'pointer', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}
      >
        {children[0]}
      </div>
      {isActive && <div className="accordion-content">{children[1]}</div>}
    </div>
  );
}

export function AccordionContent({ children }) {
  return <div>{children}</div>;
}
