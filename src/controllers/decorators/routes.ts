import "reflect-metadata";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(mehtod: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, mehtod, target, key);
    };
  };
}
export const Get = routeBinder(Methods.get);
export const Post = routeBinder(Methods.post);
export const Put = routeBinder(Methods.put);
export const Delete = routeBinder(Methods.del);
export const Patch = routeBinder(Methods.patch);
