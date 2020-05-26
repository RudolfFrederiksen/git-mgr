# git-mgr

#### how to use

- configure npm with github packages:
https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages

- install the package and use it
```
npm install -g @rudolffrederiksen/git-mgr --registry https://npm.pkg.github.com/rudolffrederiksen
gitmgr surycat clone ./gitprojects.yml
```


#### Manual execution
```
git clone git@github.com:RudolfFrederiksen/git-mgr.git
ce git-mgr
npm install
node cli.js surycat clone ./gitprojects.yml
```
