# youtube-search

## What is this?
This is a project providing a standalone UI for searching Youtube, using [Lit.dev](https://lit.dev) to build it and the Youtube Data API to provide data.

### Requirements

**Search**
  - Searching by keyword
  - Sorting by date, rating, relevance

**Results**
  - List view
  - Title that links to the video
  - Thumbnail
  - Description
  - Comment count

## Local Setup

**Download**
```
git clone https://github.com/twinsley/youtube-search.git
cd youtube-search
```

**Install Dependencies**
```
npm install
```

**Setup env vars:**
Copy the .env.sample file and rename to .env.

For the `VITE_YOUTUBE_API_KEY` you will need to follow the instructions [here](https://developers.google.com/youtube/v3/getting-started#before-you-start) to create a new API key. 

_NOTE: It's highly recommended that the API permisions be restricted to YouTube, and only the minimum of public IPs or domains be allowed for security._

**Start the app**
```
npm run dev
```

## Possible future improvements
There's a couple things I'd like to improve on this project had I had the time (or maybe going forward)

Change it to use a server to proxy the API call - Best practice for third party APIs is generally to proxy the calls through a backend server rather than handing out API keys to the clients. This would allow protecting that key and preventing it from being abused by anyone who looks at DevTools.

Rework the bookmark functionality to use a backend server and DB rather than the Local Storage. This would avoid the potential pitfalls of local storage (IndexedDB is better here, but still has some of the same pitfalls), like data being potentially cleared without the user intending it to.

Maybe use a video-list component instead of using video-card in a map function on multiple pages (result and bookmark) to simplify the components a bit further.


## Architectural Decision Log
Chose to go with TypeScript over JS mostly due to personal preference. Either would have worked, but TS has some perks like static types that make it a bit nicer to use in my opinion.

Used a combination of Events and Lit Context for managing state. Events work well and are simple for handling search events, but adding in Lit Context simplifies handling bookmark data.