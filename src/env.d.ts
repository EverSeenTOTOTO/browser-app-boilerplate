/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

declare interface Window {
  __PREFETCHED_STATE__: any
}

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
