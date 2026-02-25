import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface ConfirmDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
}

const ConfirmDialog = ({
  children,
  onConfirm,
  title = "¿Estás seguro?",
  description = "Esta acción no se puede deshacer.",
  cancelText = "Cancelar",
  confirmText = "Confirmar",
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-xl border-slate-700/80 bg-slate-900 text-slate-100 shadow-2xl shadow-black/60">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm font-semibold tracking-tight text-slate-100">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-relaxed text-slate-400">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-700 bg-slate-800 text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-700 hover:text-slate-100">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="border border-red-500/30 bg-red-500/15 text-red-400 transition-all hover:border-red-500/50 hover:bg-red-500/25 hover:text-red-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmDialog;
