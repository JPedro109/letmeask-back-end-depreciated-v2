import * as client from "prom-client";

export class Metrics {
	static register = new client.Registry();

	static getMetrics = async () => await Metrics.register.metrics();

	static getMetricsContentType = () => Metrics.register.contentType;

	static httpRequestTimer = new client.Histogram({
		name: "http_request_duration_seconds",
		help: "Duration of HTTP requests in seconds",
		labelNames: ["method", "route", "code"],
		buckets: [0.1, 0.3, 0.5, 0.7, 1, 3]
	});

	static config() {
		Metrics.register.setDefaultLabels({
			app: "letmeask"
		});
		client.collectDefaultMetrics({ register: Metrics.register });
		Metrics.register.registerMetric(Metrics.httpRequestTimer);
	}
}