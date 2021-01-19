#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

YQ_VERSION=3.4.1
OS=$(uname -s | tr '[A-Z]' '[a-z]')
ARCH=amd64

echo "info: download prerequisites"
yqbin=$(mktemp)
curl --retry 10 -L -o $yqbin https://tap-bintray.oss-cn-shanghai.aliyuncs.com/ops/utils/yq/${YQ_VERSION}/yq_${OS}_${ARCH}
chmod +x $yqbin

echo "info: show version information"
$yqbin --version
npm --version

npm config set registry https://registry.npm.taobao.org
npm install
rm -rf ./build
SOURCE_VERSION_SHORT="$(git rev-parse --short HEAD)"
echo $SOURCE_VERSION_SHORT
ARTIFACT_IMAGE="taptap-img-registry-vpc.cn-beijing.cr.aliyuncs.com/tds/tapsdkdoc:${SOURCE_VERSION_SHORT}"
# yarn build
ret=0
node_modules/.bin/docusaurus build || ret=$?

if [ $ret -eq 0 ]; then 
  docker build -t $ARTIFACT_IMAGE . 
  docker push $ARTIFACT_IMAGE        
  docker rmi ${ARTIFACT_IMAGE}   


  IMAGE_TAG=${SOURCE_VERSION_SHORT}
  KUBEFILES_DIR="kubefiles"
  KUBEFILES_PROJECT_DIR="${KUBEFILES_DIR}/tds/tapsdkdoc"
  if [ -d "${KUBEFILES_DIR}" ];then
    git -C "${KUBEFILES_DIR}" pull
  else
    git clone git@git.gametaptap.com:ops/kubefiles.git
  fi
  $yqbin w -i "${KUBEFILES_PROJECT_DIR}/values.yaml" --style=double image.tag "${IMAGE_TAG}"
  cd ${KUBEFILES_PROJECT_DIR}
  git config user.email cirobot@git.gametaptap.com
  git config user.name "CI Robot tds"
  git add .
  git diff-index --quiet HEAD -- && echo "nothing is changed" && exit 0
  git commit -m "[tapsdkdoc] update to ${IMAGE_TAG}"
  git push

else
  echo "build failed"
fi

