export default function StatisticalCard({
    title,
    value,
    percentage,
    color,
}: {
    title: string;
    value?: number;
    percentage: string;
    color: string;
}) {
    return (
        <div
            className={`rounded-3xl flex justify-between items-center w-full ${color}`}
        >
            <div className="text-gray-800 font-semibold p-4">
                <h2 className="text-xl">{title}</h2>
                <span className="text-sm text-gray-600">{percentage}%</span>
            </div>
            <div className="flex items-center justify-center text-gray-800 font-semibold text-3xl bg-blue-50 rounded-3xl px-4 py-2 h-full shadow-lg">
                {value ? `${(value / 1_000_000).toFixed(1)}M` : "0M"}
            </div>
        </div>
    );
}
