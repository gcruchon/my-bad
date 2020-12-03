echo "---- Checking NPM version"
npm --version
echo "---- Installing tool..."
npm i firebase-tools
echo "---- Watching what's in working directory"
ls -alh
echo "---- Checking version deploy..."
./node_modules/.bin/firebase --version;
echo "---- Starting deploy..."
./node_modules/.bin/firebase --token $fireBaseToken --project $fireBaseProject hosting:channel:deploy VSTS
echo "---- DEPLOYMENT COMPLETED ----"
