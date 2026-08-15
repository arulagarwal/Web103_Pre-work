-- Six starter creators across YouTube, Twitch, and Mastodon.
-- Six rather than the required five, so deleting one during the walkthrough
-- recording still leaves five on screen.
--
-- Note the quoted "imageURL" -- see the create_creators_table migration.

insert into public.creators (name, url, description, "imageURL") values
  (
    'Fireship',
    'https://www.youtube.com/@Fireship',
    'Web development explained at absurd speed. The "in 100 seconds" series is the fastest way to figure out whether a new framework is worth your afternoon.',
    'https://yt3.googleusercontent.com/3fPNbkf_xPyCleq77ZhcxyeorY97NtMHVNUbaAON_RBDH9ydL4hJkjxC8x_4mpuopkB8oI7Ct6Y=s900-c-k-c0x00ffffff-no-rj'
  ),
  (
    'Marques Brownlee',
    'https://www.youtube.com/@mkbhd',
    'MKBHD reviews consumer tech with unusually good production and an even better bar for honesty. Long-form phone, EV, and laptop reviews.',
    'https://yt3.googleusercontent.com/qu4TmIaYUlS41-dJ9gZ7DUR3nilvmB5_11i6OKSdvNnBNiyOusZP1bMN6ICnuxtjFBb6ioKgRQ=s900-c-k-c0x00ffffff-no-rj'
  ),
  (
    'Pirate Software',
    'https://www.twitch.tv/piratesoftware',
    'Thor builds games live, having previously worked in games and security. Equal parts game dev tutorial and blunt career advice for the industry.',
    'https://static-cdn.jtvnw.net/jtv_user_pictures/9a1edcb1-7d62-48ab-b071-1ef64ab0f629-profile_image-300x300.png'
  ),
  (
    'Kurzgesagt - In a Nutshell',
    'https://www.youtube.com/@kurzgesagt',
    'Gorgeously animated explainers on science and philosophy, from immune systems to the heat death of the universe. Every video is meticulously sourced.',
    'https://yt3.googleusercontent.com/ytc/AIdro_n1Ribd7LwdP_qKtqWL3ZDfIgv9M1d6g78VwpHGXVR2Ir4=s900-c-k-c0x00ffffff-no-rj'
  ),
  (
    'Simone Giertz',
    'https://www.youtube.com/@simonegiertz',
    'The self-described queen of useless robots, now building genuinely clever things. Proof that the best way to learn to make stuff is to make bad stuff first.',
    'https://yt3.googleusercontent.com/ytc/AIdro_llfi-8d2Zve1U9FXZPXZsKNB9_65U5gHwKRwAoHLOUDg=s900-c-k-c0x00ffffff-no-rj'
  ),
  (
    'Molly White',
    'https://hachyderm.io/@molly0xfff',
    'Researcher and critic covering cryptocurrency and the tech industry, best known for Web3 is Going Just Great. Rigorous, receipts-first writing.',
    'https://media.hachyderm.io/accounts/avatars/109/332/059/958/892/971/original/fd426ab1db47d795.jpeg'
  );
