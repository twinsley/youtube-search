# youtube-search

## Design
Main search page
    search bar centered in page, options to select filters and bookmarks underneath
Results page
    move search bar to top, show video results in card. Video on left side, description on right. Should have an icon to bookmark a video, probably upper right corner of the card
Bookmarks page
    Use same video card to show bookmarked videos. Store the bookmark list in local storage.

TODO - Build video card element
TODO - Build service to call Youtube API
TODO - Build search bar element
TODO - Build 

Search & Discovery
● Keyword Search: Integrate with the YouTube Data API to fetch results.
● Sorting: Support sorting by Date, Rating, and Relevance.
● List/Grid View: Display results with:
○ Title (Link to the video on YouTube.com).
○ Thumbnail image.
○ Description.
○ Total comment count.
2. The Senior-Level Requirement: Persistence & Decoupling
● Bookmarks: Users must be able to "Save" videos to a bookmarks list.
○ Users should be able to view their list of bookmarks using the same list/grid
components as the regular search.
● Storage: Bookmarks must persist across sessions.
● Architecture: The "Search" and "Bookmarks" components should be decoupled. They
should be composed from the same base components, but should be able to run
independently of one another.


Improvements if I have time
    Convert it to use a server to proxy the API call, this would allow securing the API key and could allow for caching if desired

## Architectural Descision Log
Chose to go with TypeScript over JS mostly due to personal preference, it has some perks like strict types but nothing that would be a dealbreaker for either one on this project.

Chose to use Lit Context for managing bookmark state if needed. Events work fine for managing the search state e.g. query and sort order

Chose to use Lit Tasks with Fetch for managing API calls. Lit Tasks help with managing async requests like API requests
From the docs
Task takes care of a number of things needed to properly manage async work:

Gathers task arguments when the host updates
Runs task functions when arguments change
Tracks the task status (initial, pending, complete, or error)
Saves the last completion value or error of the task function
Triggers a host update when the task changes status
Handles race conditions, ensuring that only the latest task invocation completes the task
Renders the correct template for the current task status
Allows aborting tasks with an AbortController


The design I went with included multiple pages, which meant I needed a client side router. I chose to use Lit Labs Router for routing between the pages. Other options are available of course and perhaps would be better choices for a production app (e.g. @vaadin/router for example, although this one is now deprecated) because of the Lit Labs router being in beta still, but for this project the Lit one works fine and integrates easily since it's built by the Lit team.


Chose to use Local Storage for the bookmarks. Other options considered included IndexedDB (will convert to this if time allows, it's a slightly more complex option but superior due to being async, better at handling larger quantities of data, etc), or using a backend DB. Session storage and cookies were briefly considered and quickly dropped as options due to the limitations. (limited to the session in the case of session storage, cookies aren't suitable for data )