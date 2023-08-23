"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryQlient = new QueryClient()

return (
<QueryClientProvider client={queryQlient}>
    {children}
</QueryClientProvider>

)}

export default Providers;