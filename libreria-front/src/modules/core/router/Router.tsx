import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout.tsx";
import LoginPage from "@/modules/auth/pages/LoginPage.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import LibrosPage from "@/modules/libros/pages/LibroPage.tsx";
import CrearLibroPage from "@/modules/libros/pages/CrearLibroPage.tsx";
import EditarLibroPage from "@/modules/libros/pages/EditLibroPage.tsx";
import GenerosPage from "@/modules/generos/pages/GenerosPage.tsx";
import CrearGeneroPage from "@/modules/generos/pages/CrearGeneroPage.tsx";
import EditarGeneroPage from "@/modules/generos/pages/EditarGeneroPage.tsx";
import UsuariosPage from "@/modules/usuarios/pages/UsuariosPage.tsx";
import ComprasPage from "@/modules/compras/pages/ComprasPage.tsx";
import RegisterPage from "@/modules/auth/pages/RegisterPage.tsx";
import Top10LibrosPage from "@/modules/libros/pages/Top10LibrosPage.tsx";
import LibroDetailPage from "@/modules/libros/pages/LibroDetailPage.tsx";
import LibrosPorGeneroPage from "@/modules/libros/pages/LibrosPorGeneroPage.tsx";
import CarritoPage from "@/modules/carrito/pages/CarritoItemPage.tsx";
import CompraDetallePage from "@/modules/compras/pages/CompraDetallePage.tsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        element: <PageLayout />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/admin",
                        element: <LibrosPage />,
                    },
                    {
                        path: "/libros/crear",
                        element: <CrearLibroPage />,
                    },
                    {
                        path: "/libros/editar/:id",
                        element: <EditarLibroPage />,
                    },
                    {
                        path: "/admin/generos",
                        element: <GenerosPage />,
                    },
                    {
                        path: "/generos/crear",
                        element: <CrearGeneroPage />,
                    },
                    {
                        path: "/generos/editar/:id",
                        element: <EditarGeneroPage />,
                    },
                    {
                        path: "/admin/usuarios",
                        element: <UsuariosPage />,
                    },
                    {
                        path: "/admin/ventas",
                        element: <ComprasPage />,
                    }
                ]
            },
            {
                path: "/",
                element: <Top10LibrosPage onDelete={function (id: number): void {
                    throw new Error("Function not implemented.");
                } } />,
            },
            {
                path: "/libros/:id",
                element: <LibroDetailPage />,
            },
            {
                path: "generos/:generoId/libros",
                element: <LibrosPorGeneroPage />,
            },
            {
                path: "/carrito",
                element: <CarritoPage />,
            },
            {
                path: "/perfil",
                element: <ComprasPage />,
            },
            {
                path: "/compras/:id",
                element: <CompraDetallePage />,
            }
        ],
        
    },
]);

export default router;
