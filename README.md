# File System Commands — `peek.js`

A collection of Node.js file system command-line utilities developed for the IT 207 AI Workshop, featuring `peek.js`, a tool designed to preview large files cleanly in the terminal.

---

## Section 1 — Command Description

### What It Does
`peek.js` is a command-line utility that inspects a text file and displays the first $N$ lines (head) and the last $N$ lines (tail), skipping the middle lines and replacing them with an omission indicator (`...`).

If the total number of lines in the file is less than or equal to $2 \times N$, the utility recognizes that there is no middle content to skip and prints the entire file directly without the separator.

### What Commands It Combines
`peek.js` combines the behavior of two classic UNIX command-line utilities:
* **`head`**: Extracts and outputs the beginning of a file.
* **`tail`**: Extracts and outputs the end of a file.

By merging both into one tool, it allows developers to quickly inspect file schemas, headers, and terminal entries simultaneously without dumping hundreds of unneeded lines to stdout.

### How to Run It

```bash
node peek.js <file> [n]
```

* `<file>`: The path to the file you want to inspect (required).
* `[n]`: The number of lines to preview from both the start and end of the file (optional; defaults to `3` if omitted).

---

### Command Examples & Output

#### Example 1: Default Preview ($N = 3$)
Running without an $N$ argument defaults to showing the first 3 and last 3 lines:
```bash
$ node peek.js sample.txt
apple
banana
cherry
...
kiwi
lemon
mango
```

#### Example 2: Custom Window Size ($N = 5$)
Previewing 5 lines from the top and bottom:
```bash
$ node peek.js sample.txt 5
apple
banana
cherry
date
elderberry
...
grape
honeydew
kiwi
lemon
mango
```

#### Example 3: Boundary Condition ($\text{Lines} \le 2 \times N$)
When testing a 6-line file (`boundary.txt`) with $N = 3$, $6 \le 2 \times 3$ is true, so the entire file is printed without `...`:
```bash
$ node peek.js boundary.txt 3
line 1
line 2
line 3
line 4
line 5
line 6
```

#### Example 4: Large Window Size ($N = 10$)
Because `sample.txt` has 11 lines and $11 \le 2 \times 10$, all lines are printed without a separator:
```bash
$ node peek.js sample.txt 10
apple
banana
cherry
date
elderberry
fig
grape
honeydew
kiwi
lemon
mango
```

#### Example 5: Zero Lines Edge Case ($N = 0$)
Passing `0` prints no head/tail lines, displaying only the omission indicator:
```bash
$ node peek.js sample.txt 0
...
```

#### Example 6: Missing File Argument
Running without arguments prompts the user with usage instructions and exits with code 1:
```bash
$ node peek.js
usage: node peek.js <file> [n]
```

---

## Section 2 — AI‑Assisted Programming

### 1. What I Asked AI
* **Code Completion Without Boilerplate**: I asked AI to complete `peek.js` using the minimalist coding pattern established across our workshop scripts (`head.js`, `tail.js`, `cat.js`), explicitly asking for clean code with no comments or artificial styling.
* **Boundary Bug Diagnosis**: When running `node peek.js boundary.txt 3` on a 6-line file, the program unexpectedly entered the `else` branch and printed `...`. I asked AI to analyze why the line count was evaluating to 7 instead of 6.
* **Preserving Zero as an Argument**: I asked AI how to revise `parseInt(process.argv[3], 10) || 3` so that passing `0` would remain `0` rather than falling back to `3`.
* **Investigating Array Slicing**: I asked AI when and why JavaScript's `Array.prototype.slice` was causing the entire file to print after `...` when $N = 0$ was entered.

### 2. Where AI Helped
* **Explaining the `-0` Slice Gotcha**: AI explained that in JavaScript, `-0 === 0`. Therefore, calling `lines.slice(-n)` when `n = 0` evaluates to `lines.slice(0)`, returning the complete array instead of an empty slice. AI provided the `if (n > 0)` check to prevent dumping the full file.
* **Implementing the Trim and Parse Fixes**: AI helped write the code adjustments (`data.trimEnd().split('\n')` and `isNaN()` check) once the bugs were identified during testing.

### 3. Where I Had to Think Independently
* **Catching the Errors During Testing**: Initially, AI did not see the errors in the code when providing test cases and expected outputs—it assumed the initial logic was fully working. I had to manually test and validate the program to discover that the boundary test was failing and that passing `0` was broken.
* **Designing Edge Case Logic**: I decided how the tool should behave when $\text{lines.length} \le 2 \times N$. Rather than printing duplicate lines or showing `...` on a file with no middle, I chose to output the complete file cleanly.
* **Determining $N = 0$ Semantics**: I decided that `0` should be treated as a valid input showing only the separator `...`, rather than rejecting it or treating it as missing.
* **Enforcing Project Code Style**: I kept the code aligned with student workshop standards, rejecting overly complex abstractions or unnecessary comments.

### 4. What AI Got Wrong or Missed
* **Did Not Catch Bugs in Initial Code**: Initially, AI did not see the errors present in the implementation when generating test cases and expected output. It was only after manual testing and validation was done that the failures were caught and had to be fixed:
  * **Missed Trailing Newlines**: AI initially used `data.split('\n')` without noticing that POSIX files with trailing newlines produce 7 items for a 6-line file, breaking boundary checks:
    ```javascript
    // Buggy:
    const lines = data.split('\n');

    // Fixed:
    const lines = data.trimEnd().split('\n');
    ```
  * **Falsy Operator Fallback**: AI used `parseInt(process.argv[3], 10) || 3`, which caused `0` to silently reset to `3`. This required an explicit `isNaN()` check:
    ```javascript
    const parsed = parseInt(process.argv[3], 10);
    const n = isNaN(parsed) ? 3 : parsed;
    ```
  * **Negative Zero Slicing**: AI did not guard `lines.slice(-n)`, so passing `n = 0` caused `lines.slice(-0)` to dump the entire file instead of nothing.

---

## Files in Repository

* `peek.js`: The completed head/tail hybrid command.
* `head.js`: Prints first $N$ lines of a file.
* `tail.js`: Prints last $N$ lines of a file.
* `cat.js`: Outputs file contents to stdout.
* `grep.js`: Filters lines matching a pattern.
* `ls.js`: Lists directory contents.
* `wc.js`: Counts lines, words, and characters.
* `tee.js`: Duplicates stdin to stdout and a file.
* `sample.txt`: 11-line fruit dataset used for general testing.
* `boundary.txt`: 6-line file used for testing $2 \times N$ boundary conditions.
