#!/bin/bash
PROTO_DEST=./src/grpc/protos/
# JavaScript code generation
# yarn run grpc_tools_node_protoc \
#     --js_out=import_style=commonjs,binary:${PROTO_DEST} \
#     --grpc_out=${PROTO_DEST} \
#     --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
#     -I ./proto \
#     ${PROTO_DEST}/*.proto

#TypeScript code generation
yarn run grpc_tools_node_protoc.cmd \
--plugin=proto-gen-ts=./node_modules/.bin/protoc-gen-ts \
--ts_out=${PROTO_DEST} \
-I=${PROTO_DEST} ${PROTO_DEST}/*.proto