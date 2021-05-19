#!/bin/bash

set -e -x

REMOTE_NAME='origin'
TARGET_BRANCH='auto-sync'

git remote set-url $REMOTE_NAME https://"${CI_PUSH_USER}":"${CI_PUSH_TOKEN}"@git.gametaptap.com/tds/client-sdk/tds-sdk-all/tapsdk-doc.git
git config --global user.name "ci-gitlab"
git config --global user.email "tds-developer@xd.com"

git fetch
git checkout -B $TARGET_BRANCH
git reset $REMOTE_NAME/$TARGET_BRANCH --hard
git pull $REMOTE_NAME master
git status

# bootstrap
chmod +x scripts/*
./scripts/clean.sh
git submodule add --force https://doc-ci-bot:"${DOC_CONTENT_TOKEN}"@git.gametaptap.com/tds/client-sdk/tds-sdk-all/TapSDK-Doc-Content.git content
./scripts/bootstrap.sh

# push
git add -A
git reset HEAD .gitmodules
git commit -m "[CI] Sync Doc Content ${DOC_CONTENT_COMMIT_HASH:-unknown} by [${DOC_CONTENT_COMMIT_ID:-?}]${DOC_CONTENT_COMMIT_USER:-someone}"
git push --set-upstream $REMOTE_NAME $TARGET_BRANCH

# create MR
curl -L -X POST \
-F "source_branch=$TARGET_BRANCH" \
-F "target_branch=master" \
-F "assignee_id=175" \
-F "title=📝 Merge Request from DocContent" \
"https://git.gametaptap.com/api/v4/projects/tds%2Fclient-sdk%2Ftds-sdk-all%2Ftapsdk-doc/merge_requests?access_token=$CI_PUSH_TOKEN"
