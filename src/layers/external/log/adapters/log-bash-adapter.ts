import { LogProtocol } from "@/layers/use-cases";

export class LogBashAdapter implements LogProtocol {

	trace(title: string, message: string, trace: string): boolean {
		console.log();
		console.trace({
			title,
			message,
			trace,
			level: "[TRACE]",
			timestamp: new Date()
		});
        
		return true;
	}
	
	info(title: string, message: string): boolean {
		console.log();
		console.info({
			title,
			message,
			level: "[INFO]",
			timestamp: new Date()
		});
        
		return true;
	}

	warning(title: string, message: string): boolean {
		console.log();
		console.warn({
			title,
			message,
			level: "[WARNING]",
			timestamp: new Date()
		});
        
		return true;
	}

	error(title: string, message: string): boolean {
		console.log();
		console.error({
			title,
			message,
			level: "[ERROR]",
			timestamp: new Date()
		});
        
		return true;
	}
}