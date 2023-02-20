/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GCLIENT_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
