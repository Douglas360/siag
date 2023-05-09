import { useContext } from "react";
import { RegisterContext } from "./index";

export const useRegister = () => {
    const context = useContext(RegisterContext);

    if (!context) {
        throw new Error('useRegister must be used within an RegisterProvider');
    }

    return context;
}