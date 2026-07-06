import { createElement, Suspense } from "react";
import type { ReactNode } from "react";

export const withRouteFallback = (element: ReactNode) =>
  createElement(Suspense, { fallback: null }, element);
