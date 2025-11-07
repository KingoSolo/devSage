import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { Spinner } from './ui/spinner'

function ReviewButton({onReview, isLoading}) {
  return (
    <Button 
      size="lg" 
      onClick={onReview} 
      disabled={isLoading}
      className="bg-linear-to-r from-slate-900 to-slate-600 hover:from-slate-800 hover:to-slate-500 text-white font-semibold px-6 py-6 text-lg shadow-lg"
    >
      {isLoading ? (
        <>
          <Spinner className="mr-2 h-5 w-5 animate-spin" /> 
          Reviewing...
       </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Review My Code
        </>
      )}
    </Button>
  )
}

export default ReviewButton