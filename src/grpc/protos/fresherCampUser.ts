/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.15.6
 * source: fresherCampUser.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from 'google-protobuf';
import * as grpc_1 from '@grpc/grpc-js';
export namespace project_user {
  export class GetRoleRequest extends pb_1.Message {
    constructor(
      data?:
        | any[]
        | {
            pmUid?: string[];
          }
    ) {
      super();
      pb_1.Message.initialize(
        this,
        Array.isArray(data) ? data : [],
        0,
        -1,
        [1],
        []
      );
      if (!Array.isArray(data) && typeof data == 'object') {
        if ('pmUid' in data && data.pmUid != undefined) {
          this.pmUid = data.pmUid;
        }
      }
    }
    get pmUid() {
      return pb_1.Message.getField(this, 1) as string[];
    }
    set pmUid(value: string[]) {
      pb_1.Message.setField(this, 1, value);
    }
    static fromObject(data: { pmUid?: string[] }) {
      const message = new GetRoleRequest({});
      if (data.pmUid != null) {
        message.pmUid = data.pmUid;
      }
      return message;
    }
    toObject() {
      const data: {
        pmUid?: string[];
      } = {};
      if (this.pmUid != null) {
        data.pmUid = this.pmUid;
      }
      return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
      const writer = w || new pb_1.BinaryWriter();
      if (this.pmUid !== undefined) writer.writeRepeatedString(1, this.pmUid);
      if (!w) return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetRoleRequest {
      const reader =
          bytes instanceof pb_1.BinaryReader
            ? bytes
            : new pb_1.BinaryReader(bytes),
        message = new GetRoleRequest();
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;
        switch (reader.getFieldNumber()) {
          case 1:
            pb_1.Message.addToRepeatedField(message, 1, reader.readString());
            break;
          default:
            reader.skipField();
        }
      }
      return message;
    }
    serializeBinary(): Uint8Array {
      return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): GetRoleRequest {
      return GetRoleRequest.deserialize(bytes);
    }
  }
  export class GetRoleResponse extends pb_1.Message {
    constructor(
      data?:
        | any[]
        | {
            mapUidUserName?: Map<string, string>;
          }
    ) {
      super();
      pb_1.Message.initialize(
        this,
        Array.isArray(data) ? data : [],
        0,
        -1,
        [],
        []
      );
      if (!Array.isArray(data) && typeof data == 'object') {
        if ('mapUidUserName' in data && data.mapUidUserName != undefined) {
          this.mapUidUserName = data.mapUidUserName;
        }
      }
      if (!this.mapUidUserName) this.mapUidUserName = new Map();
    }
    get mapUidUserName() {
      return pb_1.Message.getField(this, 1) as any as Map<string, string>;
    }
    set mapUidUserName(value: Map<string, string>) {
      pb_1.Message.setField(this, 1, value as any);
    }
    static fromObject(data: {
      mapUidUserName?: {
        [key: string]: string;
      };
    }) {
      const message = new GetRoleResponse({});
      if (typeof data.mapUidUserName == 'object') {
        message.mapUidUserName = new Map(Object.entries(data.mapUidUserName));
      }
      return message;
    }
    toObject() {
      const data: {
        mapUidUserName?: {
          [key: string]: string;
        };
      } = {};
      if (this.mapUidUserName.size > 0) {
        data.mapUidUserName = Object.fromEntries(this.mapUidUserName);
      }
      return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
      const writer = w || new pb_1.BinaryWriter();
      for (const [key, value] of this.mapUidUserName) {
        writer.writeMessage(1, this.mapUidUserName, () => {
          writer.writeString(1, key);
          writer.writeString(2, value);
        });
      }
      if (!w) return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetRoleResponse {
      const reader =
          bytes instanceof pb_1.BinaryReader
            ? bytes
            : new pb_1.BinaryReader(bytes),
        message = new GetRoleResponse();
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;
        switch (reader.getFieldNumber()) {
          case 1:
            reader.readMessage(message, () =>
              pb_1.Map.deserializeBinary(
                message.mapUidUserName as any,
                reader,
                reader.readString,
                reader.readString
              )
            );
            break;
          default:
            reader.skipField();
        }
      }
      return message;
    }
    serializeBinary(): Uint8Array {
      return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): GetRoleResponse {
      return GetRoleResponse.deserialize(bytes);
    }
  }
  interface GrpcUnaryServiceInterface<P, R> {
    (
      message: P,
      metadata: grpc_1.Metadata,
      options: grpc_1.CallOptions,
      callback: grpc_1.requestCallback<R>
    ): grpc_1.ClientUnaryCall;
    (
      message: P,
      metadata: grpc_1.Metadata,
      callback: grpc_1.requestCallback<R>
    ): grpc_1.ClientUnaryCall;
    (
      message: P,
      options: grpc_1.CallOptions,
      callback: grpc_1.requestCallback<R>
    ): grpc_1.ClientUnaryCall;
    (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
  }
  interface GrpcStreamServiceInterface<P, R> {
    (
      message: P,
      metadata: grpc_1.Metadata,
      options?: grpc_1.CallOptions
    ): grpc_1.ClientReadableStream<R>;
    (message: P, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
  }
  interface GrpWritableServiceInterface<P, R> {
    (
      metadata: grpc_1.Metadata,
      options: grpc_1.CallOptions,
      callback: grpc_1.requestCallback<R>
    ): grpc_1.ClientWritableStream<P>;
    (
      metadata: grpc_1.Metadata,
      callback: grpc_1.requestCallback<R>
    ): grpc_1.ClientWritableStream<P>;
    (
      options: grpc_1.CallOptions,
      callback: grpc_1.requestCallback<R>
    ): grpc_1.ClientWritableStream<P>;
    (callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
  }
  interface GrpcChunkServiceInterface<P, R> {
    (
      metadata: grpc_1.Metadata,
      options?: grpc_1.CallOptions
    ): grpc_1.ClientDuplexStream<P, R>;
    (options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
  }
  interface GrpcPromiseServiceInterface<P, R> {
    (
      message: P,
      metadata: grpc_1.Metadata,
      options?: grpc_1.CallOptions
    ): Promise<R>;
    (message: P, options?: grpc_1.CallOptions): Promise<R>;
  }
  export abstract class UnimplementedUserService {
    static definition = {
      GetRole: {
        path: '/project_user.User/GetRole',
        requestStream: false,
        responseStream: false,
        requestSerialize: (message: GetRoleRequest) =>
          Buffer.from(message.serialize()),
        requestDeserialize: (bytes: Buffer) =>
          GetRoleRequest.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message: GetRoleResponse) =>
          Buffer.from(message.serialize()),
        responseDeserialize: (bytes: Buffer) =>
          GetRoleResponse.deserialize(new Uint8Array(bytes)),
      },
    };
    [method: string]: grpc_1.UntypedHandleCall;
    abstract GetRole(
      call: grpc_1.ServerUnaryCall<GetRoleRequest, GetRoleResponse>,
      callback: grpc_1.sendUnaryData<GetRoleResponse>
    ): void;
  }
  export class UserClient extends grpc_1.makeGenericClientConstructor(
    UnimplementedUserService.definition,
    'User',
    {}
  ) {
    constructor(
      address: string,
      credentials: grpc_1.ChannelCredentials,
      options?: Partial<grpc_1.ChannelOptions>
    ) {
      super(address, credentials, options);
    }
    GetRole: GrpcUnaryServiceInterface<GetRoleRequest, GetRoleResponse> = (
      message: GetRoleRequest,
      metadata:
        | grpc_1.Metadata
        | grpc_1.CallOptions
        | grpc_1.requestCallback<GetRoleResponse>,
      options?: grpc_1.CallOptions | grpc_1.requestCallback<GetRoleResponse>,
      callback?: grpc_1.requestCallback<GetRoleResponse>
    ): grpc_1.ClientUnaryCall => {
      return super.GetRole(message, metadata, options, callback);
    };
  }
}
