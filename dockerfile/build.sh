REGISTRY=registry.sensetime.com
PROJECT=stmed-llm
IMAGE=med-consult-mgt-fe
TAG=dev_$(date +%Y%m%d_%H%M)
if [ -n "$1" ] ; then
    TAG=$1
fi
IMAGE_URL=${REGISTRY}/${PROJECT}/${IMAGE}:${TAG}
CACHE_FROM=
CUR_DIR=$(cd `dirname $0` && pwd -P)
ROOT_DIR=${CUR_DIR}/..

# build image
mkdir  ${CUR_DIR}/tmp
cp -rf ${ROOT_DIR}/dist/*           ${CUR_DIR}/tmp
cp -rf ${CUR_DIR}/tmp/index.html
LOGIN_DIR=${ROOT_DIR}/..
rm -f ${CUR_DIR}/tmp/js/*.map

#build
docker pull ${IMAGE_URL} 2> /dev/null
if [ "$(docker images -q ${IMAGE_URL} 2> /dev/null)" != "" ]; then
    CACHE_FROM="--cache-from "${IMAGE_URL}
fi
docker build ${CACHE_FROM} --platform linux/amd64 --tag ${IMAGE_URL} ${CUR_DIR}
#clean
rm -rf ${CUR_DIR}/tmp
#remove dangling images
docker rmi -f $(docker images -aq -f "dangling=true") 2> /dev/null
#push
docker push ${IMAGE_URL}

