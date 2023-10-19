import { LOG_BASH, LOG_NOSQL } from "@/shared";
import { LogProtocol } from "@/layers/use-cases";
import { LogBashAdapter, LogNoSQLAdapter } from "./adapters";

export class LogAdapter implements LogProtocol {

	constructor(
		private readonly logBashAdapter: LogBashAdapter,
		private readonly logNoSQLAdapter: LogNoSQLAdapter
	) { 
		if(!LOG_BASH || !LOG_BASH) throw new Error("You need to start one of the log types via environment variables");
	}

	private executeLogAdapters(type: "trace" | "info" | "warning" | "error", title: string, message: string, trace?: string) {
		if(LOG_BASH) type === "trace" ? this.logBashAdapter[type](title, message, trace) : this.logBashAdapter[type](title, message);
		if(LOG_NOSQL) type === "trace" ? this.logNoSQLAdapter[type](title, message, trace) : this.logNoSQLAdapter[type](title, message);
	}

	trace(title: string, message: string, trace: string): boolean {
		this.executeLogAdapters("trace", title, message, trace);
		return true;
	}
	
	info(title: string, message: string): boolean {
		this.executeLogAdapters("info", title, message);
		return true;
	}

	warning(title: string, message: string): boolean {
		this.executeLogAdapters("warning", title, message);
		return true;
	}

	error(title: string, message: string): boolean {
		this.executeLogAdapters("error", title, message);
		return true;
	}
}