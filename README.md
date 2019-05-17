# Last Chance to Commit

LastChancetoCommit deletes your uncommitted code every hour (runs a `git reset --hard`). Why? It motivates you to adopt better coding habits.

We all know that frequent commits and breaking down problems into small chunks is good. Yet somehow, things never work out that way. Who among us has not spent a weekend banging our head against a bug and in the process accumulated a ton of edited files and messy comments and scattered console.logs only to eventually solve that bug and spend another day just cleaning up those edits. LCTC forces you to adopt better habits or your code just goes away.

You can use it to help with following;

- increasing your commit frequency
- starting from scratch on hard problems
- forcing yourself to break down problems into smaller chunks
- deleting code you didn't really need but would never let go of

## Installation/Usage

You will need to run this in a project that has git and you will need node installed. You can install and run with good old npx:

```sh
$ npx last-chance-to-commit
```

If you want to change the frequency of git resets you can pass that as an argument:

```sh
# frequency is in minutes
# the following will run git reset --hard every 2 hours
$ last-chance-to-commit --frequency 120  
```

## Is this useless?

It is mostly useless :)

## License

Licensed under ISC because npm does that by default and I'm lazy. © K-2052

