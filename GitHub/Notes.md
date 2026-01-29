## Git

- Git is a distributed version control system (DVCS) used to track code changes in source code during software development.

## Repository in Git 

- A Git repository (or repo) is like a file structure that stores all the files for a project. 

- It continues track changes made to these files over time, helping teams to work together evenly.

- Allows teamwork and backup. 

## Git Vs. GitHub

- `Git` is a version control system used to track changes in files over time. 

    `GitHub` is a platform where Git repositories can be stored and shared. 

- `Git` runs locally on our computer. 

    `GitHub` is cloud-based service. 

## Origin in Git 

- In Git, "origin" states to the default name offered to the remote repository from which local repository was cloned. 

- `origin` is just a nickname for the remote repository. 

- Origin is the default remote name that points to the main GitHub repository. 
 
- Rename origin: `git remote rename origin main-repo`

    `git remote -v`

## `.gitignore` file

- Tells Git which files and folders to ignore when tracking changes. 

- Used to avoid attaching unneeded files (like logs, temporary files, or compiled code) to your repository. 


## Version Control System (VCS)

- A VCC records the work of developers coordinating on projects. 

- A system that tracks changes to files over time. 

- It keeps the history of code changes, permitting developers to add new code, fix bugs and run tests securely. 

- If required, they can restore a past working version. 

**Why we need it?**

- Collaboration
- History
- Rollback
- Branching


## `git push` Vs. `git pull`

- git push: Sends local commits to remote repository 

    `git push origin main` 

    Push uploads local changes. 

- git pull: Fetches and merges remote changes into local branch. 

    `git pull origin main` 

    Pull downloads and integrates remote changes. 


**What happens when you pull with uncommited changes?**

- Merge conflict 
- OR pull fails 


## `git init` Vs `git clone`

- git init: Creates a new empty Git repository. 

    Used when starting fresh project. 

- git clone: Copies an existing repository (with history)

    Used when working on existing project 

    
## `git add`

Moves files from working directory to staging area. 

- `git add` stages changes to prepare them for commit.  

- Why staging exists? 

    Review before commit 
    Partial commits 
    Control changes 

## Upstream in Git 

- `upstream` usually points to the original/main repository. 

- Upstream is a remote that points to the original repository from which the project was forked. 

## Staging Area 

- Staging area is a temporary place to select what goes into the next commit. 

- Git has 3 areas: 

    `Working Directory -> Staging Area -> Repository`

- Edit file -> working directory 
- `git add` -> staging area
- `git commit` -> repository 

- After 

## git status 

Shows the recent status of our Git repository. 

- It tells us which files have changed, which ones are ready to be committed, and which ones are new and unobserved. 

## Git commit 

- A `commit` in Git denotes a snapshot of changes made to files in a repository. 

- Each commit has a unique messages explaining what was done. 

    This helps us track our project's history, undo changes if requisite, and work with others on the same project. 

- After commit, changes go to the local Git repository, not GitHub. 

- Commit -> local repo 
- Push -> Remote repo (GitHub)

- Commits are stored locally until they are pushed to the remote repository. 

## git checkout 

- The `git checkout` helps us switch between branches. 


## Pull Request 

- A pull request is a request to merge changes from one branch into another after review. 

- Code review, quality control, discussion

`Feature branch -> PR -> review -> merge into main`

- A pull request allows team members to review and approve code before it is merged into main branch. 

## Rebase Vs. Merge 

**git merge**

- Combines branches 
- Creates a merge commit 
- Preserves history 

    `git merge feature/login`

- safe. No history rewrite. 

- Merge preserves the complete branch history. 

**git rebase**

- Moves your commits on top of another branch. 
- Creates linear history 
- Rewrites commit history

    `git rebase main`

- Never rebase shared branches. 


## Git Stash 

Temporarily saves uncommitted changes without committing them. 

- Git stash saves unfinished work so we can switch branches safely. 

**Why needed?**

- Need to switch branch

- Pull urgent changes 

    `git stash` `git stash pop`

- Git stash is used to temporarily save work-in progress changes. 

## Git Conflicts 

Git doesn't know which change to keep. 

1. Open conflicted file 

2. Decide correct code: 

    Keep local
    Keep incoming 
    Combine both 

3. Remove conflict markers

4. Add & commit 

**How to AVOID Merge Conflicts**

- Pull before starting work 
- Commit small changes 
- Work on feature branches 
- Avoid editing same files 
- Communicate with team

- It permits multiple developers to work on a project together without interrupting each other's changes. 

- GitHub is a cloud platform that hosts Git repositories and enables collaboration. 

- Repository: Codebase 
- Commit: Snapshot of changes
- Branch: Indepedent line of development 


## "History is preserved" - what does that actually mean? 

It means: 

- Git never loses commits 
- Every commit is saved with: 

    Who made it
    When it was made 
    What changed 

- Even if: a file is deleted, a line is changed and a branch is removed 


## git fetch Vs. git pull 

**git fetch**

- Downloads latest changes from remote.

- Does not change your working code. 

- Does not auto-merge 

    `git fetch branch`

- Safely check what others have pushed.

- Review changes before merging. 

**git pull**

- Fetches changes 

- Immediately merges into your main branch. 

    `git pull = git fetch + git merge`

- Can cause merge conflicts directly


## git rebase 


## Delete remote Git branch 

1. Delete remote branch: `git push origin ---delete feature-branch`

2. Delete local branch: `git branch -d feature-branch`