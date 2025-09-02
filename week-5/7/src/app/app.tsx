import { FetchBlock } from "@/features/fetch-block"
import { XhrBlock } from "@/features/xhr-block"


const App = () => {

  return (<div className="space-y-6 p-6">
    <XhrBlock />
    <FetchBlock />
  </div>)
}

export default App
