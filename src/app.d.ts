// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    user: import('$lib/schema/user').User | undefined;
  }
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
  namespace Superforms {
    type Message = {
      status: 'error' | 'success' | 'warning';
      text: string | null | undefined;
      data: undefined | null | unknown;
    };
  }
}
