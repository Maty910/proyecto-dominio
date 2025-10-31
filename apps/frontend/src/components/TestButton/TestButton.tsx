export const TestButton = ({ label = 'Click', onClick }: { label?: string; onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow-sm"
    >
      {label}
    </button>
  )
}