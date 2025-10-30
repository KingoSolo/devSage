import { Button } from '@/components/ui/button'  // shadcn's button
import {Badge} from '@/components/ui/badge'
import { Card } from './ui/card'

function ReviewButton() {
  return(<>
     <Button className="cursor-pointer">Review My Code</Button>
     <Badge className="ml-2">New</Badge>
     <Card className="mt-4 p-4">
       <h2 className="text-lg font-semibold mb-2">Code Review Requested</h2>
       <p className="text-sm text-muted-foreground">
         Click the button above to submit your code for review by our AI-powered system. Get insights and suggestions to improve your code quality!
       </p>
     </Card>
     </>
  )
}

export default ReviewButton