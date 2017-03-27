# Coding Quiz Game



## Description

* Hello, and welcome to our Quiz game! This project was designed as a fun study tool for users to test their knowledge of code in a fun
competitive environment. In the game you will be asked randomized questions with increasing levels of difficulty but a bigger reward!
you can play either by yourself or with all of your friends! The player with the highest score at the end wins!
Good Luck! 😁


## Installation

* create a new repository on GitHub

* Click on the green clone or download button located in the top right corner of this project and copy the url provided

* Open up your terminal and make a new directory where you want to have the project stored `mkdir (directory name)`

* Get into the directory you just made `cd (directory name)`

* initialize the empty repository you  made earlier `git init`

* Clone the project `git clone (paste the url copied from the clone button in the first step)`

* Go into your new repository on GitHub and copy the url provided at the top of the page

* Change the remote `git remote set-url origin (paste the new repository copied url here)`

* Check if the remote belongs to you now `git remote -v`
* You should see something like this `https://github.com/(yourUserName)/bug-free-pancake.git`

* Add the content `git add -A`

* Commit the project to GitHub `git commit -m "type in your commit message here"`
 it should usually be short and describe what you are committing for this first one though you can just type "first commit"

* Push the code to GitHub `git push origin master`

* In your terminal run `npm install` to install the dependencies needed to run the project


## Running the Server

* `sudo mongod` after entering this you will be prompted for your password
Password: (type your password here)

* Then in a new window type `npm run dev` this will start the server at localhost:3000


## How to create your own questions

* You will need to download PostMan from the app store

* Once you have PostMan downloaded open it

* At the top, left of the url bar, there is a dropdown button change it so it is Post

* then type into the url bar `localhost:3001/api/questions`

* Click on the body tab and type in the parameters:
level     : an integer 1 2 or 3
question  : the question text
answer    : choice A
correct   :  0 or 1 to say true or false 1 is true 2 is false
answer2   : choice B
correct2  : 0 or 1
answer3   : choice C
correct3  : 0 or 1
answer4   : choice D
correct4  : 0 or 1

* then click send and you now have a question made

* repeat this step to add more questions to tailor the game to your needs

![Alt text](https://github.com/TerrellLinnell/bug-free-pancake/Screen Shot 2017-03-27 at 10.48.21 AM.png)


##
