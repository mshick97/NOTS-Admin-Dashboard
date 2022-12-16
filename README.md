# NOTS Admin Dashboard

An admin's GUI for NOTS, designed for tracking orders and visualizing the customer data base.

Notes about deployment:

- Need to have a .env in BOTH the root directory and the functions directory for deployment to hosting and cloud functions
  > Make sure each file's env variables match identically.
  > Every new env variable must be added to BOTH files in './.github/worflows' and to the Github repos' "Actions Secrets".

- Functions directory needs its own package.json for Firebase cause *technically* this is 2 projects in a monolithic repo

- Before deploying Firebase Cloud Functions:
  1. Delete previous version of './functions/build' directory
  2. Run 'npm run build' from root directory
  3. Delete both sets of 'node_module' directories
  4. Delete the './functions/lib' directory
  5. cd into './functions' and run 'npm run deploy'
    > Final command will compile the Typescript automatically with a pre-deploy script found in './firebase.json'.
