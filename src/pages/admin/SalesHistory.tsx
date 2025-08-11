import { Receipt } from "lucide-react"

const SalesHistory = () => {
  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-xl font-bold">Sales History</h1>
        <span className="text-gray-500">Manage your sales</span>
      </div>

      <div className="flex items-center">
        <Receipt className="size-20 text-gray-500" />
      </div>
    </div>
  )
}

export default SalesHistory