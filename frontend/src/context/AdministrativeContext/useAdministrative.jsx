import { useContext } from "react";
import { AdministrativeContext } from "./index";

export const useAdministrative = () => {
    const context = useContext(AdministrativeContext);

    if (!context) {
        throw new Error('useAdministrative must be used within an AdministrativeProvider');
    }

    return context;
}