
Were there areas of unexpected complexity? If so, how did you handle them or how did you decide to cut scope?

- One area of unexpected complexity was that of card and deck conditionals. MTG has a lot of rules and conditions
based on decks, cards, types of cards. Adding each condition was more difficult than we expected and had unexpected
implementation issues when trying to deal with them so we kept conditionals pretty minimal. We ended up just implementing
the conditional that you could only have 4 of each card except for basic lands.


What was the most interesting part of the final project?

- Trying to get the api to work was definitely the most interesting. Other than the pokemon web application we haven't
had much experience working with other people's rest api's. At first it was somewhat daunting having a ton of different 
options when it came to the scryfall api. But figuring it out and being able to find the most effective way to fetch and 
parse the data was interesting and was also great having so many different options on how to fetch it, whether it be in the
backend, or frontend then passed to the back.


If you had more time, what do you wish you could have added to the final project?

- If we had more time we'd want to try and bring some more stats on decks and cards and interactable features to the frontend. As well as more
restrictions and conditionals. One thing we had talked about was putting the search bar for adding more cards in the selected deck page
and adding an auto complete function to the searchbar where it would look for cards that had similar names to the card you were
looking up and recommend cards. 


TO RUN: 
- Open two terminals and change directory so one is in expressJSstarter and the other is in laptopsinglepage
- Run "npm start" in both terminals

TESTING:
some card names to try: black lotus, arbor elf, hardened scales,

Basic names: mountain, plains, swamp, forest
Basics were the only card type you could have more than 4 of.
