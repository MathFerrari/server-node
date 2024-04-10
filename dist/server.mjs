import {
  registerForEvent
} from "./chunk-3MKEK56Q.mjs";
import {
  errorHandler
} from "./chunk-TTPHRHUW.mjs";
import {
  checkIn
} from "./chunk-UIN4ABEQ.mjs";
import {
  CreateEvent
} from "./chunk-PWYIO6JB.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-2474ERNA.mjs";
import {
  getEventAttendees
} from "./chunk-OHAEFN6X.mjs";
import {
  getEvent
} from "./chunk-M6M4GWYM.mjs";
import "./chunk-4RDVRHEH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*"
  //only for development
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Event Management API",
      description: "Event Management API - feito no NLW Unite da rocketseat",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(CreateEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3334, host: "0.0.0.0" }).then(() => {
  console.log("Server started at port 3334");
});
export {
  app
};
