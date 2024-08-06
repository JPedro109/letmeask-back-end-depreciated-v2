import { LogProtocol, LogRepositoryProtocol } from "@/layers/application";
import { LogBashAdapter } from "./log-bash-adapter";

export class LogNoSQLAdapter implements LogProtocol {

	constructor(
		private readonly logRepository: LogRepositoryProtocol,
		private readonly logBashAdapter: LogBashAdapter
	) { }

	trace(message: string, trace: string): boolean {
		this.logRepository.createLog("TRACE", message, null, trace).catch((e) => {
			this.logBashAdapter.error("Error when attempting to insert log into database", e);
		});
		return true;
	}

	info(message: string): boolean {
		this.logRepository.createLog("LOG", message).catch((e) => {
			this.logBashAdapter.error("Error when attempting to insert log into database", e);
		});
		return true;
	}

	warning(message: string): boolean {
		this.logRepository.createLog("WARN", message).catch((e) => {
			this.logBashAdapter.error("Error when attempting to insert log into database", e);
		});
		return true;
	}

	error(message: string, error: Error): boolean {
		this.logRepository.createLog("ERROR", message, error).catch((e) => {
			this.logBashAdapter.error("Error when attempting to insert log into database", e);
		});
		return true;
	}
}