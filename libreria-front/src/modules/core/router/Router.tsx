import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout.tsx";
import LoginPage from "../../auth/pages/LoginPage.tsx";

const router = createBrowserRouter([ 
    {
        element: <PageLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            }
        ],
    },
]);

export default router;
