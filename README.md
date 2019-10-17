# Server-Sent Events (SSE) - Nest.js
This package implements a middleware to broadcast SSE when using Nexs.js framework.

**npm i -S nestjs-sse**

## Usage

Apply the middleware

    import {MiddlewareConsumer, Module} from "@nestjs/common";  
    import {ConnectionService} from "./connection.service";  
    import {ConnectionController} from "./connection.controller";  
    import {SSEMiddleware} from "nestjs-sse";  
      
    @Module({  
	    imports: [],  
	    controllers: [ConnectionController],  
	    providers: [ConnectionService],  
	    exports: [ConnectionService],  
    })  
    export class ConnectionModule {  
	    configure(consumer: MiddlewareConsumer) {  
		    consumer  
	            .apply(SSEMiddleware)  
                .forRoutes(ConnectionController);  
	    }  
    }

Inside the controller

    import {Controller, Get, Res} from "@nestjs/common";  
    import {Response} from "nestjs-sse";  
    import {ConnectionService} from "./connection.service";  
    import settings from "./config";  
      
    @Controller()  
    export class ConnectionController {  
        constructor(private readonly connectionService: ConnectionService) {  
      
        }  
      
        @Get("vm/connection")  
        list(@Res() res: Response) {  
            res.sse(`data: ${JSON.stringify(this.connectionService.getAliveVMsData())}\n\n`);  
      
		    setInterval(() => {  
				res.sse(`data: ${JSON.stringify(this.connectionService.getAliveVMsData())}\n\n`);  
		    }, settings.MAX_HEART_BEAT_IDLE_MS);  
	    }  
    }
