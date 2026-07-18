// Live comment storage for the Used Vehicle Inventory dashboard.
// Netlify Functions v2 + Netlify Blobs (no external database needed).
//
//   GET  /.netlify/functions/comments        -> { "<key>": "<comment>", ... }
//   POST /.netlify/functions/comments         body { key, value }  (value ""/null deletes)
//        (bulk seed also supported: body { comments: {..} } merges the whole object)
//
// Comments are stored as one JSON blob "all" in the "uvi-comments" store.
// Per-key POSTs do a read-modify-write so two people editing *different*
// rows don't clobber each other (last write wins only on the same key).

import { getStore } from '@netlify/blobs';

const STORE = 'uvi-comments';
const BLOB  = 'all';

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

export default async (req) => {
  const store = getStore(STORE);

  if (req.method === 'GET') {
    const data = (await store.get(BLOB, { type: 'json' })) || {};
    return json(data);
  }

  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); }
    catch { return json({ ok: false, error: 'bad json' }, 400); }

    const data = (await store.get(BLOB, { type: 'json' })) || {};

    if (body && typeof body.comments === 'object' && body.comments) {
      // bulk merge (used once to seed the embedded defaults)
      for (const k in body.comments) {
        const v = body.comments[k];
        if (v) data[k] = v; else delete data[k];
      }
    } else if (body && typeof body.key === 'string') {
      const v = (body.value || '').trim();
      if (v) data[body.key] = v; else delete data[body.key];
    } else {
      return json({ ok: false, error: 'expected {key,value} or {comments}' }, 400);
    }

    await store.setJSON(BLOB, data);
    return json({ ok: true, count: Object.keys(data).length });
  }

  return json({ ok: false, error: 'method not allowed' }, 405);
};

export const config = { path: '/.netlify/functions/comments' };
