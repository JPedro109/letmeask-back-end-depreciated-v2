import { LogProtocol } from "@/layers/application";
import { LogBashAdapter, LogNoSQLAdapter } from "../adapters";

export class LogFacade implements LogProtocol {

	constructor( 
		private readonly logBashAdapter: LogBashAdapter,
		private readonly logNoSQLAdapter: LogNoSQLAdapter
	) { }

	private executeLogAdapters(type: "trace" | "info" | "warning" | "error", message: string, error?: Error, trace?: string) {
		if(type === "trace") {
			this.logBashAdapter.trace(message, trace);
			this.logNoSQLAdapter.trace(message, trace);
		}

		if(type === "error") {
			this.logBashAdapter.error(message, error);
			this.logNoSQLAdapter.error(message, error);
		}

		if(type === "info" || type === "warning") {
			this.logBashAdapter[type](message);
			this.logNoSQLAdapter[type](message);
		}
	}

	trace(message: string, trace: string): boolean {
		this.executeLogAdapters("trace", message, null, trace);
		return true;
	}
	
	info(message: string): boolean {
		this.executeLogAdapters("info", message);
		return true;
	}

	warning(message: string): boolean {
		this.executeLogAdapters("warning", message);
		return true;
	}

	error(message: string, error: Error): boolean {
		this.executeLogAdapters("error", message, error);
		return true;
	}
}