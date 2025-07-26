import React from 'react';

interface SwitchProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ 
  defaultChecked, 
  checked, 
  onCheckedChange, 
  className = '' 
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  
  const isControlled = checked !== undefined;
  const currentValue = isControlled ? checked : internalChecked;
  
  const handleClick = () => {
    const newValue = !currentValue;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onCheckedChange?.(newValue);
  };
  
  return (
    <div 
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
        currentValue ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-white/20'
      } ${className}`}
      onClick={handleClick}
    >
      <span className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
        currentValue ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </div>
  );
}; 