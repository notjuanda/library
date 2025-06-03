import { createContext } from 'react';
import type { IAuthContext } from '../types/auth.types';

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
