# peek.js — File Preview Utility

A lightweight Node.js command-line utility that previews the beginning and end of a file while skipping the middle content.

---

## Section 1 — Command Description

### What It Does
`peek.js` inspects a text file and prints the first $N$ lines and the last $N$ lines, inserting an omission separator (`...`) in between. If the total number of lines in the file is less than or equal to $2 \times N$, there is no middle content to skip, and the entire file is printed directly without the separator.

### What Commands It Combines
`peek.js` combines the functionality of two standard UNIX commands:
* **`head`**: Viewing the top / first lines of a file.
* **`tail`**: Viewing the bottom / last lines of a file.

### How to Run It
Run the script using Node.js:

```bash
node peek.js <file> [n]
