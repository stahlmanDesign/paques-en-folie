#Pâques en folie

Video game for Easter


# Ideas

- You are the Easter Bunny. Kids chase you. You drop eggs and try to distribute them equally, but kids are greedy.

- update 16 mars: you are the easter bunny. Kids chase you unless you drop eggs. But distribute them equally to get a better score.

- Inspiration comes from an egg hunt in Laval, QC which turned into chaos cause 10,000 people showed up instead of the expected hundreds
https://www.youtube.com/watch?v=TRPB49Z7VAI

#The game engine

- uses ImpactJS game engine (you must provide the engine which requires a license) but all other source code is here



#Setup
- requires the ImpactJS game engine impactjs.com
- Install the impact-node server by typing ```npm install -g impact-node``` and then type ```impact-node serve``` and go to http://localhost:3000
- Does not require ```impact-node``` but is set up for it and is missing some of Impact's tools for building using bake script.
- Dev code changes are seen in localhost:3000. To build, type ```impact-node build```</li>

### Common mistake with impact-node

To create a new project, the command `create:project` is not the name of your project, it is the command:

**ERROR `create:mygame`**

**CORRECT `create:project`**

</ul>

# Blog
- http://blog.stahlmandesign.com/


#Author

- Justin Stahlman
- @stahlmandesign on github
- @jstahlman on bitbucket