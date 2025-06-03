import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout.tsx";
import LoginPage from "@/modules/auth/pages/LoginPage.tsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        element: <PageLayout />,
        children: [
            // Aquí van las rutas que sí usan el layout
        ],
    },
]);

export default router;
