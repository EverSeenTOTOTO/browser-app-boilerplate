/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare interface Window {
  __PREFETCHED_STATE__: any
}

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
