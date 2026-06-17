/**
 * ============================================================
 * PATH MODULE IN NODE.JS - COMPLETE GUIDE
 * ============================================================
 *
 * The Path module provides utilities for working with
 * file and directory paths.
 *
 * Built-in Module:
 * const path = require('path');
 *
 * Common Uses:
 * ✅ Creating file paths
 * ✅ Getting file extensions
 * ✅ Finding directory names
 * ✅ Parsing paths
 * ✅ Resolving absolute paths
 * ✅ Cross-platform compatibility
 *
 * IMPORTANT:
 * Windows Path:
 * C:\Users\Amit\Documents\file.txt
 *
 * Linux/Mac Path:
 * /home/amit/Documents/file.txt
 *
 * path module handles OS differences automatically.
 */

const path = require("path");

/* ============================================================
   __filename and __dirname
   ============================================================

   Available only in CommonJS.

   __filename
   -> Absolute path of current file

   __dirname
   -> Absolute path of current directory
*/

console.log("FILENAME:", __filename);
console.log("DIRNAME:", __dirname);

/*
Example Output:

FILENAME:
C:\Projects\NodeJS\app.js

DIRNAME:
C:\Projects\NodeJS
*/


/* ============================================================
   SCHOOL MANAGEMENT SYSTEM EXAMPLE
   ============================================================

   Project Structure

   School-System/
   │
   ├── app.js
   │
   └── data/
       └── students.json
*/


/* ============================================================
   path.join()
   ============================================================

   Joins path segments safely.

   Syntax:
   path.join(segment1, segment2, ...)

   Why use it?

   ❌ Avoid manual path creation:
      __dirname + "/data/students.json"

   ✅ Use path.join()
      Handles Windows and Linux separators automatically.
*/

const filePath = path.join(
    __dirname,
    "data",
    "students.json"
);

console.log("FILE PATH:", filePath);

/*
Windows Output:

C:\Projects\School-System\data\students.json

Linux Output:

/home/amit/School-System/data/students.json
*/


/* ============================================================
   path.parse()
   ============================================================

   Breaks a path into useful pieces.

   Returns an object:
   {
      root,
      dir,
      base,
      ext,
      name
   }
*/

const parsedPath = path.parse(filePath);

console.log("PARSED PATH:", parsedPath);

/*
Output:

{
  root: 'C:\\',
  dir: 'C:\\Projects\\School-System\\data',
  base: 'students.json',
  ext: '.json',
  name: 'students'
}

Meaning:

root  -> Drive root
dir   -> Directory
base  -> Full filename
ext   -> File extension
name  -> Filename without extension
*/


/* ============================================================
   path.resolve()
   ============================================================

   Converts relative path into absolute path.

   Syntax:
   path.resolve(...segments)

   It starts from current working directory.
*/

const resolvedPath = path.resolve(
    "data",
    "students.json"
);

console.log("RESOLVED PATH:", resolvedPath);

/*
Output:

C:\Projects\School-System\data\students.json

OR

/home/amit/School-System/data/students.json
*/


/* ============================================================
   path.extname()
   ============================================================

   Returns file extension.
*/

const extname = path.extname(filePath);

console.log("EXTENSION:", extname);

/*
Output:

.json
*/


/* ============================================================
   path.basename()
   ============================================================

   Returns filename only.
*/

const basename = path.basename(filePath);

console.log("BASE NAME:", basename);

/*
Output:

students.json
*/


/* ============================================================
   path.basename(path, extension)
   ============================================================

   Remove extension while getting filename.
*/

const filenameOnly = path.basename(
    filePath,
    ".json"
);

console.log("FILENAME ONLY:", filenameOnly);

/*
Output:

students
*/


/* ============================================================
   path.dirname()
   ============================================================

   Returns parent directory.
*/

const dirname = path.dirname(filePath);

console.log("DIRECTORY NAME:", dirname);

/*
Output:

C:\Projects\School-System\data

OR

/home/amit/School-System/data
*/


/* ============================================================
   path.isAbsolute()
   ============================================================

   Checks whether path is absolute.
*/

