/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GLOABL_KEY: string;
  readonly VITE_VERSION: string;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
