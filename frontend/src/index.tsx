import ReactDOM from "react-dom/client"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { RecoilRoot } from "recoil"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { RouterProvider } from "react-router-dom"
import router from "./pages/index"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
const queryClient = new QueryClient()

root.render(
  <RecoilRoot>
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </DndProvider>
  </RecoilRoot>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
