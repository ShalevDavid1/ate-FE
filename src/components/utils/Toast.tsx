import { Snackbar, Alert, AlertColor } from "@mui/material";

interface ToastProps {
    open: boolean;
    message: string;
    severity: AlertColor; // "success" | "error" | "warning" | "info"
    onClose: () => void;
    closeAfter?: number;
}

const Toast = ({ open, message, severity, onClose, closeAfter }: ToastProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={closeAfter ?? 1000} // 1 seconds as default
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }} // Positioned at top-right
        >
            <Alert onClose={onClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;