# Required Download before run
- Latest Node.js version
- Angular CLI
- Some additional angular resources
- Latest MySQL Worbench Community Edition

---

## Angular CLI Installation Guide (If you read the frontend readme.txt, you can skip this part)
1. Go to the Node.js website and download the latest version of  Node.js
Here is a link to their website: https://nodejs.org/en

2. Open Command Terminal as administrator to prevent any issues with the installation.

3. Write the command 

>npm install -g @angular/cli

then press enter to download the Angular CLI to your pc.

It is **HIGHLY** recommended that you do this in your C Drive.
You will know that you are in C drive if the cmd shows something like this

C:\

4. In the Command Terminal, navigate your way into the backend folder of the OPE_2.0 folder.

For those who dont use cmd, if the folder is in another drive other than C, you can write the following commands:

>cd\
*>#:

*Note: replace the hashtag with any other letter depending which drive the folder is located like C, D, E and etc.*

then in your File Explorer, shift + right click the folder, then press "copy as path"

write the command:

>cd

then press ctrl+v to paste the path, remove the double quotation marks then enter.

5. when in the frontend folder, write the command:

>npm install

to download all resources and dependencies that you will need to run the backend of the website
Note: you will need alot of storage space since there are alot of dependencies required to start the backend, same for the frontend

6. If all dependencies are downloaded, you can run the backend by using the command:

>npm start

## MySQL Installation and Configuration

1. Download the latest MySQL Workbench Community Edition.
Here is a link to the download: https://dev.mysql.com/downloads/workbench/

2. When using the installer, go with the default setup. When asked to place a password for your workbench, just place it as 1234 as this is also the password placed in a config.json file

3. When setup is done, enter the Local Instance
Note: Make sure that the instance indicates that its in localhost:3306

4. When in the Local Instance, run this script:

CREATE SCHEMA savedeval;

CREATE TABLE savedeval.`users` (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE savedeval.reviews (
  id INT NOT NULL AUTO_INCREMENT,
  product_url TEXT,
  name VARCHAR(255) NOT NULL,
  stars INT,
  date_reviewed DATE NOT NULL,
  dateiso_scraped DATETIME NOT NULL,
  review TEXT,
  PRIMARY KEY (id),
  CONSTRAINT uc_review_unique UNIQUE (name, date_reviewed)
);

If its your first time with mysql workbench, under the File button in the top menu, there should be a "Create a new SQL tab for executing queries."
Press that and a writable area should appear. Copy and paste the script above this into the writable area and press the lightning bolt button to run the script

5. With that, you now have the database of the website for both login and review storing.



If anything goes wrong in the website, please email us your concern at ope_customerservice@gmail.com
