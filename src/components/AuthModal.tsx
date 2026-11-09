import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'signup' | 'signin';
  onClose: () => void;
  onSwitchMode: (mode: 'signup' | 'signin') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSwitchMode
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setEmail('');
      setName('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-sm bg-white p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-bold text-2xl text-[#111] mb-2 tracking-tight">
          {mode === 'signup' ? 'Sign up to Paperleaf' : 'Welcome back'}
        </h3>
        <p className="text-xs text-[#777] mb-6 leading-relaxed">
          {mode === 'signup'
            ? 'Get full access to all prompts, workflows, and weekly drop updates.'
            : 'Sign in to access your saved prompts and custom parameters.'}
        </p>

        {submitted ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Success! Check your email for login link.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jamie Doe"
                  className="w-full px-3 py-2 border border-neutral-300 text-xs focus:outline-none focus:border-black"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-neutral-300 text-xs focus:outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#d9534f] hover:bg-[#c9302c] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              {mode === 'signup' ? 'Continue' : 'Sign in'}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-neutral-200 text-center text-xs text-neutral-500">
          {mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => onSwitchMode('signin')}
                className="text-[#d9534f] font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{' '}
              <button
                onClick={() => onSwitchMode('signup')}
                className="text-[#d9534f] font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
