

const IntegrationListV2 = () => {
    const items = [
        { name: "Royal Canin", type: "Dog Food", rate: 65, profit: "₱ 12,450", color: "bg-indigo-500" },
        { name: "Pedigree", type: "Dog Food", rate: 45, profit: "₱ 8,320", color: "bg-orange-500" },
        { name: "Whiskas", type: "Cat Food", rate: 58, profit: "₱ 9,150", color: "bg-emerald-500" },
    ]

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path><path d="M15 7h6v6"></path></svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">Top Brands</h3>
                </div>
                <button className="text-emerald-500 text-sm font-medium hover:text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">See All</button>
            </div>

            <div className="flex text-xs text-gray-400 uppercase tracking-wider mb-4 px-2">
                <div className="w-8"></div> {/* Checkbox spacer */}
                <div className="w-1/3">Brand</div>
                <div className="w-1/4">Category</div>
                <div className="w-1/3">Popularity</div>
                <div className="w-1/6 text-right">Sales</div>
            </div>

            <div className="space-y-1 flex-1">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors group cursor-pointer">
                        <div className="w-8 flex-shrink-0">
                            <div className="w-4 h-4 rounded border border-gray-300 group-hover:border-emerald-500 transition-colors"></div>
                        </div>
                        <div className="w-1/3 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${item.color}`}>
                                {item.name[0]}
                            </div>
                            <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                        <div className="w-1/4 text-sm text-gray-500">
                            {item.type}
                        </div>
                        <div className="w-1/3 pr-4">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.rate}%` }}></div>
                                </div>
                                <span className="text-xs text-gray-500 w-6">{item.rate}%</span>
                            </div>
                        </div>
                        <div className="w-1/6 text-right text-sm font-medium text-gray-900">
                            {item.profit}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IntegrationListV2;
