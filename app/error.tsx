'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const isEnvError = error.message.includes('environment variables')

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-600">ELITEIIT</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isEnvError ? 'Configuration Required' : 'Something went wrong'}
          </h2>
          <p className="text-gray-700 mb-4">{error.message}</p>
          
          {isEnvError && (
            <div className="mt-6 text-left bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Please set up the following environment variables:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>NEXT_PUBLIC_SUPABASE_URL</li>
                <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                <li>OPENROUTER_API_KEY</li>
                <li>FREEPIK_API_KEY</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                See <strong>DEPLOYMENT.md</strong> for detailed setup instructions.
              </p>
            </div>
          )}

          <button
            onClick={() => reset()}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
