import { LogProtocol } from "@/layers/domain";
import { LogBashAdapter, LogNoSQLAdapter } from "../adapters";

export class LogFacade implements LogProtocol {

	constructor( 
		private readonly logBashAdapter: LogBashAdapter,
		private readonly logNoSQLAdapter: LogNoSQLAdapter
	) { }

	private executeLogAdapters(type: "trace" | "info" | "warning" | "error", title: string, message: string, trace?: string) {
		type === "trace" ? this.logBashAdapter[type](title, message, trace) : this.logBashAdapter[type](title, message);
		
		type === "trace" ? this.logNoSQLAdapter[type](title, message, trace) : this.logNoSQLAdapter[type](title, message);
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