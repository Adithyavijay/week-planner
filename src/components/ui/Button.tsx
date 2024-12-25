export function Button({
    children,
    disabled,
    type = 'button',
    onClick,
    className = ''
  }: {
    children: React.ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit';
    onClick?: () => void;
    className?: string;
  }) {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${disabled 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'}
          ${className}`}
      >
        {children}
      </button>
    );
  } 