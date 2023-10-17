import { LogProtocol } from "@/layers/use-cases";

export class LogAdapter implements LogProtocol {

	trace(title: string, message: string, trace: string): boolean {
		console.trace({
			title,
			message,
			trace,
			level: "[TRACE]",
			timestamp: new Date()
		});
		console.log();
        
		return true;
	}
	
	info(title: string, message: string): boolean {
		console.info({
			title,
			message,
			level: "[INFO]",
			timestamp: new Date()
		});
		console.log();
        
		return true;
	}

	warning(title: string, message: string): boolean {
		console.warn({
			title,
			message,
			level: "[WARNING]",
			timestamp: new Date()
		});
		console.log();
        
		return true;
	}

	error(title: string, message: string): boolean {
		console.error({
			title,
			message,
			level: "[ERROR]",
			timestamp: new Date()
		});
		console.log();
        
		return true;
	}
}