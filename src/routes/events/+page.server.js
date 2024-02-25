//@ts-nocheck
import { api } from '../../lib/api';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  const data = await api.GET('events/');
  return {
    data
  }
}