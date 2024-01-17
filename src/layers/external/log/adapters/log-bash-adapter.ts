import { LogProtocol } from "@/layers/application";

export class LogBashAdapter implements LogProtocol {

	trace(message: string, trace: string): boolean {
		console.log();
		console.trace({
			message,
			trace,
			level: "[TRACE]",
			timestamp: new Date()
		});
        
		return true;
	}
	
	info(message: string): boolean {
		console.log();
		console.info({
			message,
			level: "[INFO]",
			timestamp: new Date()
		});
        
		return true;
	}

	warning(message: string): boolean {
		console.log();
		console.warn({
			message,
			level: "[WARNING]",
			timestamp: new Date()
		});
        
		return true;
	}

	error(message: string, error: Error): boolean {
		console.log();
		console.error({
			message,
			level: "[ERROR]",
			error: {
				message: error.message,
				name: error.name,
				stack: error.stack
			},
			timestamp: new Date()
		});
        
		return true;
	}
}