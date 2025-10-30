
const Analytics = () => {
  return (
    <>
      <div>
        <h1 className="text-xl font-bold">Analytics</h1>
        <span className="text-gray-500">Track your sales</span>
      </div>
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="bg-white p-5 rounded-md ring-1 ring-inset ring-gray-300">
          <h2>Analytics 1</h2>
        </div>
        <div className="bg-white p-5 rounded-md ring-1 ring-inset ring-gray-300">
          <h2>Analytics 2</h2>
        </div>
      </div>
    </>
  )
}

export default Analytics