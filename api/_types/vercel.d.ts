/**
 * Types Vercel déclarés localement pour éviter la dépendance @vercel/node
 * et ses vulnérabilités transitives (path-to-regexp).
 * Source de référence : https://vercel.com/docs/functions/runtimes/node-js
 */
declare module '@vercel/node' {
  import type { IncomingMessage, ServerResponse } from 'http';

  export interface VercelRequest extends IncomingMessage {
    query: Record<string, string | string[]>;
    cookies: Record<string, string>;
    body: unknown;
  }

  export interface VercelResponse extends ServerResponse {
    status(statusCode: number): VercelResponse;
    json(body: unknown): void;
    send(body: string | Buffer | object): void;
    redirect(url: string): void;
    redirect(statusCode: number, url: string): void;
    setHeader(name: string, value: string | string[]): this;
  }

  export type VercelApiHandler = (
    req: VercelRequest,
    res: VercelResponse
  ) => void | Promise<void>;
}
