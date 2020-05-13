import { listenAndServe } from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts';
import { chat } from './chat.ts';


// TODO try to add Reno router instead of this stuff
listenAndServe({ port: 3000 }, async (req) => {
  if (req.method === "GET" && req.url === "/") {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.open("./index.html"),
    });
  }

  if (req.method === "GET" && req.url === "/chat") {
    if (acceptable(req)) {
      acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers
      }).then(chat);
    }
  }
});

console.log("Server running on PORT: 3000!")
