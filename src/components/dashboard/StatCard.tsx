import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon?: React.ReactNode;
    subtitle?: string;
}

const StatCard = ({ title, value, trend, trendUp, icon, subtitle }: StatCardProps) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                    {icon}
                    <span>{title}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </button>
            </div>

            <div className="flex items-end gap-3 mb-1">
                <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trendUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    <span>{trend}</span>
                </div>
            </div>
            {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
    );
};

export default StatCard;
