import { LogProtocol, LogRepositoryProtocol } from "@/layers/use-cases";
import { LogBashAdapter } from "./log-bash-adapter";

export class LogNoSQLAdapter implements LogProtocol {

	constructor(
		private readonly logRepository: LogRepositoryProtocol,
		private readonly logBashAdapter: LogBashAdapter
	) { }

	trace(title: string, message: string, trace: string): boolean {
		this.logRepository.createLog("TRACE", title, message, trace).catch((e) => {
			this.logBashAdapter.error("LogNoSQLAdapter", JSON.stringify(e));
		});
		return true;
	}

	info(title: string, message: string): boolean {
		this.logRepository.createLog("LOG", title, message).catch((e) => {
			this.logBashAdapter.error("LogNoSQLAdapter", JSON.stringify(e));
		});
		return true;
	}

	warning(title: string, message: string): boolean {
		this.logRepository.createLog("WARN", title, message).catch((e) => {
			this.logBashAdapter.error("LogNoSQLAdapter", JSON.stringify(e));
		});
		return true;
	}

	error(title: string, message: string): boolean {
		this.logRepository.createLog("ERROR", title, message).catch((e) => {
			this.logBashAdapter.error("LogNoSQLAdapter", JSON.stringify(e));
		});
		return true;
	}
}