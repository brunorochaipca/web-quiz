"use client";

import { useSyncExternalStore } from "react";

import {
  clearSession,
  loadSession,
  saveSession,
  type Session,
} from "@/lib/session";

let snapshot: Session | null | undefined;
const listeners = new Set<() => void>();

function readSession() {
  if (snapshot === undefined) {
    snapshot = loadSession();
  }
  return snapshot;
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function getSessionSnapshot() {
  return readSession();
}

export function getServerSessionSnapshot(): Session | null {
  return null;
}

export function subscribeSession(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setStoredSession(session: Session | null) {
  snapshot = session;
  if (session) {
    saveSession(session);
  } else {
    clearSession();
  }
  emit();
}

export function useStoredSession() {
  return useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );
}

export function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
