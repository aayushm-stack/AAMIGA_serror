import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Contract for the global Account state management context.
 * Decouples user account/identity from daily sadhana task flows
 * to protect the user's cognitive budget.
 */
export interface AccountContextType {
  /** The user's preferred name or identity */
  userName: string;
  /** Action to update the user's preferred name globally and persist it */
  setUserName: (name: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const USER_NAME_STORAGE_KEY = 'brahmapath_user_name';

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserNameState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(USER_NAME_STORAGE_KEY);
      return stored !== null ? stored : 'Sadhaka';
    } catch {
      return 'Sadhaka';
    }
  });

  const setUserName = (name: string) => {
    setUserNameState(name);
    try {
      localStorage.setItem(USER_NAME_STORAGE_KEY, name);
    } catch (e) {
      console.warn('Failed to persist userName to localStorage:', e);
    }
  };

  return (
    <AccountContext.Provider value={{ userName, setUserName }}>
      {children}
    </AccountContext.Provider>
  );
};

/**
 * Custom hook to consume the global Account context.
 * Provides defensive fallback to localStorage if consumed outside of AccountProvider.
 */
export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    let fallbackName = 'Sadhaka';
    try {
      const stored = localStorage.getItem(USER_NAME_STORAGE_KEY);
      if (stored !== null) fallbackName = stored;
    } catch {
      // ignore
    }
    return {
      userName: fallbackName,
      setUserName: (name: string) => {
        try {
          localStorage.setItem(USER_NAME_STORAGE_KEY, name);
        } catch {
          // ignore
        }
      },
    };
  }
  return context;
};

export default AccountContext;