console.log(
    path.isAbsolute(filePath)
);

/*
Output:

true
*/


console.log(
    path.isAbsolute("./data")
);

/*
Output:

false
*/


/* ============================================================
   path.normalize()
   ============================================================

   Cleans invalid path separators.
*/

const messyPath =
    "data//students///records/../students.json";

console.log(
    path.normalize(messyPath)
);

/*
Output:

data/students/students.json
*/


/* ============================================================
   path.relative()
   ============================================================

   Finds relative path between two paths.
*/

const from =
    "/school/admin";

const to =
    "/school/data/students.json";

console.log(
    path.relative(from, to)
);

/*
Output:

../data/students.json
*/


/* ============================================================
   path.format()
   ============================================================

   Opposite of path.parse()

   Creates path from object.
*/

const newPath = path.format({
    dir: "/school/data",
    name: "students",
    ext: ".json"
});

console.log(newPath);

/*
Output:

/school/data/students.json
*/


/* ============================================================
   path.sep
   ============================================================

   Current OS separator.
*/

console.log(path.sep);

/*
Windows:

\

Linux/Mac:

/
*/


/* ============================================================
   path.delimiter
   ============================================================

   Used in environment variables.

   Example:
   PATH variable
*/

console.log(path.delimiter);

/*
Windows:

;

Linux/Mac:

:
*/


/* ============================================================
   REAL WORLD EXAMPLE
   ============================================================

   Reading Student Data File
*/

const studentsFile = path.join(
    __dirname,
    "database",
    "students",
    "students.json"
);

console.log(studentsFile);

/*
Output:

C:\Projects\School-System\
database\students\students.json
*/


/* ============================================================
   ES MODULE VERSION
   ============================================================

   __dirname and __filename
   do NOT exist in ES Modules.

   Solution:
*/

import { fileURLToPath } from "url";
import path from "path";

const __filenameESM =
    fileURLToPath(import.meta.url);

const __dirnameESM =
    path.dirname(__filenameESM);

console.log(__filenameESM);
console.log(__dirnameESM);

/*
Output:

C:\Projects\app.js

C:\Projects
*/


/* ============================================================
   MOST IMPORTANT INTERVIEW QUESTIONS
   ============================================================

   Q1. Why use path.join()?
   -> Safely joins path segments and handles
      OS-specific separators.

   Q2. Difference between join() and resolve()?

   join():
   -> Combines path segments.

   resolve():
   -> Returns absolute path.

   Example:

   path.join("data", "students.json")
   => data/students.json

   path.resolve("data", "students.json")
   => C:/project/data/students.json

   ------------------------------------------------

   Q3. What does path.parse() return?

   -> root
   -> dir
   -> base
   -> ext
   -> name

   ------------------------------------------------

   Q4. How to get file extension?

   -> path.extname()

   ------------------------------------------------

   Q5. How to get filename only?

   -> path.basename()

   ------------------------------------------------

   Q6. How to get parent directory?

   -> path.dirname()

   ------------------------------------------------

   Q7. How to check absolute path?

   -> path.isAbsolute()

   ------------------------------------------------

   Q8. What is path.normalize()?

   -> Cleans invalid path separators.

   ------------------------------------------------

   Q9. Why is path module important?

   -> Makes file handling portable across
      Windows, Linux, and Mac.
*/

/**
 * ============================================================
 * QUICK CHEAT SHEET
 * ============================================================
 *
 * path.join()        -> Join paths
 * path.resolve()     -> Get absolute path
 * path.parse()       -> Break path into parts
 * path.format()      -> Create path from object
 * path.basename()    -> Get filename
 * path.dirname()     -> Get directory
 * path.extname()     -> Get extension
 * path.normalize()   -> Clean path
 * path.relative()    -> Relative path
 * path.isAbsolute()  -> Check absolute path
 * path.sep           -> OS separator
 * path.delimiter     -> PATH separator
 *
 * Most Used in Real Projects:
 *
 * 1. join()
 * 2. resolve()
 * 3. basename()
 * 4. dirname()
 * 5. extname()
 *
 * ============================================================
 */