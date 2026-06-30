import type { YearMonth } from "./types";

const SHORT_MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export function formatMonth(yearMonth: YearMonth): string {
	const [year, month] = yearMonth.split("-");
	const idx = Number(month) - 1;
	return `${SHORT_MONTHS[idx]} ${year}`;
}
