---
title: Eclipse Contributor Requirements
short_title: Eclipse Contributors
description: IP/Copyright requirements for Eclipse Foundation Projects
layout: default
---

# IP Requirements: Contributing to Eclipse Deeplearning4j, ND4J and Other Projects

This page explains steps required to contribute code to the projects in the eclipse/deeplearning4j GitHub repository: https://github.com/eclipse/deeplearning4j


Contributors (anyone who wants to commit code to the repository) need to do two things, before their code can be merged to the repository:

1. Sign the Eclipse Contributor Agreement (once)
2. Sign the commits (each time)

## Why Is This Required?

These two requirements must be satisfied for all Eclipse Foundation projects, not just DL4J and ND4J. A full list of Eclipse Foundation Projects can be found here: [https://projects.eclipse.org/](https://projects.eclipse.org/)

By signing the ECA, you are essentially asserting that the code you are submitting is something that either you wrote, or that you have the right to contribute to the project. This is a necessary legal protection to avoid copyright issues.

By signing your commits, you are asserting that the code in that particular commit is your own.


## Signing the Eclipse Contributor Agreement

You only need to sign the Eclipse Contributor Agreement (ECA) once.
Here's the process:

**Step 1: Sign up for an Eclipse account**

This can be done at [https://accounts.eclipse.org/user/register](https://accounts.eclipse.org/user/register)

*Note:* You must use register using the same as your GitHub account (the GitHub account you want to submit pull requests from).

**Step 2: Sign the ECA**

Go to [https://accounts.eclipse.org/user/eca](https://accounts.eclipse.org/user/eca) and follow the instructions.



## Signing Your Commits

### Signing a New Commit

There are a few ways to sign commits. Note that you can use any of these aoptions.

**Option 1: Use `-s` When Committing on Command Line**

Signing commits here is simple:
```
git commit -s -m "My signed commit"
```
Note the use of `-s` (lower case s) - upper-case S (i.e., `-S`) is for GPG signing (see below).


**Option 2: Set up Bash Alias (or Windows cmd Alias) for Automated Signing**

For example, you could set up the following alias in Bash:
```
alias gcm='git commit -s -m'
```

Then committing would be done with the following:
```
gcm "My Commit"
```

For Windows command line, similar options are available through a few mechanisms (see [here](https://stackoverflow.com/questions/20530996/aliases-in-windows-command-prompt))

One simple way is to create a `gcm.bat` file with the following contents, and add it to your system path:
```
@echo off
echo.
git commit -s -m %*
```
You can then commit using the same process as above (i.e., `gcm "My Commit"`)



**Option 3: Use GPG Signing**

For details on GPG signing, see [this link](https://harryrschwartz.com/2014/11/01/automatically-signing-your-git-commits)

Note that this option can be combined with aliases (above), as in `alias gcm='git commit -S -m'` - note the upper case `-S` for GPG signing.


**Option 4: Commit using IntelliJ with Auto Signing**

IntelliJ can be used to perform git commits, including through signed commits. See [this page](https://www.jetbrains.com/help/idea/commit-and-push-changes.html?section=Windows%20or%20Linux) for details.


### Checking If A Commit Is Signed

After performing a commit, you can check in a few different ways.
One way is to use `git log --show-signature -1` to show the signature for the last commit (use -5 to show the last 5 commits, for example)

The output will look like:
```
$ git log --show-signature -2
commit 81681455918371e29da1490d3f0ca3deecaf0490 (HEAD -> commit_test_branch)
Author: YourName <you@email.com>
Date:   Fri Jun 21 22:27:50 2019 +1000

    This commit is unsigned

commit 2349c6aa3497bd65866d7d0a18fe82bb691bb868
Author: YourName <you@email.com>
Date:   Fri Jun 21 21:42:38 2019 +1000

    My signed commit

    Signed-off-by: YourName <you@email.com>
```

The top commit is unsigned, and the bottom commit is signed (note the presence of the `Signed-off-by`).


### If You Forget to Sign a Commit - Ammending Last Commit

If you forgot to sign the last commit, you can use the following command:

```
git commit --amend --signoff
```

### If You Forget to Sign Multiple Commits

Suppose your branch has 3 new commits, all of which are unsigned:

```
$ git log -4 --oneline
4b164026 (HEAD -> commit_test_branch) Your new commit 3
d7799615 Your new commit 2
6bb6113a Your new commit 1
ef09606c This commit already exists
```

One simple way is to squash and sign these commits. To do this for the last 3 commits, use the following: (note you might want to make a backup first)
```
git reset --soft HEAD~3
git commit -s -m "Squashed and signed"
```

The result:
```
$ git log -2 --oneline
31658e11 (HEAD -> commit_test_branch) Squashed and signed                   ef09606c This commit already exists
```

You can confirm that the commit is signed using `git log -1 --show-signature` as shown earlier.

Note that your commits will be squashed once they are merged to master anyway, so the loss of the commit history does not matter.
