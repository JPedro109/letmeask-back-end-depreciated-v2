import { Metrics } from "@/shared";
import { Router } from "express";

export default (router: Router): void => {
	router.get("/metrics", async (req, res) => {
		res.setHeader("Content-Type", Metrics.getMetricsContentType());
		res.end(await Metrics.getMetrics());
	});
};