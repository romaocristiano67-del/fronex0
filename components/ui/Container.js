import React from 'react';

export const Container = ({ 
  children, 
  size = 'default', 
  className = '', 
  ...props 
}) => {
  const sizes = {
    small: 'max-w-4xl',
    default: 'max-w-7xl',
    large: 'max-w-full',
    full: 'max-w-full px-0',
  };
  
  const classes = `${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`;
  
  return (
    <div 
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
};

export const Section = ({ 
  children, 
  className = '', 
  id,
  ...props 
}) => {
  return (
    <section 
      id={id}
      className={`section-padding ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export const Grid = ({ 
  children, 
  cols = 3, 
  gap = 'default', 
  className = '', 
  ...props 
}) => {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  
  const gapClasses = {
    small: 'gap-4',
    default: 'gap-6',
    large: 'gap-8',
  };
  
  const classes = `grid ${colsClasses[cols]} ${gapClasses[gap]} ${className}`;
  
  return (
    <div 
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
};
