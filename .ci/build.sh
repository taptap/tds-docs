npx @docusaurus/init@latest

rm -f ./build
SOURCE_VERSION_SHORT="$(git rev-parse --short HEAD)"
echo $SOURCE_VERSION_SHORT
ARTIFACT_IMAGE="taptap-img-registry-vpc.cn-beijing.cr.aliyuncs.com/tds/tapsdkdoc:${SOURCE_VERSION_SHORT}"
# yarn build
node_modules/.bin/docusaurus build
docker build -t $ARTIFACT_IMAGE . 
docker push $ARTIFACT_IMAGE           