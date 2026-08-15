-- The seed data originally hotlinked avatars straight from YouTube's CDN
-- (yt3.googleusercontent.com). Chrome refuses four of those six with
-- net::ERR_BLOCKED_BY_ORB -- the CDN varies its response for cross-origin
-- image requests, and Opaque Response Blocking drops the result. The images
-- happen to render in some browsers and silently fail in others, which is the
-- worst kind of bug to ship in a graded project.
--
-- Serving them from the app's own /public directory removes the third-party
-- dependency entirely, so the cards render for anyone who clones the repo.
-- Newly added creators can still use any absolute image URL.

update public.creators set "imageURL" = '/creators/fireship.jpg'        where name = 'Fireship';
update public.creators set "imageURL" = '/creators/mkbhd.jpg'           where name = 'Marques Brownlee';
update public.creators set "imageURL" = '/creators/pirate-software.jpg' where name = 'Pirate Software';
update public.creators set "imageURL" = '/creators/kurzgesagt.jpg'      where name = 'Kurzgesagt - In a Nutshell';
update public.creators set "imageURL" = '/creators/simone-giertz.jpg'   where name = 'Simone Giertz';
update public.creators set "imageURL" = '/creators/molly-white.jpg'     where name = 'Molly White';
