npm install
rm -f ./build
SOURCE_VERSION_SHORT="$(git rev-parse --short HEAD)"
echo $SOURCE_VERSION_SHORT
ARTIFACT_IMAGE="taptap-img-registry-vpc.cn-beijing.cr.aliyuncs.com/tds/tapsdkdoc:${SOURCE_VERSION_SHORT}"
# yarn build
node_modules/.bin/docusaurus build
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
yq w -i "${KUBEFILES_PROJECT_DIR}/values.yaml" image.tag "${IMAGE_TAG}"
cd ${KUBEFILES_PROJECT_DIR}
git config user.email cirobot@git.gametaptap.com
git config user.name "CI Robot tds"
git add .
git diff-index --quiet HEAD -- && echo "nothing is changed" && exit 0
git commit -m "[tapsdkdoc] update to ${IMAGE_TAG}"
git push
