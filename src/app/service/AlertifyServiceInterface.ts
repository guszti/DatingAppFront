export interface AlertifyServiceInterface {
    confirm: (message: string, onConfirm: () => void) => void;

    success: (message: string) => void;

    error: (message: string) => void;

    warning: (message: string) => void;

    message: (message: string) => void;
}
