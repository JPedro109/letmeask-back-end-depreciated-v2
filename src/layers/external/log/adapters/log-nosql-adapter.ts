import { LogProtocol, LogRepositoryProtocol } from "@/layers/use-cases";

export class LogNoSQLAdapter implements LogProtocol {

	constructor(private readonly logRepository: LogRepositoryProtocol) { }

	trace(title: string, message: string, trace: string): boolean {
		this.logRepository.createLog(
			"TRACE",
			title,
			message,
			trace
		)
			.then()
			.catch(e => e);
        
		return true;
	}
	
	info(title: string, message: string): boolean {
		this.logRepository.createLog(
			"INFO",
			title,
			message
		)
			.then()
			.catch(e => e);
        
		return true;
	}

	warning(title: string, message: string): boolean {
		this.logRepository.createLog(
			"WARNING",
			title,
			message
		)
			.then()
			.catch(e => e);
        
		return true;
	}

	error(title: string, message: string): boolean {
		this.logRepository.createLog(
			"ERROR",
			title,
			message
		)
			.then()
			.catch(e => e);
        
		return true;
	}
}