Hi ! this is an example of a inventory system, to demonstrate Coherent Gameface skills, made by Tom Franklin.

This project was made in Preact. NPM was used as the chosen package manager, you will need to install npm and node on your machine to run locally.

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
https://nodejs.org/en

Vite was used to run the preact website (this is the suggested package for running preact websites via preact's guide: https://preactjs.com/guide/v10/getting-started/). This will install itself when you run npm install.

To run the project:
- make sure node / npm is installed. I am using node v16.19.1, npm v8.19.3
- run "npm i" inside the root
- run "npm start" inside the root, i recommend using vscode terminal
- if this does not work please contact me 

I have created the UI in Preact, to emulate how it would be in Coherent Gameface. I have also tried to write all the code and styling to the rules of Coherent as close as possible. 
This is why the UI does not scale to the browser, I have used rem everywhere to simulate the idea of scaling via the root font-size, a concept which coherent uses:
https://docs.coherent-labs.com/unity-gameface/content_development/scalableui/

The inventory objects use a enum system for defining what item goes where, and each button stores information on its current item based on what is passed from the data controller (InventoryData class).

The buttons all listen to an observer inside the InventoryData class, this class is responsible for the storage and mutation of the actual inventory data. I chose to do this over storing it inside the preact state of the parent component, as this prevents unnecessary redraws of the buttons (which are drawn via a for loop of the inventorydata's grid size). 

I do not own the art assets used in this example, I did not create them. They were given to me freely for a previous technical test.

Have fun! and please do not hesitate to email with any questions.
