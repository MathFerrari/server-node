import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import { CreateEvent } from "./routes/create-event";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider} from "fastify-type-provider-zod"
import { registerForEvent } from "./routes/register-for-events";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import { errorHandler } from "./error-handler";

export const app = fastify().withTypeProvider<ZodTypeProvider>();
const port = parseInt(process.env.PORT || '3334')

app.register(fastifyCors, {
    origin: '*', //only for development
})

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'Event Management API',
            description: 'Event Management API - feito no NLW Unite da rocketseat',
            version: '1.0.0'
        },
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(CreateEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.listen({ port, host: '0.0.0.0' }).then(() => {
    console.log("Server started at port 3334");
})
