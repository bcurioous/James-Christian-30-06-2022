import React, { createContext, ReactNode, useContext } from "react";
import { toJS } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { RootStore, RootStoreHydration } from "../stores/RootStore";

enableStaticRendering(typeof window === "undefined");

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);
StoreContext.displayName = "StoreContext";

function initializeStore(initialData?: RootStoreHydration): RootStore {
  const _store = store ?? new RootStore();

  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useRootStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }

  return context;
}

export function useWeatherStore() {
  const { weatherStore } = useRootStore();
  return weatherStore;
}

export function useFavouriteStore() {
  const { favouriteStore } = useRootStore();
  return favouriteStore;
}

export function RootStoreProvider({
  children,
  hydrationData,
}: {
  children: ReactNode;
  hydrationData?: RootStoreHydration;
}) {
  const store = initializeStore(hydrationData);

  console.log('store :>> ', toJS(store));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}