"use client";

import { createContext, useContext } from 'react';

type ObserverFunction = (element: HTMLElement | null) => void;

const ObserverContext = createContext<ObserverFunction>(() => {});

export const useObserver = () => {
  return useContext(ObserverContext);
};

export const ObserverProvider = ObserverContext.Provider;