# NOTS Admin Dashboard
An admin's GUI for NOTS, designed for tracking orders and visualizing the customer data base.

Notes to self about deployment:
- Need to have a .env in the root directory and the functions directory for deployment to hosting and cloud functions
- Functions directory needs its own package.json for Firebase cause *technically* this is 2 projects
- Before deploying Firebase Cloud Functions: 
  - Run npm run build from root directory
  - Copy the 'build' directory created into functions directory
  - then run the npm run deploy script
